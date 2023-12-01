# @nj/utils

## 一、使用

- 安装

  ```sh
  $ npm i @netjoy/common-utils
  ```

- 引入

  ```javascript
  // 方式一
  import * as Utils from "@netjoy/common-utils";

  // 方式二
  import { xxx, xxx, xxx } from "@netjoy/common-utils";
  ```

- 函数支持

  ```javascript
  // ============================================================================================
  // 关于 校验
  // ============================================================================================

  /**
  * @description: 字符串是否首字母大写
  * @param {*} value 字符串
  * @return {*} true/false
  */
  export function IsTitleCase(value: string): boolean;

  /**
  * @description: 手机号码校验
  * @param {*} value 手机号码
  * @return {*} true/false
  */
  export function IsPhoneNumber(value: string): boolean;

  /**
  * @description: 邮箱校验
  * @param {*} value 邮箱
  * @return {*} true/false
  */
  export function IsEmail(value: string): boolean;

  /**
  * @description: 身份证号码校验
  * @param {*} value 身份证号码
  * @return {*} true/false
  */
  export function IsIdentityCode(value: string): boolean;

  /**
  * @description: 银行卡号校验
  * @param {*} value 银行卡号
  * @return {*} true/false
  */
  export function IsBankAccount(value: string): boolean;

  /**
  * @description: 正数校验（支持 1-2 位小数）
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsPositiveFloat(value: string): boolean;

  /**
  * @description: 正数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsPositiveNumber(value: string): boolean;

  /**
  * @description: 正整数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsPositiveInteger(value: string): boolean;

  /**
  * @description: 非零正整数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsPositiveIntegerPro(value: string): boolean;

  /**
  * @description: 非零负数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsNegativeNumber(value: string): boolean;

  /**
  * @description: 非零负数校验（支持 1-2 位小数）
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsNegativeNumberPro(value: string): boolean;

  /**
  * @description: 负整数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsNegativeInteger(value: string): boolean;

  /**
  * @description: 非零负整数校验
  * @param {*} value 数字
  * @return {*} true/false
  */
  export function IsNegativeIntegerPro(value: string): boolean;

  // ============================================================================================
  // 关于 数字
  // ============================================================================================

  /**
  * @description: 取两个数之间的随机数
  * @param {*} min 最小范围
  * @param {*} max 最大范围
  * @return {*} 随机数
  */
  export function RandomInt(min: number, max: number): number;

  // ============================================================================================
  // 关于 字符串
  // ============================================================================================

  /**
  * @description: 字符串首字母大写
  * @param {*} value 字符串
  * @return {*} 首字母大写的字符串
  */
  export function TitleCase(value: string): string;

  /**
  * @description: 手机号中间部分变星号
  * @param {*} value 手机号
  * @return {*} 处理后的手机号
  */
  export function PhoneEncryption(value: string): string;

  // ============================================================================================
  // 关于 Window
  // ============================================================================================

  /**
  * @description: 获取当前域名地址
  * @param {*} path 额外在域名地址后面追加的路径
  * @return {*} 完整的当前域名地址
  */
  export function DomainName(path?: string): string;

  /**
  * @description: 获取页面链接参数，解析链接附带的参数，默认为当前页面链接
  * @param {*} url 指定解析链接，默认为当前页面链接
  * @return {*} 参数对象
  */
  export function GetQueryAll(url?: string): {};

  /**
  * @description: 获取页面链接指定参数，解析链接附带的参数，默认为当前页面链接
  * @param {*} key 指定参数key
  * @param {*} url 指定解析链接，默认为当前页面链接
  * @return {*} 参数对象
  */
  export function GetQuery(key: string, url?: string): any;

  /**
  * @description: 获取 input 光标位置
  * @param {*} element 输入框标签
  * @return {*} 光标位置
  */
  export function InputPosition(element: any): number;

  /**
  * @description: 触发 window.resize 事件
  */
  export function TriggerWindowResizeEvent(): void;

  /**
  * @description: 节流函数
  * @param {*} fn 回调
  * @param {*} delay 延迟时长 s，默认 500
  */
  export function Throttle(fn: Function, delay: number): void;

  /**
  * @description: 防抖函数
  * @param {*} fn 回调
  * @param {*} delay 延迟时长 s，默认 500
  */
  export function Debounce(fn: Function, delay: number): void;

  // ============================================================================================
  // 关于 JSON
  // ============================================================================================

  /** 文档：https://blog.csdn.net/zz00008888/article/details/123236599
  * @description: 通过 key 规则快捷获取 JSON 数据中的值
  * @param {*} json 对象
  * @param {*} key Key规则
  * @return {*}
  */
  export function Value(json: { [key: any]: any }, key: any): any;

  // ============================================================================================
  // 关于 文件
  // ============================================================================================

  /**
  * @description: 获取文件后缀
  * @param {*} path 文件路径
  * @return {*} 文件后缀
  */
  export function FileExtension(path: string): string;
  ```
