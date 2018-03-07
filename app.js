var server=require("./myexpress");
var fs=require("fs");
var mysql  = require('mysql');
var body=require("./body.js");
var demo=require("./demo.js");



var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'w1710'
});


var app=server();
app.use(body())
app.use(demo())

app.listen(8888);


app.get("/",function (req,res) {

    connection.query("select * from admin",function (err,result) {
        res.render("1.html",{result:result})
    })

})

app.get("/add",function (req,res) {
    console.log(req.query);
    res.end("add");
})

app.get("/del",function (req,res) {
    var id=req.query.id

    connection.query("delete from admin where aid="+id,function (err,result) {

        res.redirect("/");
    })
})

app.post("/add",function (req,res) {

    console.log(req.body.name);
    console.log(req.body.pass);
    res.end("add");
})

