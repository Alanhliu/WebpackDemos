## demo8

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