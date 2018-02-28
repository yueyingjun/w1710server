var http=require("http");
var fs=require("fs");
var path=require("path")

class myexpress{
    constructor(){
        this.getInfo={};
        this.postInfo={};
        this.deleteInfo={};
        this.putInfo={};
    }
    /*
    * listen 方法用来启动服务器
    *
    * [port] 端口 默认值 8888  type number [3333-8888]
    * [callback] 回调函数  默认值   console.log(port+"启动....") type function
    * */
    listen(port,callback){
        if(arguments.length==0){
            var port="8888";
            var callback=function () {
                console.log(port+"启动....")
            }
        }
        if(arguments.length==1){
           if(typeof port=="number"){
               var port=port;
               var callback=function () {
                   console.log(port+"启动....")
               }
           }else if(typeof port=="function"){
               var callback=port;
               var port=8888;
           }
        }
        if(arguments.length==2){
            var port=port;
            var callback=callback;
        }

        http.createServer((req,res)=> {

            this.run(req,res)
        }).listen(port,function () {
            callback();
        })
    }

    get(url,callback){
        // 算法和数据结构
        this.getInfo[url]=callback;
    }
    post(url,callback){
        this.postInfo[url]=callback;
    }
    delete(url,callback){
        this.deleteInfo[url]=callback;
    }
    put(url,callback){
        this.putInfo[url]=callback;
    }
    run(req,res){

        var url=req.url;
        if(url=="/favicon.ico"){
            res.end()
        }else {
            console.log(req.method);
            res.sendFile=function (fileUrl) {

                var fullurl=path.join(process.cwd(),fileUrl);
                fs.stat(fullurl,function (err) {
                    if(err){
                        res.writeHead(404);
                        res.end("html找不到")
                    }else{
                        fs.createReadStream(fullurl).pipe(res);
                    }
                })
            }
            
            var infos=this[req.method.toLowerCase()+"Info"];

            console.log(infos);
            if(infos[url]) {
                infos[url](req, res)
            }else{
                res.end("page not find");
            }
        }
    }
}
module.exports=function () {
    return new myexpress();
}