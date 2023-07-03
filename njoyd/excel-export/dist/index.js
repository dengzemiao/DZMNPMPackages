function Export(e,c,t,o){var r;e&&e.length&&(r=[],t=t||EXNowTime(),o=o||"xls",e.forEach((e,s)=>{var a,n=[],t=e.columns||[],i=t.length,o=e.data||[],d=o.length,o=(t.every(e=>!e.name)||(a=[],t.forEach((e,t)=>{var o=Object.keys(e.style||{}),r=!1,l=(o.includes("supportTitle")&&(r=e.style.supportTitle),{}),o=(o.includes("colWidth")&&(l={colWidth:e.style.colWidth}),{data:e.name,style:r?e.style:l});(o=c?c(o,e.field,e,s,n.length,t,d,i):o)&&!o.hide&&a.push(o)}),n.push(a)),o.forEach(r=>{var l=[];t.forEach((e,t)=>{var o={data:GetColumnData(r,e.field),dataType:e.dataType,style:e.style||{}};(o=c?c(o,e.field,r,s,n.length,t,d,i):o)&&!o.hide&&l.push(o)}),n.push(l),ExportChildren(n,t,r.children,c,s,d,i)}),{name:e.name,rows:n});r.push(o)}),["xls","xlsx"].includes(o)?ExportExcel(r,t,o):["csv","txt"].includes(o)&&ExportCsv(r,t,o))}function ExportChildren(s,e,t,a,n,i,d){t=t||[];t.length&&t.forEach(r=>{var l=[];e.forEach((e,t)=>{var o={data:GetColumnData(r,e.field),dataType:e.dataType,style:e.style||{}};(o=a?a(o,e.field,r,n,s.length,t,i,d):o)&&!o.hide&&l.push(o)}),s.push(l),ExportChildren(s,e,r.children,a,n,i,d)})}function GetColumnData(e,t){var o=void 0,r=t.split(".");if(1<r.length)for(var o=e,l=0;l<=r.length-1&&void 0!==(o=o[""+r[l]]);)l+=1;else o=e[t];return o}function ExportCsv(e,r,l){e&&e.length&&e.forEach((e,t)=>{var o=[];e.rows.forEach(e=>{var t=[];e.forEach(e=>{t.push(e.data||"")}),o.push(t.join())}),EXDownload(o.join("\r\n"),e.name||r+(0===t?"":"-"+t),l)})}function ExportExcel(e,t,o){var r,d,l;e&&e.length&&(r=`
  <?xml version="1.0" encoding="UTF-8"?>
  <?mso-application progid= "Excel.Sheet"?>`,r+=`<Workbook
  xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:html="http://www.w3.org/TR/REC-html40">`,d=[],l=[],e.forEach((e,n)=>{var t=`<Worksheet ss:Name="${e.name||"Sheet"+(n+1)}">`,i=(t+="<Table>",""),o="";e.rows.forEach((e,l)=>{var s="<Row>",a="";e.forEach((e,t)=>{var o=e.style||{},o=(0!==o.rowHeight&&!o.rowHeight||(s=`<Row ss:Height="${e.style.rowHeight}">`),0!==l||0!==o.colWidth&&!o.colWidth||(i+=`<Column ss:Index="${t+1}" ss:AutoFitWidth="0" ss:Width="${o.colWidth}"/>`),`s${n}-${l}-`+t),t=e.dataType||typeof e.data,r=("Number"===(t="undefined"!==t?t.replace(t[0],t[0].toUpperCase()):t)&&1e10<e.data&&(t="String"),"Date"===e.dataType&&(t="String",e.data)&&(t="Number",e.data=EXDateNumber(e.data)),EXStyle(e,o)),r=(r&&d.push(r),EXCell(e,t,o,l));a+=r}),o=(o+=s)+a+"</Row>"}),t=t+i+o,l.push(t=t+"</Table>"+"</Worksheet>")}),d.length&&(r+="<Styles>",d.forEach(e=>{r+=e}),r+="</Styles>"),l.forEach(e=>{r+=e}),EXDownload(r+="</Workbook>",t,o))}function EXStyle(e,t){var o=!1,r=e.style||{},l=Object.keys(r),t=`<Style ss:ID="${t}">`;if("Date"===e.dataType&&e.data&&(o=!0,t+='<NumberFormat ss:Format="Short Date"/>'),l.length){var e=l.includes("color"),s=l.includes("fontSize"),a=l.includes("fontName"),n=l.includes("fontBold"),i=l.includes("alignmentHor"),d=l.includes("alignmentVer"),c=l.includes("backgroundColor"),h=(h=l.includes("borderColor"))&&!!r.borderColor,u=(u=l.includes("borderWidth"))&&!!r.borderWidth,l=(l=l.includes("borderStyle"))&&!!r.borderStyle;if((e||s||a||n)&&(o=!0,$="<Font",a&&($+=` ss:FontName="${r.fontName}"`),$+=' x:CharSet="134"',s&&($+=` ss:Size="${r.fontSize}"`),e&&($+=` ss:Color="${r.color}"`),n&&($+=` ss:Bold="${r.fontBold}"`),t+=$+="/>"),(i||d)&&(o=!0,$="<Alignment",i&&($+=` ss:Horizontal="${r.alignmentHor}"`),d&&($+=` ss:Vertical="${r.alignmentVer}"`),t+=$+="/>"),c&&(o=!0,t+=`<Interior ss:Color="${r.backgroundColor}" ss:Pattern="Solid"/>`),h||u||l){o=!0;var f,m=""+(r.borderColor||"#000000"),p=""+(0===r.borderWidth?0:r.borderWidth||1),g=""+(r.borderPosition||"Left Top Right Bottom"),E=""+(r.borderStyle||"Continuous"),y=m.split(" "),v=p.split(" "),x=g.split(" "),b=E.split(" "),w=(1===y.length&&(y=[f=y[0],f,f,f]),1===v.length&&(v=[f=v[0],f,f,f]),1===b.length&&(b=[f=b[0],f,f,f]),Math.max(Math.min(y.length,v.length,x.length,b.length),0)),$="<Borders>";for(let e=0;e<w;e++)m=y[e],p=v[e],$+=`<Border ss:Position="${g=x[e]}" ss:LineStyle="${E=b[e]}" ss:Weight="${p}" ss:Color="${m}"/>`;t+=$+="</Borders>"}}return t+="</Style>",o?t:""}function EXCell(e,t,o,r){var l,s,a=e.style||{},o=`<Cell ss:StyleID="${o}"`;return Object.keys(a).includes("merges")&&(a=(a.merges||[]).find(e=>!e.row&&0!==Number(e.row)||Number(e.row)===r)||{})&&(l=(s=Object.keys(a)).includes("hor"),s=s.includes("ver"),l&&(o+=` ss:MergeAcross="${a.hor}"`),s)&&(o+=` ss:MergeDown="${a.ver}"`),o=(o=(o+=">")+`<Data ss:Type="${t||""}">`+(""+(e.data||"")))+"</Data>"+"</Cell>"}function EXDateNumber(e){var t;return e?(t=new Date("1900/01/01"),e=(e=(e=(e=(e=e.replaceAll("-","/")).replaceAll("~","/")).replaceAll("年","/")).replaceAll("月","/")).replaceAll("日",""),e=new Date(e),Math.floor((e-t)/1e3/60/60/24)+2):""}function EXDownload(e,t,o){var r=document.createElement("a"),t=(r.download=t+"."+o,new Blob([e]));r.href=URL.createObjectURL(t),r.click()}function EXNowTime(){var e=new Date,t=e.getFullYear(),o=e.getMonth()+1,r=e.getDate(),l=e.getHours(),s=e.getMinutes(),e=e.getSeconds();return t+`-${o=1<=o&&o<=9?"0"+o:o}-${r=0<=r&&r<=9?"0"+r:r} ${l=0<=l&&l<=9?"0"+l:l}:${s=0<=s&&s<=9?"0"+s:s}:`+(e=0<=e&&e<=9?"0"+e:e)}export{Export as ex,Export as write};