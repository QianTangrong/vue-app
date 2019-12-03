
import Vue from "vue";


// 全局样式  scss 需要处理 
// import "../styles/index.scss";
import "../styles/animate.css";
import "../styles/common.css";



// 使用vue-resource 
import VueResource from "vue-resource";
Vue.use(VueResource);  // this.$http.get  Vue.http


// // 使用axios
import {http} from "./axios";
Vue.prototype.$axios = http;   // this.$axios = axios 


// 注册全局组件



// vant
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant); // 全局声明 

// 自定义指令 


// 自定义过滤器 
Vue.filter("dateFormat",(value,str)=>{
    if(!value) return "";
    str = str || "-"
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    return `${year}${str}${month}${str}${day} ${hour}:${min}:${sec}`;
});








