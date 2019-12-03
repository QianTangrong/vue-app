


var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user_schema  = new Schema({
    mobile:Number,
    username:String,
    password:String,
    pic:String, // 头像
})

exports.User = mongoose.model("user",user_schema);

var sort_schema  = new Schema({
    banner:Array,
    mini_banner:Object,
    title:String,
    page_id:String,
    pile:Array,
})

exports.Sort = mongoose.model("sort",sort_schema);

var banner_schema  = new Schema({
    url:String
})

exports.Banner = mongoose.model("banner",banner_schema);



var uid_schema  = new Schema({
    name:String,
    id:Number
})

exports.Uid = mongoose.model("uid",uid_schema)


var minibanner_schema  = new Schema({
    mobile:Number,
    username:String,
    password:String,
    dbpwd:String,
    sno:Number,
    current_bj:String,
    flag:Boolean,
    pic:String, // 头像
})

exports.Minibanner = mongoose.model("minibanner",minibanner_schema);

var banji_schema = new Schema({
    banji_text:String,
    banji_code:String
})

exports.Banji = mongoose.model("banji",banji_schema);

// 当前教师的班级列表 
/*  "id":"A001",
        "name":"你当像鸟飞往你的山",
        "author":"塔拉·韦斯特弗",
        "price":"16.99",
        "descs":"人真只有起重机，直到我逃离大山，另一个世界。 那是教育给我的新世界，那是我生命的无限可能。",
        "type":"图书",
        "img":"http://img62.ddimg.cn/digital/product/99/11/1901169911_ii_cover.jpg?version=5c60cb04-1664-467a-bb35-e42a3847b1f9",
        "chubanshe":"贵州人民出版社",
        "countr":"美国" */
var book_schema = new Schema({
    id:String,
    name:String,
    author:String,
    price:String,
    descs:String,
    type:String,
    img:String,
    chubanshe:String,
    countr:String
})

exports.Book = mongoose.model("book",book_schema);

var stuinfo_schema = new Schema({
    stuno:Number,
    stuname:String,
    stumobile:Number,
    stubanjicode:String,
    stubanjitext:String,
    stuscore:Number,
});

exports.Stuinfo = mongoose.model("stuinfo",stuinfo_schema);


var reason_schema = new Schema({
    reason:String,
    count:Number,
    type:String
});

exports.Reason = mongoose.model("reason",reason_schema);




var shoppingcar_schema = new Schema({
    uid:String,
    bookid:String,
    booknum:Number,
    bookprice:Number,
    bookname:String,
    bookimg:String,
    check:Boolean,

});

exports.Shoppingcar = mongoose.model("shoppingcar",shoppingcar_schema);

