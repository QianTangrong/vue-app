var express = require("express");
var router  = express.Router();

var {Movie,User,Sort,Banner,Minibanner,Book,Shoppingcar} = require("../utils/schema")


router.get("/index",(req,res)=>{
    res.json({
        code:200,
        msg:"index 成功"
    })
})


router.get("/movie",(req,res)=>{
    var limit = req.query.limit * 1 || 0;
    Movie.find({},{}).sort({_id:-1}).limit(limit)
    .then(result=>{
        res.json({
            result,
            code:200,
            msg:"电影数据获取成功"
        })
    })
})
//注册路由
router.post('/register',(req,res)=>{
    var userInfo = req.body;
    var  mobile=userInfo.mobile*1
    // console.log(userInfo);
    User.findOne({mobile}).then(result=>{
        if(result){
            res.json({
                code:'200',
                msg:"账号已存在，请重新注册",
                flag:false
            })
        }else{
            User.insertMany(userInfo).then(result=>{
               res.json({
                code:200,
                msg:'注册成功',
                flag:true
               })
            })
        }
    })
    
})
//登录路由
router.post('/login',(req,res)=>{
    var userInfo = req.body;
    var  mobile=userInfo.mobile*1
    // console.log(userInfo);
    User.findOne({mobile}).then(result=>{
        if(result){
            if(result.password==userInfo.password){

                req.session.uid=result._id;
                req.session.mobile = result.mobile;
                req.session.username = result.username;
                req.session.password = result.password;
                // console.log(req.session.mobile,req.session.username)
                // console.log(req.session.uid);
                res.json({
                    code:200,
                    msg:'登录成功',
                    flag:true,
                    result
                })
            }else{
                res.json({
                    code:200,
                    msg:'账号或密码错误',
                    flag:false
                })
            }
        }else{
            res.json({
                code:200,
                msg:'账号不存在，请重新登录',
                flag:false
            })
        }
    })
})
//获取用户信息  存在 vuex 里面
router.post('/getuserInfo',(req,res)=>{
    var mobile = req.body.mobile;
    // console.log(mobile);
    if(mobile){
        User.findOne({mobile}).then(result=>{
            res.json({
                code:200,
                msg:'获取成功',
                result,
                flag:1
            })
        })

    }else{
        res.json({
            code:400,
            msg:'用户未登录，请先登录',
            flag:0
        })
    }
})

