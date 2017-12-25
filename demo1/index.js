/**
 * Created by siasun on 2017/12/25.
 */
//这里打包时会把index.css打包到index.js中的，显然是不可理的
//因为js文件较大时浏览器加载js时会卡主，导致css样式出现的会比较慢
//并且我们也习惯css,js,html这些文件分开的形式，以后会优化的
require('./index.css')
console.log("1");