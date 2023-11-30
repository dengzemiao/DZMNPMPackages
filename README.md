# DZMNPMPackages

- 自建 npm 包存储

- 发包常用步骤

  1、切换源地址为官方源或私有源地址，不能为淘宝源。推荐使用 nrm 管理，安装报错 [Error [ERR_REQUIRE_ESM]: require() of ES Module](https://blog.csdn.net/zz00008888/article/details/130750480) 解决。

  ```sh
  # 安装 nrm
  $ npm i -g nrm open@8.4.2 --save

  # 使用 npm 镜像
  $ nrm use npm
  ```

  2、登录 npm

  ```sh
  # 登录命令
  $ npm login

  # 退出登录命令
  $ npm logout
  ```

  3、进入对应目录进行发包

  ```sh
  # 发布到 npm 官方源
  $ npm run push
  ```

  4、移除包或指定版本

  ```sh
  # 删除库包之后，24小时之内 无法再次上传同名的库包到 npm，需要更改包名，或等过了 24 小时之后在上传。
  $ npm unpublish [<pkg>][@<version>] --force
  ```

  提示：发包后，淘宝源可能会没有那么快同步到，所以可以使用官方源同步，淘宝源同步时间应该 15 分钟左右，如果不行就先用官方源。
