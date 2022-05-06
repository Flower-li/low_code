// module.exports = {
//   devServer: {
//     proxy: {
//       "/ma": {
//         //target: "http://192.18.1.75:9999/hrms",
//         target: "http://172.16.1.150:8080",
//         ws: true, //是否代理websockets
//         changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL
//         pathRewrite: {
//           //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
//           "^/ma": ""
//         }
//       }
//     }
//   }
// };
// module.exports = {
//   //publicPath: "web_uat", //根路径
//   //outputDir: "dis_uat" //打包的时候生成的一个文件名
//   // assetsDir:'mzpy_1',//静态资源目录(js,css,img,fonts)这些文件都可以写里面
// };
