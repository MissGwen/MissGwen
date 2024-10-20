## 管理用户

- 查询用户
  
  ```sql
  USE mysql;
  SELECT * FROM user;
  ```

- 创建用户
  
  ```sql
  CREATE USER '用户名'@'主机名' IDENTIFIED BY '密码';
  ```

- 修改用户密码
  
  ```sql
  ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
  ```

- 删除用户
  
  ```sql
  DROP USER '用户名'@'主机名';
  ```

## 权限控制

- 查询权限
  
  ```sql
  SHOW GRANTS FOR '用户名'@'主机名';
  ```

- 授予权限
  
  ```sql
  CRANT 权限列表 ON 数据库名.表名 TO '用户名'@'密码';
  ```

- 撤销权限
  
  ```sql
  REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'密码';
  ```
