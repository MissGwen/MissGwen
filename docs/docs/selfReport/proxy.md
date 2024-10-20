### Socks Proxy

```ts
import { createServer, type IncomingMessage } from "node:http";
import { parse } from "node:url";
import type { Socket } from "node:net";
import { SocksClient, SocksClientOptions } from "socks";
import { mainWindow } from "@main/index";
// import { getAvailablePort } from '@main/utils/common'

// 错误处理
function errorHandler(
  clientSocket: Socket,
  proxySocket?: Socket
): (error: Error) => void {
  return (err: Error) => {
    // 如果处理请求时发生错误，向客户端发送错误响应，并关闭连接。
    clientSocket.write("HTTP/1.1 502 Bad Gateway\r\n\r\n");
    clientSocket.end("Proxy socket error: " + err.message);
    clientSocket.destroy();
    proxySocket?.destroy();
    // 日志
    mainWindow.webContents.send("app:logging", {
      type: "ERROR",
      content: `Socks Proxy Socket Error ${err.message}`,
    });
  };
}

/**
 * @description 解决session无法验证用户名密码
 * @param { string } proxyRules 代理地址 [socks4/5]://[userId]:[password]@[host]:[port]
 * @returns { string } 本地Http代理地址
 */
export async function socksProxy(proxyRules: string): Promise<string> {
  // 解析代理规则 [_,type,userId,password,host,port]
  const proxyRulesList = proxyRules.match(
    /socks(\d+):\/\/(.*):(.*?)@(.*):(\d+)/
  );

  if (!proxyRulesList) return "";

  // 从解析结果中提取各个部分
  const [, type, userId, password, host, port] = proxyRulesList;

  // 定义SOCKS客户端选项，包括代理服务器的详细信息
  const socksOptions: SocksClientOptions = {
    proxy: {
      host,
      port: Number.parseInt(port),
      type: Number.parseInt(type) as 4 | 5,
      userId,
      password,
    },
    command: "connect",
    destination: { host: "", port: 0 },
  };

  // 创建一个HTTP服务器，用于接收代理请求
  const httpServer = createServer(async (req, res) => {
    if (!req.url) return;

    // 解析请求URL，获取主机和端口信息
    const urlObject = parse(req.url);

    if (!urlObject.hostname) return;

    // 更新目标主机和端口信息
    socksOptions.destination.host = urlObject.hostname;
    socksOptions.destination.port = Number.parseInt(urlObject.port ?? "80");

    try {
      // 使用SOCKS客户端创建到目标的连接
      const { socket } = await SocksClient.createConnection(socksOptions);
      // 将请求数据转发到SOCKS连接
      req.pipe(socket);
      // 将SOCKS连接的数据转发给响应
      socket.pipe(res);
    } catch (error) {
      // 如果创建连接失败，返回502错误
      res.writeHead(502, { "Content-Type": "text/plain" });
      res.end("Proxy request error: " + (error as Error).message);
    }
  });

  // 处理HTTP服务器的'connect'事件，用于TCP代理
  httpServer.on(
    "connect",
    async (req: IncomingMessage, clientSocket: Socket, head: Buffer) => {
      // 解析客户端请求的URL，以获取目标主机和端口。
      const parsedUrl = parse("https://" + (req.url ?? ""));
      const { hostname, port } = parsedUrl;
      // 如果URL解析失败，抛出错误。
      if (!hostname || !port) throw new Error("Invalid client request URL.");

      socksOptions.destination.host = hostname;
      socksOptions.destination.port = Number.parseInt(port);

      try {
        // 使用SOCKS客户端创建到目标的连接
        const { socket } = await SocksClient.createConnection(socksOptions);

        // 监听代理连接和客户端连接的错误事件。
        clientSocket.on("error", errorHandler(clientSocket, socket));
        socket.on("error", errorHandler(clientSocket, socket));

        // 发送连接成功的响应
        clientSocket.write("HTTP/1.1 200 Connection Established\r\n\r\n");

        // 将头部信息转发到SOCKS连接
        socket.write(head);

        // 双向转发数据
        socket.pipe(clientSocket);
        clientSocket.pipe(socket);
      } catch (error) {
        errorHandler(clientSocket)(error as Error);
      }
    }
  );

  httpServer.on("error", (error) => {
    // 日志
    mainWindow.webContents.send("app:logging", {
      type: "ERROR",
      content: `Socks Proxy Error ${error.message}`,
    });
  });

  // 生成随机端口，启动HTTP服务器
  // const randomPort = await getAvailablePort()
  const randomPort = Math.floor(1e4 * Math.random()) + 5e4;

  httpServer.listen(randomPort);

  // 返回HTTP代理服务器的地址
  return `http://127.0.0.1:${randomPort}`;
}
```

### Http Proxy

```ts
import { connect, type Socket } from "node:net";
// import { getAvailablePort } from '@main/utils/common'
import { createServer, type IncomingMessage } from "node:http";
import { mainWindow } from "@main/index";
import { Buffer } from "node:buffer";
import { parse } from "node:url";

