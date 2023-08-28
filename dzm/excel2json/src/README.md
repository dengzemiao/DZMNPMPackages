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
