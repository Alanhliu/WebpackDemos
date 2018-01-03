## 说明
最简单的`hello world`示例项目，说明如下:

* 只有一个`index.html`,`index.js`和`index.css`
* html采用`HtmlWebpackPlugin`插件进行加载(这样可以自动监听并刷新浏览器)，入口是`index.js`(这样打包后会自动引入`bundle.js`)
* css文件在入口js文件内引入，并且一起打包成`bundle.js`，这个文件里包括了相应的脚本已经样式

## 使用步骤

* `npm install`安装所有依赖包
* `npm run build`可以构建出部署包
* `npm run serve`会开启服务器(端口`8082`)，并且自动监听页面变化更新服务器端页面
	* 默认`iframe`模式(如`http://localhost:8082/webpack-dev-server/`)和`inline`模式(如`http://localhost:8082/`)都可以看到刷新

**注意:**
serve端运行的文件在项目中是看不到的，并不是`build`目录下的文件。

本demo8学习时请对比demo7中的目录结构
本节主要演示了如何打包图片资源，并且怎样在js,css,html中引入
//细心的同学会发现这里name带hash和不带hash的区别

//1.html引入图片资源
//不带[hash]时，开发阶段html里引入的图片资源(小明)
// <img src="../assets/a.png" alt="">
//和build后的生产阶段里图片的路径是相同的，所以能访问到图片资源
//带[hash]时，生产环境的图片资源是../assets/a_[hash].png，
//而html(小明)中图片资源仍然访问的是../assets/a.png,
//所以带[hash]后html(小明)引入的图片资源就不能访问了
//问题：那么加了[hash]后或build后图片路径变化了，
//     html中(小明)该如何加载正确的图片路径？

//2.css引入图片资源
//因为有css-loader对图片的处理
//会把开发阶段background-image: url(../assets/a.png);
//转为生产阶段background-image: url(../assets/a_[hash].png);