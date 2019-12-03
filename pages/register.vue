<template>
  <div>
    <div class="login-head">
      <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="tomine">
            <!---->
          </i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">注册</div>
        <div class="van-nav-bar__right"></div>
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="userInfo.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名长度3-5之间')"
      />
      <van-field v-model="userInfo.mobile" type="tel" label="手机号" placeholder="请输入手机号" required />
      <van-field
        v-model="userInfo.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <div class="login-box">
        <van-button type="info" class="login-button" @click="toregister">立即注册</van-button>
      </div>
      <nuxt-link to="/login" class="lr">已有账号？立即登录！</nuxt-link>
    </van-cell-group>
  </div>
</template>


<style  scoped>
.login-box {
  width: 100%;
}
.login-head {
  margin-bottom: 50px;
}
.login-button {
  width: 100%;
  margin: 0 auto;
}
.lr {
  margin-top: 10px;
  float: right;
}
</style>

<script>
import Vue from 'vue';
import { Dialog ,Notify} from 'vant';
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    tomine() {
      this.$router.push("login");
    },
    toregister() {
      if(this.userInfo.mobile&&this.userInfo.username&&this.userInfo.password){
        if(this.userInfo.mobile.length==11){
          if(this.userInfo.password.length>5){
  
            this.$axios.post("/api/register", this.userInfo).then(res => {
              console.log(res);
              if (res.data.flag) {
                //  console.log('注册成功')
                Dialog.confirm({
                  title: "消息",
                  message: "注册成功,是否前往登录？"
                })
                  .then(() => {
                    this.$router.push('/login')
                  })
                  .catch(() => {
                    // on cancel
                  });
              }else{
                 Notify('账号已存在，请勿重复注册');
              }
            });
          }else{
            Notify('密码长度不得小于5位');
          }
  
        }else{
           Notify('请输入正确的手机号');
        }

      }else{
        Notify('请输入完整注册信息');
      }
      //  console.log(this.userInfo);
    }
  },
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
};
</script>