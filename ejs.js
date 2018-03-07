var os=require("os");
function compile(str) {
    var reg=RegExp(os.EOL,"g");
    var str=str.replace(reg,"").replace(/'/g,'"');
    //1. 处理识别变量
    str=str.replace(/<%=([^%>]*)%>/g,function (a,b) {
        return "'+"+b+"+'";
    })
    //2. 处理识别语句
    str=str.replace(/<%([^%>]*)%>/g,function (a,b) {
        return "';"+os.EOL+b+os.EOL+"tpl+='"
    })
    str="tpl+='"+str+"'";
    str="var tpl='';with(obj){"+str+"}"+os.EOL+" return tpl";

    return new Function("obj",str);
}



function render(str,data) {

    return compile(str)(data);
}
module.exports=render

