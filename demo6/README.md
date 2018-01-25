## demo6

本demo6学习时请对比demo5中的目录结构，
将index.js, second.js中引入的background.common.less公共样式打包(background.common.min.less)
个人感觉这只是打包公共样式的其中一种方式
还有一种方式利用CommonsChunkPlugin
(https://github.com/webpack/webpack/tree/master/examples/multiple-entry-points-commons-chunk-css-bundle)
把引入公共样式的.js文件打包成一个common.js,然后就对对应生成一个common.css