/** 创建代理连接 */
function createProxyConnection(options: CreateProxyOptions): Socket {
  // 解构选项中的代理和目标主机信息，以及认证信息（如果提供）
  const {
    proxyHost,
    proxyPort,
    proxyUser,
    proxyPass,
    targetHost,
    targetPort,
    head,
  } = options;
  // 构造Basic认证头，用于向代理服务器进行身份验证
  const authHeader = `Basic ${Buffer.from(`${proxyUser}:${proxyPass}`).toString(
    "base64"
  )}`;
  // 创建一个Socket对象，并连接到代理服务器
  const socket = connect(proxyPort, proxyHost, () => {
    // 构造CONNECT请求，用于向代理服务器请求建立到目标主机的连接
    // 包括请求行、Proxy-Authorization头和Host头
    const request = [
      `CONNECT ${targetHost}:${targetPort} HTTP/1.1`,
      `Proxy-Authorization: ${authHeader}`,
      `Host: ${targetHost}:${targetPort}`,
      "",
      "",
    ].join("\r\n");

    // 发送CONNECT请求和任何额外的头部信息到代理服务器
    socket.write(request);
    socket.write(head);
  });

  return socket;
}

// 错误处理
function errorHandler(
  clientSocket: Socket,
  proxySocket?: Socket
): (error: Error) => void {
  return (err: Error) => {
    // 如果处理请求时发生错误，向客户端发送错误响应，并关闭连接。
    clientSocket.write("HTTP/1.1 502 Bad Gateway\r\n\r\n");
    clientSocket.end("Proxy socket error: " + err.message);
    clientSocket.destroy();
    proxySocket?.destroy();
    // 日志
    mainWindow.webContents.send("app:logging", {
      type: "ERROR",
      content: `Http Proxy Socket Error ${err.message}`,
    });
  };
}

/**
 * @description 创建一个HTTP代理服务器。
 * @param proxyRules 代理规则字符串，格式为`http(s)://[username:password]@[host:port]`。
 * @returns 返回代理服务器的URL。
 */
export async function httpProxy(proxyRules: string): Promise<string> {
  // 校验代理规则并提取协议、用户名、密码、主机和端口
  const proxyRulesList = proxyRules.match(
    /^(https?):\/\/(.*?):(.*?)@(.*):(\d+)/
  );

  if (!proxyRulesList) return "";

  // 从解析结果中提取各个部分
  const [, , proxyUser, proxyPass, proxyHost, proxyPort] = proxyRulesList;

  // 设置代理连接的选项。
  const httpOptions: CreateProxyOptions = {
    proxyUser,
    proxyPass,
    proxyHost,
    proxyPort: Number(proxyPort),
    targetHost: "",
    targetPort: 0,
    head: Buffer.from(""),
  };

  // 创建HTTP服务器
  const httpServer = createServer();

  // 监听'connect'事件，处理客户端的HTTP CONNECT请求。
  httpServer.on(
    "connect",
    (req: IncomingMessage, clientSocket: Socket, head: Buffer) => {
      try {
        // 解析客户端请求的URL，以获取目标主机和端口。
        const parsedUrl = parse("https://" + (req.url ?? ""));
        const { hostname, port } = parsedUrl;
        // 如果URL解析失败，抛出错误。
        if (!hostname || !port) throw new Error("Invalid client request URL.");

        httpOptions.targetHost = hostname;
        httpOptions.targetPort = Number.parseInt(port);
        httpOptions.head = head;

        // 创建到目标主机的代理连接。
        const socket = createProxyConnection(httpOptions);

        // 监听代理连接和客户端连接的错误事件。
        socket.on("error", errorHandler(clientSocket, socket));
        clientSocket.on("error", errorHandler(clientSocket, socket));

        // 在代理连接和客户端连接之间建立管道，实现数据的双向传输。
        socket.pipe(clientSocket);
        clientSocket.pipe(socket);
      } catch (error) {
        errorHandler(clientSocket)(error as Error);
      }
    }
  );

  httpServer.on("error", (error) => {
    // 日志
    mainWindow.webContents.send("app:logging", {
      type: "ERROR",
      content: `Http Proxy Error ${error.message}`,
    });
  });

  // 生成随机端口，启动HTTP服务器
  // const randomPort = await getAvailablePort()
  const randomPort = Math.floor(1e4 * Math.random()) + 5e4;

  httpServer.listen(randomPort);

  // 返回HTTP代理服务器的地址
  return `http://127.0.0.1:${randomPort}`;
}
```

### Electron

```ts
const webviewSession = session.fromPartition("persist:webview");

const proxyRules = await socksProxy("socks5://user:pass@127.0.0.1:1080");

await webviewSession.setProxy({ proxyRules });
```
