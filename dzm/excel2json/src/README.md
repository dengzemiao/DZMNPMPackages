# ex2json

## 一、使用

- 安装

  ```sh
  $ npm i ex2json
  ```

- 引入

  ```js
  import ex2json from "ex2json";
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
