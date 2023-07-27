/**
 * @description: 代理对象
 */
export type DLProxy = { [key: string]: Array<string> };

/**
 * @description: 配置代理
 * @param {*} proxy 代理配置 { '/download1/': ['https://www.baidu.com/', ...], /download2/': [] }
 */
export function setProxy(proxy: DLProxy): void;

/**
 * @description: 代理下载
 * @param {*} url 链接（例如：全链接(http://dowload.file/test.png) 、附带代理标识的链接(/dowload/test.png，代理配置：/dowload/：['http://dowload.file/']))
 * @param {*} filename 文件名称，为空则取链接尾部文件名
 * @return {*} 是否匹配到代理协议，进入了下载
 */
export function dlProxy(url: string, filename?: string): boolean;

/**
 * @description: 链接下载（代理下载、后台下载，优先代理下载，如未配置代理则使用后台下载）
 * @param {*} url 链接（例如：全链接(http://dowload.file/test.png) 、除去代理链接地址后剩余的部分(test.png))
 * @param {*} filename 文件名称，为空则取链接尾部文件名（例如：test.png）
 * @param {*} proxy 代理协议(例如：/dowload/，/dowload/ === http://dowload.file/)
 * @param {*} proxyhttp 代理协议链接地址，如果配置则会替换 url 中该段代理链接地址为 proxy 代理协议，所以 proxyhttp 有值，proxy 必须有值（例如：http://dowload.file/）
 * @return {*} Promise
 */
export function dlMain(url: string, filename?: string, proxy?: string, proxyhttp?: string): Promise;

/**
 * @description: 链接下载（后台下载，先后台下载完成后再展示到前台下载历史中）
 * @param {*} url 链接
 * @param {*} filename 文件名称，默认自动截取链接尾部文件名
 * @return {*} Promise
 */
export function dlFetch(url: string, filename?: string): Promise;

/**
 * @description: 使用 a 标签点击下载 Blob 数据
 * @param {*} blob Blob 数据
 * @param {*} filename 文件名称
 */
export function dlBlob(blob: Blob, filename?: string): void;

/**
 * @description: 使用 a 标签点击下载代理文件链接、同域名文件链接
 * @param {*} url 连接
 * @param {*} filename 文件名称，默认自动截取链接尾部文件名
 */
export function dlClick(url: string, filename?: string): void;
