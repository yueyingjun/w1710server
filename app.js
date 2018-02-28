
var myexpress=require("./myexpress");
var obj=myexpress();
obj.listen();

var url="/abc/zhangsan/lisi/wangwu";
var rule="/abc/:id/:id1/:id2"





function change(rule){

    var arr=rule.match(/:([^\/]+)/g);

    arr=arr.map(function (item) {
        return item.substr(1);
    });
    console.log(arr);

    var reg="/"+rule.replace(/:[^\/]+/g,"([^\\/]+)").replace(/\//g,"\\/")+"/";


    var obj={};

    var result=eval(reg).exec(url);
    for(var i=0;i<arr.length;i++){
        obj[arr[i]]=result[i+1]
    }

   console.log(obj.id2)

}

change(rule);





process.exit();


obj.get("/abc/:id",function (req,res) {
    res.sendFile("./abc.html")
})

