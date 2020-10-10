// var src = require("./assets/pic/webpack.png")
// console.log(src);
// var img = document.createElement("img")
// img.src = src;
// document.body.appendChild(img);
var a = require('./live2.js');

require.ensure(["./live1.js"], function(require) {
    var asd = require("./live1.js");
}, 'tips');

const url = `/api/student/findAll?appkey=demo13_1545210570249`;
fetch(url).then(resp => resp.json()).then(resp => {
    console.log(resp);
})

//希望导入的模块结果是一个可用的资源路径
import png from "./assets/pic/webpack.png"
// const png = require('./assets/pic/webpack.png').default;
console.log(png);
var img = document.createElement("img");
img.src = png;
document.body.appendChild(img);