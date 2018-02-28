
var myexpress=require("./myexpress");
var obj=myexpress();
obj.listen();

var url="/abc/zhangsan";
var rule="/abc/:id"


function change(rule){

    var reg="/"+rule.replace(/\//g,"\\/").replace(/:[^\/]+/g,"([^\\/]+)")+"/";

    console.log(eval(reg).exec(url)[1]);
}

change(rule);





process.exit();


obj.get("/abc/:id",function (req,res) {
    res.sendFile("./abc.html")
})

