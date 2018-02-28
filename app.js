
var myexpress=require("./myexpress");
var obj=myexpress();
obj.listen();


obj.get("/abc",function (req,res) {
    res.sendFile("./abc.html")
})

obj.get("/aaa",function (req,res) {
    res.end("1");

})

obj.get("/bbb",function (req,res) {
    res.end("插入");
})
obj.post("/bbb",function (req,res) {

    res.end("获取")
})
obj.put("/bbb",function (req,res) {

    res.end("更新")
})


obj.delete("/bbb",function (req,res) {

    res.end("删除")
})

