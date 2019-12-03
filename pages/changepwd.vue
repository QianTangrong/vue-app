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
        <div class="van-nav-bar__title van-ellipsis">修改密码</div>
        <div class="van-nav-bar__right"></div>
      </div>
    </div>

    <van-cell-group>
      <van-field
        v-model="allpwd.old"
        required
        clearable
        label="旧密码"
        right-icon="question-o"
        placeholder="请输入旧密码"
      />
      <van-field
        v-model="allpwd.new"
        required
        clearable
        label="新密码"
        right-icon="question-o"
        placeholder="请输入新密码"
        @click-right-icon="$toast('密码不要太简单哦')"
      />

      <van-button type="info" id="login-box" @click="tochange">确认修改</van-button>
    </van-cell-group>
  </div>
</template>


<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { Notify } from "vant";
export default {
  data() {
    return {
      allpwd: {}
    };
  },

  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    tochange() {
      console.log(this.userInfo);
      this.$axios.post("api/changePwd", this.allpwd).then(res => {
         console.log(res)
        if (res.data.flag==1) {
          Notify({ type: "success", message: res.data.msg });
          this.$router.push("/login");
        } else if(res.data.flag==2){
          Notify({ type: "danger", message: res.data.msg });
          this.$router.push("/login");
        }else{

            Notify({ type: "danger", message: res.data.msg });
        }
        
      });
    },
    gotomine() {
      this.$router.push("app/mine");
    }
  }
};
</script>

<style  scoped>

</style>