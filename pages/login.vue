<template>
  <div>
    <!-- 头部 -->
    <div class="login-head">
      <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="tomine">
            <!---->
          </i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">登录</div>
        <div class="van-nav-bar__right"></div>
      </div>
    </div>
    <!-- 登录主体 -->
    <van-cell-group >
      <van-field v-model="userInfo.mobile" type="tel" label="手机号" placeholder="请输入手机号" required />
      <van-field
        v-model="userInfo.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div class="login-box">
        <van-button type="info" class="login-button" @click="tologin">立即登录</van-button>
      </div>
       <nuxt-link to="/register" class="lr">没有账号？立即注册</nuxt-link>
    </van-cell-group>
  </div>
</template>


<script>
import {mapState,mapMutations,mapActions} from "vuex";
import { Notify } from 'vant';
export default {
  mounted(){
   
  },
  computed:{
    ...mapState(['userInfo','num'])
  },
  methods: {
    ...mapMutations(['localUser']),
    data() {
      console.log(this.username);
    },
    tomine() {
      this.$router.push("app/mine");
    },
    toregister(){
        this.$router.push("/register");
    },
    tologin(){
      this.$axios.post('api/login',this.userInfo).then(res=>{
        console.log(res);

        if(res.data.flag){
          sessionStorage.mobile = res.data.result.mobile;
          sessionStorage.username = res.data.result.username;
          sessionStorage.uid = res.data.result._id;
           sessionStorage.pic = res.data.result.pic;
          this.userInfo.mobile=sessionStorage.mobile;
          this.userInfo.username=sessionStorage.username;
         this.$store.commit('localUser',this.userInfo);

          // setCookie(username,res.username,7,path = "/"),
          // setCookie(mobile,res.mobile,7,path = "/")


           console.log(this.userInfo)
          this.$router.push('/app/mine')
        }else{
          Notify('账号不存在或密码错误');
        }
      })
    }
  }
};
</script>


<style  scoped>
.login-box{
    width: 100%;
}
.login-head {
  margin-bottom: 0.26rem;
}
.login-button {
  width: 100%;
  margin: 0 auto;
}
.lr{
    margin-top: 0.07rem;
    float: right
}
</style>