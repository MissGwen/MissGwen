## HTML 语义化标签

```html
<title> <h1> ~ </h6> <ul> <li>
<header> <nav> <main> <article> <section> <aside> <footer>
```

好处：容易阅读 易于 SEO

## 块元素，行内元素，行内块元素，空（void）元素

- 块元素

```html
<div> <h1> ~ </h6> <p> <ol> <ul> <li> <dl> <table> <address> <form>
```

`display:block` 独占一行，可以设置宽高

- 行内元素：

```html
<a></a> <span></span> <i></i> <em></em> <strong></strong> <lable></lable>
```

`display:inline` 不独占一行，设置宽高无效，宽高由内容决定

- 行内块元素：

```html
<input /> <img />
```

`display:inline-block` 不独占一行，可以设置宽高

- 空元素：

```html
<br />
<hr />
```

## HTML 5 新特性

- 用于媒体的新元素 `video` `audio`

- 本地存储 `localStorage` 长期存储数据，浏览器关闭数据不消失，除非手动删除

- `sessionStorage` 浏览器关闭数据自动删除

- 增加语义化标签 `article` `footer` `header` `nav` `section`

- 表单控件 `calendar` `date` `time` `email` `url` `search`

- 新技术 `webworker` `websocket` `Geolocation`

  #### 移除的元素

  - 纯表现的元素：`basefont` `big` `center` `font` `s` `strike` `tt` `u`

  - 对可用性产生负面影响的元素：`frame` `frameset` `noframes`

  #### 支持 HTML5 新标签

  - IE6/7/8 支持通过 `document.createElement` 方法产生的标签，可以利用这一特性让浏览器支持 HTML5 新标签

  - 或者使用成熟框架
