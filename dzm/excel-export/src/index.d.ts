// Json 约束
export type JsonObject = { [key: string]: JsonValue };

// Json 数组约束
export type JsonArray = Array<JsonValue>;

// Value 约束
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonArray;

// Column 数组约束
export type ColumnArray = Array<Column>;

// Sheet 数组约束
export type SheetArray = Array<Sheet>;

// 数据类型
export enum DataType {
  // 默认自动识别（内部自动识别）
  auto = "undefined",
  // 日期类型（有特殊处理，转为表格时间格式，需要在表格中支持时间格式时，需指定，否则当字符串展示）
  // 日期格式支持 xxxx/xx/xx、xxxx-xx-xx、xxxx~xx~xx、xxxx年xx月xx日
  date = "Date",
  // 数字类型（有特殊处理，超过 11 位会转为字符串）
  number = "Number",
}

// 文件后缀类型
export enum FileSuffix {
  xls = "xls",
  xlsx = "xlsx",
  csv = "csv",
  txt = "txt",
}

// Column 约束
export interface Column {
  // 列名
  name: string;
  // 列 key
  field: string;
  // 列数据类型
  dataType?: DataType | string;
  // 列样式
  style?: JsonObject;
}

// Sheet 约束
export interface Sheet {
  // 名字
  name: string;
  // 数据源
  data: JsonArray;
  // 列对应的 名称 key，用于从数据源中获取数据
  columns: ColumnArray;
}

// 写入之前回调
export type BeforeWrite = (
  // 单元格数据
  item: JsonObject,
  // 单元格字段 key
  field: string,
  // 单元格原始数据
  json: object,
  // 第几个 sheet
  sheetIndex: number,
  // 第几行
  row: number,
  // 第几列
  col: number,
  // 当前 sheet 总共多少行
  rowCount: number,
  // 当前 sheet 总共多少列
  colCount: number
  // 返回数据约束
) => JsonObject;

// 导出函数
export function Export(
  // sheet 数组
  sheets: SheetArray,
  // 写入之前回调
  beforeWrite?: BeforeWrite,
  // 文件名
  fileName?: string,
  // 文件后缀，默认 xls
  fileSuffix?: FileSuffix | string
  // 无返回数据
): void;

// 别名
export { Export as ex, Export as write };
