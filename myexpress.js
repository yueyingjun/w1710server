 var http=require("http");
 var path=require("path");
 var fs=require("fs");
 var reqUrl=require("url");
 var ejs=require("./ejs.js");

 var querystring=require("querystring");


 //  1.  创建服务器  2.  采集信息   3. 比对

 class server{
     constructor(){
         this.getInfo=[];
         this.postInfo=[];
         this.deleteInfo=[];
         this.putInfo=[];
     }

     listen(port){
         http.createServer((req,res)=> {

             if(req.url=="/favicon.ico"){
                 res.end();
             }else{
                this.run(req,res);
             }
         }).listen(port);
     }

     run(req,res){
         var infos=this[req.method.toLowerCase()+"Info"];
         var url=req.url;
         this.extendRes(req,res);
         var flag=true;
         for(var i=0;i<infos.length;i++){
             if(eval(infos[i].reg).test(url)){
                 flag=false;
                 this.extendReq(req,res,infos[i])
                 res.setHeader("content-type","text/html;charset=utf-8");
                 infos[i].fn(req,res);
                 break;
             }
         }
         if(flag){
             res.end("not find");
         }
     }

     saveInfo(url,callback,type){
         //1 需要获取
         var attr=url.match(/:[^\/]*/g)||[];
         attr=attr.map(function (item) {
             return item.substr(1)
         })

         //2  相应的路径转换成正则



         var str=url.replace(/:[^\/]*/g,"([^\/\?]*)");
         str=str.replace(/\//g,"\\/");
         str="/^"+str+"[\\/]?(?:\\?(.*))?$/";



         //3.  对应函数的获取

         var obj={};
         obj.attr=attr;
         obj.reg=str;
         obj.fn=callback;
         this[type+"Info"].push(obj);
     }
     post(url,callback){
        this.saveInfo(url,callback,"post")
     }
     get(url,callback){
         this.saveInfo(url,callback,"get")
     }
     delete(url,callback){
         this.saveInfo(url,callback,"delete")
     }
     put(url,callback){
         this.saveInfo(url,callback,"put")
     }

     all(url,callback){
         this.saveInfo(url,callback,"post");
         this.saveInfo(url,callback,"get");
         this.saveInfo(url,callback,"delete")
         this.saveInfo(url,callback,"put")
     }


     extendReq(req,res,infos){

         //cookie
         var cookies=req.headers.cookie.split("; ");

         req.cookies={};
         for(var k=0;k<cookies.length;k++){
             var arr=cookies[k].split("=");
             req.cookies[arr[0]]=arr[1];
         }

         //query
         var search=querystring.parse(reqUrl.parse(req.url).query);

         req.query={};
         for(var k in search){
             req.query[k]=search[k];
         }

         //params
         var result=eval(infos.reg).exec(req.url);
         req.params={};
         for(var j=0;j<infos.attr.length;j++){
             req.params[infos.attr[j]]=result[j+1];
         }
     }

     extendRes(req,res){
        res.sendFile=function (filepath) {
            var relpath=path.join(process.cwd(),filepath);
            fs.createReadStream(relpath).pipe(res);
        }
        res.send=function (str) {
            res.end(str);
        }

        res.redirect=function (url) {
            res.writeHead(302,{location:url});
            res.end();
        }
        res.cookie=function (attr,val) {
            if(typeof attr=="string"){
                res.setHeader("set-cookie",attr+"="+val);
            }else{
                res.setHeader("set-cookie",attr);
            }

        }
        res.render=function (fileurl,data) {
           var relurl=path.join(process.cwd(),"views",fileurl);
           fs.readFile(relurl,function (err,info) {
               res.end(ejs(info.toString(),data));
           })
        }
     }

 }

 module.exports=function () {
     return new server;
 }
