// 参考文章 https://blog.csdn.net/zz00008888/article/details/113847294

/**
 * @description: 配置对象
 */
var proxys = {}

/**
 * @description: 下载配置
 * @param {*} proxy 代理配置 { '/download1/': ['https://www.baidu.com/', ...], /download2/': [] }
 */
export function setProxy(proxy) {
  // 记录代理配置
  proxys = proxy
}

/**
 * @description: 代理下载
 * @param {*} url 链接（例如：全链接(http://dowload.file/test.png) 、附带代理标识的链接(/dowload/test.png，代理配置：/dowload/：['http://dowload.file/']))
 * @param {*} filename 文件名称，为空则取链接尾部文件名
 * @param {*} proxy 代理协议(例如：/dowload/，/dowload/ === http://dowload.file/)
 * @return {*} 是否匹配到代理协议，进入了下载
 */
export function dlProxy(url, filename) {
  // 获取代理标识
  const proxyKeys = Object.keys(proxys || {})
  // 匹配代理
  const isFind = proxyKeys.some(proxyKey => {
    // 代理对应的链接地址
    const proxyUrls = proxys[proxyKey] || []
    // 检查是否为代理标识开头，是的则为拼接好的代理地址，直接进行下载
    if (url.indexOf(proxyKey) === 0) {
      // 代理链接下载
      dlClick(url, filename)
      // 找到了
      return true
    } else {
      // 便利代理列表
      return proxyUrls.some(proxyUrl => {
        // 下载链接匹配一个代理链接
        if (url.indexOf(proxyUrl) === 0) {
          // 链接下载
          dlMain(url, filename, proxyKey, proxyUrl)
          // 找到了
          return true
        }
      })
    }
  })
  // 返回匹配结果
  return isFind
}

/**
 * @description: 链接下载（代理下载、后台下载，优先代理下载，如未配置代理则使用后台下载）
 * @param {*} url 链接（例如：全链接(http://dowload.file/test.png) 、除去代理链接地址后剩余的部分(test.png))
 * @param {*} filename 文件名称，为空则取链接尾部文件名（例如：test.png）
 * @param {*} proxy 代理协议(例如：/dowload/，/dowload/ === http://dowload.file/)
 * @param {*} proxyhttp 代理协议链接地址，如果配置则会替换 url 中该段代理链接地址为 proxy 代理协议，所以 proxyhttp 有值，proxy 必须有值（例如：http://dowload.file/）
 * @return {*} Promise
 */
export function dlMain(url, filename, proxy, proxyhttp) {
  // Promise
  return new Promise((resolve, reject) => {
    // 下载地址
    var dowloadURL = url
    // 有代理链接地址，当前链接里面同时存在代理地址可以进行替换
    if (proxyhttp && proxy && dowloadURL.includes(proxyhttp)) {
      // 替换代理链接地址为代理协议
      dowloadURL = dowloadURL.replace(proxyhttp, proxy)
      // 代理链接下载
      dlClick(dowloadURL, filename)
      // 下载成功
      resolve()
    } else if (proxy) {
      // 将下载链接匹配上代理协议
      dowloadURL = proxy + dowloadURL
      // 代理链接下载
      dlClick(dowloadURL, filename)
      // 下载成功
      resolve()
    } else {
      // 链接下载
      dlFetch(dowloadURL, filename).then(() => { resolve() }).catch((err, res) => { reject(err, res) })
    }
  })
}

/**
 * @description: 链接下载（后台下载，先后台下载完成后再展示到前台下载历史中）
 * @param {*} url 链接
 * @param {*} filename 文件名称，默认自动截取链接尾部文件名
 * @return {*} Promise
 */
export function dlFetch(url, filename) {
  // Promise
  return new Promise((resolve, reject) => {
    // 获取链接二进制数据
    fetch(url).then((res) => {
      // 获得二进制数据
      res.blob().then((blob) => {
        // Blob 数据下载
        dlBlob(blob, filename || fileName(url))
        // 获取成功
        resolve()
      }).catch((err) => {
        // 获取失败
        reject(err, res)
      })
    }).catch((err) => {
      // 获取失败
      reject(err)
    })
  })
}

/**
 * @description: 使用 a 标签点击下载 Blob 数据
 * @param {*} blob Blob 数据
 * @param {*} filename 文件名称，默认自动截取链接尾部文件名
 */
export function dlBlob(blob, filename) {
  // 将数据包装成 Blob
  // const blob = new Blob([data])
  // 根据 Blob 创建 URL
  const url = URL.createObjectURL(blob)
  // 下载
  dlClick(url, filename)
}

/**
 * @description: 使用 a 标签点击下载代理文件链接、同域名文件链接
 * @param {*} url 连接
 * @param {*} filename 文件名称，默认自动截取链接尾部文件名
 */
export function dlClick(url, filename) {
  // 创建 a 标签
  const a = document.createElement('a')
  // 设置 a 标签的 download 属性值
  a.download = filename || fileName(url)
  // 将需要下载的URL赋值给 a 标签的 href
  a.href = url
  // 将 a 标签插入到页面
  // document.body.appendChild(alink)
  // 模拟鼠标 click 点击事件
  const event = new MouseEvent('click')
  // 触发鼠标点击事件
  a.dispatchEvent(event)
  // 触发点击事件
  // a.click()
  // 移除 a 标签
  // document.body.removeChild(alink)
}

/**
 * @description: 获取文件名
 * @param {*} url 链接
 * @return {*} 文件名
 */
function fileName(url) {
  // 文件名称
  var name = ''
  // 链接有值
  if (url) {
    // 获得最后一个斜杠坐标
    const index = url.lastIndexOf('/')
    // 从斜杆后一个坐标开始截取
    name = url.substring(index + 1)
  }
  // 返回
  return name
}