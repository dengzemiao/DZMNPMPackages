## 一、使用

- 安装

  ```sh
  $ npm i @netjoy/excelex
  ```

- 引入

  ```javascript
  import * as Ex from "@netjoy/excelex";
  ```

- 使用（`将下面代码，放入导出事件函数中，调用即可！更换为自己的数据源与列对应的 key`）

  ```javascript
  // 需要导出的数据
  const dataSource = [
    {
      id: 1,
      name: "1",
      info: {
        num: 10,
      },
    },
    {
      id: 2,
      name: "2",
      time: "2015/12/20",
    },
    {
      id: 3,
      name: "3",
    },
  ];

  // Excel 列头
  const columns = [
    {
      name: "ID", // 非必填，如果不需要第一行有标题，则所有列 name 全空就行
      field: "id",
    },
    {
      name: "标题",
      field: "name",
    },
    {
      name: "数字",
      field: "info.num",
    },
    {
      name: "日期",
      field: "time",
    },
  ];

  // sheets 数据源
  const sheets = [
    {
      name: "Sheet1", // 非必填
      data: dataSource,
      columns: columns,
    },
    {
      name: "Sheet2",
      data: dataSource,
      columns: columns,
    },
  ];

  // 导出数据
  Ex.ex(sheets);
  // 自定义 (除了 sheets，都是非必填，文件名可以传 null)
  // Ex.ex(sheets, (item, field, json, sheetIndex, row, col, rowCount, colCount) => {
  //   return item
  // }, '指定文件名', 'xls')
  ```

## 二、进阶使用

- 进阶介绍

  ```javascript
  // 需要导出的数据
  const dataSource = [
    {
      id: 1,
      name: "1",
      // 默认支持 children 子层级导出
      children: [
        {
          id: 2,
          name: "1-2",
          // 默认支持 children 子层级嵌套导出，以此内推可以一直嵌套 children
          children: [
            {
              id: 3,
              name: "1-3",
            },
          ],
        },
        {
          id: 4,
          name: "1-4",
          info: {
            num: 10,
          },
        },
      ],
    },
    {
      id: 5,
      name: "5",
      // 日期格式支持 xxxx/xx/xx、xxxx-xx-xx、xxxx~xx~xx、xxxx年xx月xx日
      time: "2015/12/20",
    },
    {
      id: 6,
      name: "6",
    },
  ];

  // Excel 列头
  const columns = [
    {
      name: "ID",
      field: "id",
      // (可选)单元格样式
      style: {
        // 列宽
        colWidth: 100,
      },
    },
    {
      name: "标题",
      field: "name",
    },
    {
      name: "数字",
      // 多层级取值展示到 excel
      // 例如：{ id: 1, info: { num: 10 } }  = 'info.num'
      // 例如：{ id: 1, info: { detail: { num: 10 } } }  = 'info.detail.num'
      field: "info.num",
    },
    {
      name: "日期",
      field: "time",
      // 日期格式如果需要再表格中支持时间编辑，需要指定 dataType 为 Date，不指定按字符串展示
      dataType: "Date",
    },
  ];

  // 将要保存的 sheets 数据源
  const sheets = [
    {
      // 单个 sheet 名字
      name: "Sheet1",
      // 单个 sheet 数据源
      data: dataSource,
      // 单个 sheet 列名称与读取key
      columns: columns,
    },
    {
      // 单个 sheet 名字
      name: "Sheet2",
      // 单个 sheet 数据源
      data: dataSource,
      // 单个 sheet 列名称与读取key
      columns: columns,
    },
  ];

  // 导出数据
  // Ex.ex(sheets)
  Ex.ex(
    sheets,
    (item, field, json, sheetIndex, row, col, rowCount, colCount) => {
      return item;
    },
    "指定文件名",
    "xls"
  );
  ```

