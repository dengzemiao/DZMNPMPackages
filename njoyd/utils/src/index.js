// ============================================================================================
// 关于 Window
// ============================================================================================

/**
 * @description: 获取当前域名地址
 * @param {*} path 额外在域名地址后面追加的路径
 * @return {*} 完整的当前域名地址
 */
export function DomainName(path) {
  // 返回
  return window.location.protocol + '//' + window.location.host + (path || '')
}

/**
 * @description: 解析链接附带的参数，默认为当前页面链接
 * @param {*} url 指定解析链接
 * @return {*} 参数对象
 */
export function GetQuery(url = window.location.search) {
  // 参数
  const query = {}
  // 路径有值 && 包含 ？
  if (url && url.includes('?')) {
    // 参数字符串
    const queryString = url.split('?')[1]
    // 分割参数
    const pairs = queryString.split('&')
    // 便利解析
    pairs.forEach((pair) => {
      // 分割键值对
      const items = pair.split('=')
      // 组合键值对
      query[items[0]] = items[1]
    })
  }
  // 返回
  return query
}

// ============================================================================================
// 关于 JSON
// ============================================================================================

/** 文档：https://blog.csdn.net/zz00008888/article/details/123236599
 * @description: 通过 key 规则快捷获取 JSON 数据中的值
 * @param {*} json 对象
 * @param {*} key Key规则
 * @return {*}
 */
export function Value(json, key) {
  // 当前值
  var value = undefined
  // 是否有值
  if (json && key) {
    // 赋值
    value = json
    // 分析大括号
    if (key.includes('[') || key.includes(']')) {
      // 替换符号
      if (key.includes('[')) {
        key = key.replace(new RegExp('\\[', "gm"), '.')
        key = key.replace(new RegExp('\\]', "gm"), '')
      } else {
        key = key.replace(new RegExp('\\]', "gm"), '.')
      }
    }
    // 拆分
    const keys = key.split('.')
    // 过滤出来可用的 keys
    const newKeys = []
    // 过滤
    keys.forEach(itemKey => {
      // 有值则添加
      if (itemKey.length) { newKeys.push(itemKey) }
    })
    // 取值
    newKeys.some(itemKey => {
      // 直接取值
      if (value) { value = value[itemKey] }
      // 是否停止
      return !value
    })
  }
  // 返回
  return value
}