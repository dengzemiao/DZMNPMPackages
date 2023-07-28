# dlhelper

## 一、简介

- 一个简化前端下载功能 js 辅助库，支持链接后台下载、代理下载、Blob 数据下载，针对代理下载灵活使用。

## 二、使用

- 安装

  ```sh
  $ npm i dlhelper
  ```

- 引入

  ```javascript
  import * as dl from "dlhelper";
  ```

- `案例`：后台下载

  ```javascript
  dl.dlFetch(
    "https://test-public.juhaokanya.com/prod/aac5812fe2f6f3e1efeb6a86c8eb2867.png"
  )
    .then(() => {
      console.log("下载成功");
    })
    .catch((err) => {
      console.log("下载失败");
    });
  ```

- `案例`：`Blob` 数据下载

  ```javascript
  // 转成 Blob 对象
  const blob = new Blob(["字符串"]);
  // 进行下载，默认是 txt 文件，可通过传入文件名进行修改下载的文件类型
  dl.dlBlob(blob);
  dl.dlBlob(blob, "test.txt");
  ```

- `案例`：代理下载

  - `main.js` 配置代理标识与代理地址（`可选`）

    ```javascript
    // 引入
    import * as dl from 'dlhelper'
    // 配置代理
    dl.setProxy({
      // 代理标识: [代理地址, 代理地址]
      // 这么配置，当使用 dl.dlProxy() 传入 url 时，可传入 '/download/test.png'、'https://www.baidu1.com/test.png'、'https://www.baidu2.com/test.png', 全链接的会自动匹配代理地址，匹配成功替换成对应的代理标识
      '/download/': ['https://www.baidu2.com/', ...],
      '/download': ['https://www.baidu1.com', ...],
      '/test/': [],
      ...
    })
    ```

  - 本地代理配置（项目配置文件中添加）

    ```javascript
    // 开发配置
    devServer: {
      ...
      proxy: {
        // 代理配置
        '/download/': {
          target: 'https://www.baidu2.com/',
          ws: false,
          changeOrigin: true,
          pathRewrite: {
            '^/download/': ''
          }
        }
      }
    }
    ```

  - 服务器代理配置（服务器 `server` 中添加，正测试都需要）

    ```javascript
    server {
      ...
      location /download/ {
        proxy_pass https://www.baidu2.com/;
      }
    }
    ```

  - 项目中使用

    ```javascript
    // 使用这个必须配置 main.js
    // 会跟配置好的代理进行校验
    dl.dlProxy("/download/test.png");
    dl.dlProxy("/download/test.png", "aaa.png");
    dl.dlProxy("https://www.baidu1.com/test.png");

    // 使用这个 main.js 配置可选
    // 如果不想在 main.js 中配置 dl.setProxy()，可以在知道这是配好的代理下载链接时，直接通过代理链接下载（如：/download/test.png，不能是全链接，全链接没法匹配替换）
    // 注意：dl.dlClick() 只能下载代理文件链接、同域名文件链接，像 'https://www.baidu1.com/test.png' 这种就是非代理链接了，上面支持是因为内部会进行匹配替换成代理标识
    dl.dlClick("/download/test.png");
    ```