- `Column` 列中 `Style` 字段支持的样式属性

  ```javascript
  style: {
    // (可选)样式属性是否支持标题使用，默认 false
    supportTitle: true,
    // (可选)字体颜色
    color: '#00ff00',
    // (可选)字体大小
    fontSize: 12,
    // (可选)字体名称
    fontName: '宋体',
    // (可选)字体加粗：0 | 1
    fontBold: 1,
    // (可选)内容横向排版：Left、Center、Right
    alignmentHor: 'Center',
    // (可选)内容竖向排版：Top、Center、Bottom
    alignmentVer: 'Center',
    // (可选)背景颜色
    backgroundColor: '#FF0000',
    // (可选)行高，一行多列单元格，会取有行高值的最后一列使用，所以只要行高一样，可任意在一列设置行高，如果值不一样以最后有值的一列为准(单位：磅)
    // rowHeight: 100,
    // (可选)列宽，一列多行单元格，固定取每列的 0 行位置单元格列宽，目前与横向合并单元格存在定位冲突，也就是暂时不支持横向合并单元格时使用列宽属性(单位：磅)
    // colWidth: 100,
    // (可选)单元格边框颜色
    // 支持空格分开进行单边设置 borderColor: '#00ff00 #00ff00 #00ff00 #00ff00'，如果进行单边设置，没设置的边不显示，默认 #000000
    borderColor: '#00ff00',
    // (可选)单元格边框宽度
    // 支持空格分开进行单边设置 borderWidth: '1 2 1 2'，如果进行单边设置，没设置的边不显示
    borderWidth: 1,
    // (可选)单元格边框显示位置：Left、Top、Right、Bottom
    // 支持空格分开进行单边设置 borderPosition: 'Left Top Right Bottom'，支持空格分开进行单边设置，没设置的边不显示，默认:（空 || '' === borderPosition: 'Left Top Right Bottom'）
    borderPosition: '',
    // (可选)单元格边框样式：Continuous、Dash、Dot、DashDot、DashDotDot、Double，默认 Continuous
    // 支持空格分开进行单边设置 borderStyle: 'Continuous Dash Dot DashDot'，如果进行单边设置，没设置的边不显示
    borderStyle: 'Continuous',
    // (可选)合并单元格列表（row 不传则为每行，也可以放到数组底部，作为通用行使用，如果放到数组第0位，会直接使用这个通用样式，后面的样式不会在被使用上）
    merges:[
      {
        // (可选)合并单元格从该字段这一列的第几行开始，索引从 0 开始，不传则为每行，为该列通用行
        row: 1,
        // (可选)横向合并几列单元格，默认 0 也就是自身
        // hor: 2,
        // (可选)竖向合并几行单元格，默认 0 也就是自身，竖向合并有个小细节，就是合并的几个单元格数据要一致，横向合并没这个问题
        ver: 1
      },
      {
        // 通用合并模板：相当于所有没有指定 row 的行都使用通用合并模板
        // (可选)合并单元格从该字段这一列的第几行开始，索引从 0 开始，不传则为每行
        // row: 3
        // (可选)横向合并几列单元格，默认 0 也就是自身
        // hor: 3
        // (可选)竖向合并几行单元格，默认 0 也就是自身，竖向合并有个小细节，就是合并的几个单元格数据要一致，横向合并没这个问题
        ver: 1
        // ver: 1
      }
    ]
  }
  ```

## 三、扩展介绍

- 导出函数

  | 函数                                                                                                   | 说明                        |
  | ------------------------------------------------------------------------------------------------------ | --------------------------- |
  | `Ex.ex`(sheets: SheetArray, beforeWrite?: BeforeWrite, fileName?: string, fileSuffix?: FileSuffix)     | 将数据导出到 `Excel` 文件中 |
  | `Ex.write`(sheets: SheetArray, beforeWrite?: BeforeWrite, fileName?: string, fileSuffix?: FileSuffix)  | 将数据导出到 `Excel` 文件中 |
  | `Ex.Export`(sheets: SheetArray, beforeWrite?: BeforeWrite, fileName?: string, fileSuffix?: FileSuffix) | 将数据导出到 `Excel` 文件中 |
  | 以上 `3` 种导出函数结果均一致，只是方法别名不同。                                                      |                             |

- 数据类型

  ```javascript
  // Json 约束
  export type JsonObject = { [key: string]: JsonValue }

  // Json 数组约束
  export type JsonArray = Array<JsonValue>

  // Value 约束
  export type JsonValue = string | number | boolean | null | undefined | JsonObject | JsonArray

  // Column 数组约束
  export type ColumnArray = Array<Column>

  // Sheet 数组约束
  export type SheetArray = Array<Sheet>

  // 数据类型
  export enum DataType {
    // 默认自动识别（内部自动识别）
    auto = 'undefined',
    // 日期类型（有特殊处理，转为表格时间格式，需要在表格中支持时间格式时，需指定，否则当字符串展示）
    // 日期格式支持 xxxx/xx/xx、xxxx-xx-xx、xxxx~xx~xx、xxxx年xx月xx日
    date = 'Date',
    // 数字类型（有特殊处理，超过 11 位会转为字符串）
    number = 'Number'
  }

  // 文件后缀类型
  export enum FileSuffix {
    xls = 'xls',
    xlsx = 'xlsx',
    csv = 'csv',
    txt = 'txt'
  }

  // Column 约束
  export interface Column {
    // 列名
    name: string,
    // 列 key
    field: string,
    // 列数据类型
    dataType?: DataType | string,
    // 列样式
    style?: JsonObject
  }

  // Sheet 约束
  export interface Sheet {
    // 名字
    name: string,
    // 数据源
    data: JsonArray
    // 列对应的 名称 key，用于从数据源中获取数据
    columns: ColumnArray
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
  ) => JsonObject

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
  ): void

  // 别名
  export {
    Export as ex,
    Export as write
  }
  ```
