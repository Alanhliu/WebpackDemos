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

本demo6学习时请对比demo5中的目录结构，
将index.js, second.js中引入的background.common.less公共样式打包(background.common.min.less)
个人感觉这只是打包公共样式的其中一种方式
还有一种方式利用CommonsChunkPlugin
(https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle)
把引入公共样式的.js文件打包成一个common.js,然后就对对应生成一个common.css