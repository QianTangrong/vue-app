<template>
  <div>
    <!-- 头部 -->
    <div class="login-head">
      <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
        <div class="van-nav-bar__left">
          <router-link class="van-icon van-icon-arrow-left van-nav-bar__arrow" to="app/mine">
            <!---->
          </router-link>
        </div>
        <div class="van-nav-bar__title van-ellipsis">修改个人信息</div>
        <div class="van-nav-bar__right"></div>
      </div>
    </div>

    <!-- 主体 -->
    <van-cell-group>
      <van-field
        v-model="newInfo.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名长度在3-5之间')"
      />

      <van-field v-model="newInfo.mobile" type="tel" label="手机号" required clearable placeholder="请输入手机号" />
      <van-button type="info" class="login-box" @click="tochange">确认修改</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { Notify } from 'vant';
export default {
  data() {
    return {
        newInfo:{}
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    tochange() {
        console.log(this.userInfo)
         this.$axios.post('api/changeInfo',(this.newInfo)).then(res=>{
            //  console.log(res)
            if(res.data.flag){
                Notify({ type: 'success', message: res.data.msg });
                this.$router.push('/login')
            }else if(res.data.code==400){
              Notify({ type: 'danger', message: res.data.msg });
            }else{
                Notify({ type: 'danger', message: res.data.msg });
                this.$router.push('/login')
            }
         })
    },
    gotomine() {
    this.$router.push("app/mine");
  }
  },
};
</script>


<style  scoped>
.login-box {
  width: 100%;
}
</style>