var server=require("./myexpress");
var fs=require("fs");

var app=server();
app.listen(8888);

app.get("/",function (req,res) {
     res.render("1.html",{result:[{name:"zhangsan"},{name:"lisi"}]})
})

