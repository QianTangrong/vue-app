

import Vue from "vue"
import Vuex from "vuex"
// import {http} from "utils/axios";
// import {http} from "vue"
import { from } from "rxjs";
Vue.use(Vuex);

const store  = ()=>  new Vuex.Store({
    state:{
        num:200,
        userInfo:{username:sessionStorage.username,mobile:sessionStorage.mobile},
        shoppingcar:[],
        bookkinds:"···",
        allbooks:[]
    },
    actions:{
        getshoppingcar({commit},{url}){
            this.$axios.get(url).then(res=>{
                console.log(res);
                commit("getshoppingcar",res.data.result)
            })
        }, 
        getallbooks({commit},{url}){
            this.$axios.get(url).then(res=>{
                console.log(res);
                commit("getallbooks",res.data.result)
            })
        }, 
    },
    mutations:{
        localUser(state,userInfo){
            state.userInfo = userInfo
        },
        localUser(state,shoppingcar){
            state.shoppingcar = shoppingcar
        },
        getallbooks(state,allbooks){
            state.allbooks = allbooks;
        },
    }
    
})



export default store;