# @nj/base

## 一、简介

- 简化前端下载功能，支持链接后台下载、代理下载、Blob 数据下载，针对代理下载灵活使用。

## 二、使用

- 安装 (`小提示：记得切换为私有源再进行安装`)

  ```sh
  # 安装并切换好了可忽略这一步
  # 安装 nrm 管理镜像源
  $ npm install -g nrm
  # 添加私有镜像源
  $ nrm add nnpm http://10.0.10.23:7001
  # 使用私有镜像源
  $ nrm use nnpm
  ```

  ```sh
  $ npm i @nj-web/downloadjs
  ```

- 引入

  ```javascript
  import * as dl from "@nj-web/downloadjs";
  ```

- 后台下载

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

- `Blob` 数据下载

  ```javascript
  // 转成 Blob 对象
  const blob = new Blob(["字符串"]);
  // 进行下载，默认是 txt 文件，可通过传入文件名进行修改下载的文件类型
  dl.dlBlob(blob);
  dl.dlBlob(blob, "test.txt");
  ```

- 代理下载

  - 项目代码中配置（`main.js`）

    ```javascript
    // 引入
    import * as dl from '@nj-web/downloadjs'
    // 配置代理
    dl.setProxy({
      // 代理标识: [代理地址, 代理地址]
      // 这么配置，当使用 dl.dlProxy() 传入 url 时，可传入 '/download/test.png'、'https://www.baidu1.com/test.png'、''https://www.baidu2.com/test.png'', 会自动匹配并进行替换
      '/download': ['https://www.baidu1.com', ...],
      '/download/': ['https://www.baidu2.com/', ...],
      ...
    })
    ```

  - 项目中配置文件中配置

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

  - 服务器 `server` 配置（正式、测试都需要）

    ```javascript
    server {
      ...
      location /download/ {
        proxy_pass https://www.baidu2.com/;
      }
    }
    ```

  - 使用

    ```javascript
    // 会跟配置好的代理进行校验
    dl.dlProxy("/download/test.png");
    dl.dlProxy("/download/test.png", "aaa.png");
    dl.dlProxy("https://www.baidu1.com/test.png");

    // 如果不想配置，在自行知道这是配好的代理下载链接，可以直接下载
    // 注意：dl.dlClick() 只能下载代理文件链接、同域名文件链接，像 'https://www.baidu1.com/test.png' 这种就是非代理链接了，上面支持是因为内部会进行匹配替换成代理标识
    dl.dlClick("/download/test.png");
    ```
