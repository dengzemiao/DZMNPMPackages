## 一、使用

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
  $ npm i @nj/njoyd-ex2json
  ```

- 引入

  ```js
  import ex2json from "@nj/njoyd-ex2json";
  ```

- 使用

  ```html
  <template>
    <input type="file" @change="read" />
  </template>

  <script>
    import ex2json from "ex2json";
    export default {
      methods: {
        read(e) {
          // 文件对象
          const file = e.target.files[0];
          // 转成成 json
          ex2json.parse(file, (code, res) => {
            console.log(code, res);
          });
        },
      },
    };
  </script>
  ```

- 可能会遇到的问题：

  - `Vue3` 报错 [Module not found: Error: Can't resolve 'fs' in 'xxx'](https://blog.csdn.net/CatchLight/article/details/133852779)，可在 `vue.config.js` 中新增以下配置即可：

    ```js
    const { defineConfig } = require('@vue/cli-service')
    module.exports = defineConfig({
      transpileDependencies: ...,
      devServer: { ... },
      // 下面这段配置添加上即可
      configureWebpack: {
        resolve: { fallback: { fs: false } }
      }
    })
    ```
