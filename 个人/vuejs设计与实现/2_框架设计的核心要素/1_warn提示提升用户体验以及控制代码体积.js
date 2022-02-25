/*
 * @Author: your name
 * @Date: 2022-02-25 16:41:27
 * @LastEditTime: 2022-02-25 17:59:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \web\学习代码\个人\vuejs设计与实现\2_框架设计的核心要素\1_warn提示提升用户体验以及控制代码体积.js
 */
//提供友好的警告信息能帮助用户快速定位问题，节省用户时间，收获口碑

//控制代码体积
//TreeShaking  rollup/webpack 自动识别部分dead code 并在打包时忽略

///*#__PURE__ */注释能让打包工具知道调用该函数不会产生副作用，可以放心treeshaking

//配置特性开关  例子:vue3 兼容vue2 options api ，如果确定不用options api 可配置_vue_options_api_为false 来取消支持options api的代码的打包
