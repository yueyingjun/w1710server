module.exports=function () {
    return function (req,res,next) {
        if(req.headers["content-type"]=="application/x-www-form-urlencoded") {
            var datas = "";
            req.on("data", function (data) {
                datas += data;
            })
            req.body = {};
            req.on("end", function () {
                var arr = datas.split("&");
                for (var i = 0; i < arr.length; i++) {
                    var arr1 = arr[i].split("=");
                    req.body[arr1[0]] = arr1[1];
                }

                next();
            })
        }else{
            next();
        }
    }
}