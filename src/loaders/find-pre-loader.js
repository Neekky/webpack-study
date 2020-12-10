module.exports = function loader(sourceCode) {
    let reg = /pre.caibeike.net/
    if (reg.test(sourceCode)) {
        console.log(this.resourcePath, '包含pre路径');
    }
    return sourceCode;
}