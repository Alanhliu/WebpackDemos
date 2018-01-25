## demo8.1

本demo8.1中引入一个新的loader html-loader（官方）
来处理demo8中的问题，html引入图片资源打包后图片资源路径变化的问题
<!--通过下面这种方式引入图片资源也是可以的，但感觉很别扭，还是希望通过传统的方式引入-->
<!--<img src="${ require('../assets/b.png') }">-->

所以引入html-loader（官方）来解决
网上很多都说用html-withimg-loader来解决，本人测试确实可以，但还是用官方的html-loader感觉靠谱些

参考
https://segmentfault.com/q/1010000007566185

