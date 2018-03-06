function compile(str) {
    var str=str.replace(/\n/g,"").replace(/'/g,'"');
    //1. 处理识别变量
    str=str.replace(/<%=([^%>]*)%>/g,function (a,b) {
        return "'+"+b+"+'";
    })

    //2. 处理识别语句
    str=str.replace(/<%([^%>]*)%>/g,function (a,b) {
        return "';\n"+b+"\ntpl+='"
    })
    str="tpl+='"+str+"'";
    str="var tpl='';with(obj){"+str+"}\n return tpl";


    return new Function("obj",str);
}



function render(str,data) {

    return compile(str)(data);
}
module.exports=render