//修改个人信息
router.post("/changeInfo",(req,res)=>{
    var info = req.body;
    // console.log(info);
   var oldmobile = req.session.mobile;
//    console.log(oldmobile);
   if(oldmobile){
       User.find({mobile:info.mobile}).then(result=>{
           if(!result){
               User.updateOne({mobile:oldmobile},{
                   $set:{
                       username:info.username,mobile:info.mobile
                    }
                   }
                   ).then(result=>{
                    res.json({
                        code:200,
                        msg:'密码修改成功',
                        flag:true,
                        result
                    })
               })
           }else{
               res.json({
                code:400,
                msg:'手机号已被注册，请重新修改',
                flag:false,
               })
           }
       })

   }else{
       res.json({
           code:'200',
           msg:'账户信息已失效，请重新登录',
           flag:false
       })
   }
})
//修改密码
router.post("/changePwd",(req,res)=>{
    var body = req.body;

    User.findOne({
        mobile:req.session.mobile
    }).then(result=>{
        if(result){
            // console.log(result);
            if(result.password == body.old){
                User.updateOne({
                    mobile:req.session.mobile
                },{
                    $set:{
                        password:body.new
                    }
                }).then(result=>{
                    res.json({
                        code:200,
                        msg:"密码修改成功,请重新登录",
                        flag:1
                    })
                })
            }else{
                res.json({
                    code:200,
                    msg:"原始密码错误",
                    flag:0
                })
            }

        }else{
            res.json({
                code:200,
                msg:"用户当前信息已失效，请重新登录",
                flag:2
            })
        }
    })
})
router.get("/logout",(req,res)=>{
    req.session.uid="";
    req.session.mobile = "";
    req.session.username = "";
    req.session.password = "";
    res.json({
        code:200,
        msg:"退出成功",
    })
})
//获取所有分类信息
router.post("/allsort",(req,res)=>{
    Sort.find({}).then(result=>{
        res.json({
            code:200,
            msg:"获取成功",
            result
        })
    })
})
//获取轮播图图片
router.post("/swiperimg",(req,res)=>{
    Banner.find({}).then(result=>{
        res.json({
            code:200,
            msg:"获取成功",
            result
        })
    })
})
//获取首页小图标
router.post("/minibanner",(req,res)=>{
    Minibanner.find({}).then(result=>{
        res.json({
            code:200,
            msg:"获取成功",
            result
        })
    })
})
//获取所有书籍信息
router.post("/allbooks",(req,res)=>{
    Book.find({}).then(result=>{
        res.json({
            code:200,
            msg:"获取成功",
            result
        })
    })
})
//获取书籍列表页的信息
router.get("/bookList",(req,res)=>{
    var type = req.query.type;
    // console.log(type);
    if(type){
        Book.find({type}).then(result=>{
            res.json({
                code:200,
                msg:"获取类型书籍信息成功",
                result
            })
        })
    }else{
        Book.find({}).then(result=>{
            res.json({
                code:200,
                msg:"获取所有书籍信息成功",
                result
            })
        })
    }
})
//商品详情页获取商品信息
router.get("/bookdetails",(req,res)=>{
    var id = req.query.bookid;
    if(id){
        Book.find({id}).then(result=>{
            if(result){
                res.json({
                    code:200,
                    msg:"获取商品信息成功",
                    result,
                    flag:true
                })
            }else{
                res.json({
                    code:200,
                    msg:"商品信息存在",
                    flag:false
                })
            }
        })
    }else{
        res.json({
            code:200,
            msg:"参数错误",
            flag:false
        })
    }
})
//加入购物车
router.get("/addtocar",(req,res)=>{
    var bookid = req.query.bookid;
    var bookname = req.query.bookname;
    var bookprice = req.query.bookprice;
    var bookimg = req.query.bookimg;

    var uid = req.session.uid
    if(uid){
        Shoppingcar.findOne({uid,bookid}).then(result=>{
            if(result){
                Shoppingcar.updateOne({uid,bookid},{
                    $inc:{
                        booknum:1
                    }
                }).then(result=>{
                    if(result){
                        res.json({
                            code:200,
                            msg:"加入购物车成功!",
                            flag:true
                        })
                    }
                })
            }else{
                Shoppingcar.insertMany({
                    uid,
                    bookid,
                    booknum:1,
                    bookprice,
                    bookname,
                    bookimg,
                    check:true,
                }).then(result=>{
                    if(result){
                        res.json({
                            code:200,
                            msg:"加入购物车成功",
                            flag:true
                        })
                    }
                })
            }
        })

    }else{
        res.json({
            code:200,
            msg:"用户信息已过期，请重新登录",
            flag:false
        })
    }
})
//获取用户购物车信息
router.get("/shoppingcar",(req,res)=>{
    var uid = req.session.uid
    if(uid){
        Shoppingcar.find({uid}).then(result=>{
            if(result){
                res.json({
                    code:200,
                    msg:"获取购物车信息成功",
                    result,
                    flag:true
                })
            }else{
                res.json({
                    code:200,
                    msg:"您的购物车空空如也，赶快去选购心仪商品吧",
                    flag:true,
                    result
                })
            }
        })
    }else{
        res.json({
            code:200,
            msg:"用户信息已失效，请重新登录",
            flag:false
        })
    }
})
//购物车数量加减
router.get("/adre",(req,res)=>{
    var uid = req.session.uid;
    var bookid = req.query.bookid;
    var flag = req.query.flag;
    console.log(flag);
    if(uid){
        if(flag==1){
            Shoppingcar.updateOne({uid,bookid},{
                $inc:{
                    booknum:1
                }
            }).then(result=>{
                if(result){
                    res.json({
                        code:200,
                        msg:"➕1",
                        flag:true
                    })
                }else{
                    res.json({
                        code:400,
                        msg:"ERROR",
                        flag:false
                        
                    })
                }
            })
        }else{
            Shoppingcar.updateOne({uid,bookid},{
                $inc:{
                    booknum:-1
                }
            }).then(result=>{
                if(result){
                    res.json({
                        code:200,
                        msg:"➖1",
                        flag:true
                    })
                }else{
                    res.json({
                        code:400,
                        msg:"ERROR",
                        flag:false
                    })
                }
            })
        }
    }else{
        res.json({
            code:200,
            msg:"用户信息已失效，请重新登录",
            flag:false
        })
    }
})
//删除购物车
router.get("/delete",(req,res)=>{
    var bookid = req.query.bookid;
    var uid = req.session.uid;
    if(uid){
        Shoppingcar.remove({bookid,uid}).then(result=>{
            if(result){
                res.json({
                    code:200,
                    msg:"删除成功",
                    flag:true
                })
            }
        })
    }else{
        res.json({
            code:200,
            msg:"用户信息已失效，请重新登录",
            flag:false
        })
    }

})
// 上上传头像  
var multer = require("multer");
var storage = multer.diskStorage({   // 操作硬盘 
    destination: function (req, file, cb) {
      cb(null, './static/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'wh1909'+file.originalname); // 123412123231221wh19092.jpg
    }
});

// 创建上传对象   
var upload = multer({ storage: storage }).any();

router.post("/uploadpic",upload,(req,res)=>{
    var uid = req.session.uid;
    var path = req.files[0].path;
    // req.query.flag == "true" ? update(Teacher) : update(Student);
 
        User.updateOne({
            _id:uid
        },{
            $set:{
                pic:path
            }
        }).then(result=>{
            res.json({
                msg:"头像上传成功...",
                pic:path,
                result,
            })
        })
    
})

// 获取头像
router.post("/getavatar",(req,res)=>{
    var body = req.body; 
    var uid = req.session.uid;

        User.findOne({
            _id:uid
        }).then(result=>{
            if(result.pic){
                res.json({
                    code:200,
                    msg:"获取头像成功",
                    result,
                    flag:1
                })
            }else{
                res.json({
                    code:200,
                    msg:"获取头像失败",
                    flag:0
                })
            }
        })
    
})
module.exports = router