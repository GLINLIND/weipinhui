const rowList = require('./rowList.json');
const listLeft = require('./listLeft.json');
const listTop = require('./listTop.json');
const leftContent = require('./leftContent.json');

module.exports = ()=>{
    return {
        "rowList" : rowList.firstProducts,
        "listLeft" : listLeft.listLeft,
        "listTop" : listTop.data,
        "leftContent" : leftContent.leftContent
    }
}