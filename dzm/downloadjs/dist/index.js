var proxys={};function setProxy(e){proxys=e}function dlProxy(t,l){return Object.keys(proxys||{}).some(n=>{var e=proxys[n]||[];return 0===t.indexOf(n)?(dlClick(t,l),!0):e.some(e=>{if(0===t.indexOf(e))return dlMain(t,l,n,e),!0})})}function dlMain(l,c,r,i){return new Promise((e,t)=>{var n=l;i&&r&&n.includes(i)?(dlClick(n=n.replace(i,r),c),e()):r?(dlClick(n=r+n,c),e()):dlFetch(n,c).then(()=>{e()}).catch((e,n)=>{t(e,n)})})}function dlFetch(c,r){return new Promise((t,l)=>{fetch(c).then(n=>{n.blob().then(e=>{dlBlob(e,r||fileName(c)),t()}).catch(e=>{l(e,n)})}).catch(e=>{l(e)})})}function dlBlob(e,n){dlClick(URL.createObjectURL(e),n)}function dlClick(e,n){var t=document.createElement("a"),n=(t.download=n||fileName(e),t.href=e,new MouseEvent("click"));t.dispatchEvent(n)}function fileName(e){var n,t="";return e&&(n=e.lastIndexOf("/"),t=e.substring(n+1)),t}export{setProxy,dlProxy,dlMain,dlFetch,dlBlob,dlClick};