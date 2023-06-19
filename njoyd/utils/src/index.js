// ============================================================================================
// 关于 校验
// ============================================================================================

/**
 * @description: 字符串是否首字母大写
 * @param {*} value 字符串
 * @return {*} true/false
 */
export function IsTitleCase(value) {
  return /^[A-Z][A-z0-9]*$/.test(value)
}

/**
 * @description: 手机号码校验
 * @param {*} value 手机号码
 * @return {*} true/false
 */
export function IsPhoneNumber(value) {
  return /^1[3456789]\d{9}$/.test(value)
}

/**
 * @description: 邮箱校验
 * @param {*} value 邮箱
 * @return {*} true/false
 */
export function IsEmail(value) {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)
}

/**
 * @description: 身份证号码校验
 * @param {*} value 身份证号码
 * @return {*} true/false
 */
export function IsIdentityCode(value) {
  return /^([1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3}[0-9Xx])|([1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])\d{3})$/.test(value)
}

/**
 * @description: 银行卡号校验
 * @param {*} value 银行卡号
 * @return {*} true/false
 */
export function IsBankAccount(value) {
  return /^[0-9a-zA-Z]{1,40}$/.test(value)
}

/**
 * @description: 正数校验（支持 1-2 位小数）
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsPositiveFloat(value) {
  return /^\d+(?:\.\d{1,2})?$/.test(value)
}

/**
 * @description: 正数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsPositiveNumber(value) {
  return /^\d+(\.\d+)?$/.test(value)
}

/**
 * @description: 正整数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsPositiveInteger(value) {
  return /^\d+$/.test(value)
}

/**
 * @description: 非零正整数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsPositiveIntegerPro(value) {
  return /^\+?[1-9][0-9]*$/.test(value)
}
/**
 * @description: 非零负数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsNegativeNumber(value) {
  return /^(-\d+)(\.\d+)?$/.test(value)
}

/**
 * @description: 非零负数校验（支持 1-2 位小数）
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsNegativeNumberPro(value) {
  return /^(-\d+)(?:\.\d{1,2})?$/.test(value)
}

/**
 * @description: 负整数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsNegativeInteger(value) {
  return /^((-\d+)|(0+))$/.test(value)
}

/**
 * @description: 非零负整数校验
 * @param {*} value 数字
 * @return {*} true/false
 */
export function IsNegativeIntegerPro(value) {
  return /^\-[1-9][0-9]*$/.test(value)
}

// ============================================================================================
// 关于 数字
// ============================================================================================

/**
 * @description: 取两个数之间的随机数
 * @param {*} min 最小范围
 * @param {*} max 最大范围
 * @return {*} 随机数
 */
// export function RandomInt(min, max) {
// }

// ============================================================================================
// 关于 字符串
// ============================================================================================

/**
 * @description: 字符串首字母大写
 * @param {*} value 字符串
 * @return {*} 首字母大写的字符串
 */
export function TitleCase(value) {
  return value.substring(0, 1).toUpperCase() + value.substring(1)
}

/**
 * @description: 手机号中间部分变星号
 * @param {*} value 手机号
 * @return {*} 处理后的手机号
 */
export function PhoneEncryption(value) {
  return value.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

// ============================================================================================
// 关于 Window
// ============================================================================================

/**
 * @description: 获取当前域名地址
 * @param {*} path 额外在域名地址后面追加的路径
 * @return {*} 完整的当前域名地址
 */
export function DomainName(path) {
  return window.location.protocol + '//' + window.location.host + (path || '')
}

/**
 * @description: 获取页面链接参数，解析链接附带的参数，默认为当前页面链接
 * @param {*} url 指定解析链接，默认为当前页面链接
 * @return {*} 参数对象
 */
export function Query(url = window.location.search) {
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

/**
 * @description: 获取 input 光标位置
 * @param {*} element 输入框标签
 * @return {*} 光标位置
 */
export function InputPosition(element) {
  let cursorPos = 0;
  if (document.selection) {
    // 兼容IE
    const selectRange = document.selection.createRange()
    selectRange.moveStart('character', -element.value.length)
    cursorPos = selectRange.text.length
  } else if (element.selectionStart || element.selectionStart === '0') {
    cursorPos = element.selectionStart
  }
  return cursorPos
}

/**
 * @description: 触发 window.resize 事件
 */
export function TriggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * @description: 节流函数
 * @param {*} fn 回调
 * @param {*} delay 延迟时长 s
 */
export function Throttle(fn, delay = 500) {
  let timer;
  return function () {
    const _this = this
    const args = arguments
    // 当定时器存在就直接返回，知道当前事件执行完毕
    if (timer) {
      // 关键点
      return
    }
    timer = setTimeout(function () {
      fn.apply(_this, args)
      // 关键点 这里是当对应函数执行后，将timer赋值为空，以便下次定时器事件重新开始
      timer = null
    }, delay)
  }
}

/**
 * @description: 防抖函数
 * @param {*} fn 回调
 * @param {*} delay 延迟时长 s
 */
export function Debounce(fn, delay = 500) {
  let timer
  return function () {
    // 当前函数的 this
    const _this = this
    // 实参，数组形式
    const args = arguments
    // 再次触发时，清除掉上一次的定时器重新调用对应的函数
    if (timer) {
      // 关键点
      clearTimeout(timer)
    }
    // 定时器函数
    timer = setTimeout(function () {
      // 这里是将自定义的函数指向到当前函数
      fn.apply(_this, args)
    }, delay)
  }
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

// ============================================================================================
// 关于 文件
// ============================================================================================

/**
 * @description: 获取文件后缀
 * @param {*} path 文件路径
 * @return {*} 文件后缀
 */
export function FileExtension(path) {
  // 后缀类型
  var type = ''
  // 路径有值
  if (path) {
    // 获取路径中最后一个 '.' 位置
    const strs = path.split('.')
    // 截取尾部后缀
    type = strs[strs.length - 1] || ''
  }
  // 返回
  return type
}