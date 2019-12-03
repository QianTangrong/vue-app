<template>
  <div class="wrap">
    <!-- 头部 -->
    <div class="login-head">
      <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow">
            <!---->
          </i>
        </div>
        <div class="van-nav-bar__title van-ellipsis">我的当当</div>
        <div class="van-nav-bar__right">···</div>
      </div>
    </div>

    <!-- 用户信息或者登录注册按钮 -->
    <div class="user" v-if="!userInfo.mobile">
      <button class="lr" @click="gotologin">登录/注册</button>
    </div>

    <div class="users" v-else>
      <van-image
        round
        width="5rem"
        height="5rem"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
        class="userImg"
      />
      <span class="username">{{userInfo.username}}</span>
    </div>

    <!-- 用户自助 -->
    <div class="change" v-if="userInfo.mobile">
      <van-cell-group>
        <van-cell title="更改个人信息" is-link to="../changeInfo" />
        <van-cell title="修改密码" is-link to="../changepwd" />
        <van-cell title="更换头像" value="发现好玩" label size="large" @click="posttouxing" />
        <input type="file" @change="todoupload" ref="upload" class="fileclass" />
      </van-cell-group>
    </div>

    <div class="change" v-else>
      <van-cell-group>
        <van-cell title="登录" is-link to="../login" />
        <van-cell title="注册" is-link to="../register" />
      </van-cell-group>
    </div>

    <div class="change">
      <van-cell-group>
        <van-cell title="会员中心" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="收货地址" value="新增" label size="large" />
      </van-cell-group>
    </div>

    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="关于我们——QQ" name="2">小地瓜——1403526495</van-collapse-item>
        <van-collapse-item title="关于我们——微信" name="3">小地瓜——18355425847</van-collapse-item>
      </van-collapse>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="退出登录" value v-if="userInfo.mobile" @click="loginout" />
        <van-cell title="设置" label="更多" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
// import Footer from "~/components/footer.vue";
import Vue from "vue";
import { ActionSheet } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
import { userInfo } from "os";
export default {
  data() {
    return {
      sessionUser: {},
      activeNames: ["1"],
      img:"https://img.yzcdn.cn/vant/cat.jpeg",
      pic:"",
      // shoppingcar:[]
    };
  },
  methods: {
    ...mapMutations(["localUser","getshoppingcar"]),
    todoupload() {
      console.log("开始上传....");
      var file = this.$refs.upload.files[0]; // 需要上传的文件
      console.log(file);
      var data = new FormData(); // 转换为表单的形式提交到后台
      data.append("avatar", file);
      this.$axios({
        url: "/api/uploadpic",
        method: "POST",
        params: {
          flag: this.flag
        },
        data
      }).then(res => {
        console.log(res);
        // this.pic = res.data.pic.replace("public","http://localhost:1909");
        this.pic = res.data.pic.replace("public", ""); // 反选代理
        console.log(this.pic);
        localStorage.avatar = this.pic;
      });
    },
    posttouxing() {
      this.$refs.upload.click();
    },
    gotologin() {
      console.log(this.userInfo);
      this.$router.push({ name: "login" });
    },
    changenum() {
      // store.commit("changenum",100);
      //  this.$store.state.userInfo = {mobile:222,username:'wdd'};
    },
    loginout() {
      this.$axios
        .get("api/logout") //axios的get传参只能用params，后台用query接收
        .then(res => {
          if (res.data.code == 200) {
            sessionStorage.mobile = "";
            sessionStorage.username = "";
            sessionStorage.uid = "";
            this.$store.commit("localUser", this.userInfo);

            location.reload();
          } else {
          }
        });
    }
  },
  computed: {
    // num1(){
    //   return store.state.num
    // }
    ...mapState(["userInfo","shoppingcar"])
  },
  mounted() {
    // sessionUser.mobile=sessionStorage.mobile;
    // sessionUser.username=sessionStorage.username;
    this.userInfo.username = sessionStorage.username;
    this.userInfo.mobile = sessionStorage.mobile;
    this.userInfo.pic = sessionStorage.pic;
    // console.log(sessionStorage)
    // this.$axios.post("/api/getuserInfo", this.userInfo).then(res => {
    //   console.log(res);
    //   if (res.data.code == 200) {
    this.$store.commit("localUser", this.userInfo);
    // console.log(this.userInfo);
    
//获取头像
            //     this.$axios.post("/api/getavatar",{
            //     // flag:this.flag
            // }).then(res=>{
            //     // console.log(res);
            //     if(!!res.data.flag){
            //         this.pic = res.data.result.pic.replace("public","http://localhost:3000");
            //         // console.log(1)
            //     }else{
            //         this.pic = pic;
            //         //  console.log(2)
            //     }
            // })
    //   } else {
    //     // this.$router.push("/login");
    //     this.$store.commit("localUser", this.userInfo);
    //   }
    // });
  }
};
</script>

<style  scoped>
.fileclass {
  display: none;
}
.wrap {
  margin-bottom: 2.5rem;
}
.user {
  width: 100%;
  height: 6.5rem;
  background: url("../../static/images/2.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  /* display: flex; */
}
.users {
  width: 100%;
  height: 120px;
  background: rgba(248, 3, 3, 0.5);
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 2.5rem;
}
.lr {
  width: 7rem;
  height: 3rem;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -3.5rem;
  margin-top: -1.5rem;
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: 0;
  border: 1px solid white;
}
.userImg {
  margin-top: 1.5rem;
}
.username {
  height: 1.75rem;
  display: block;
  float: right;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2rem;
  margin-top: -1.25rem;
  font-size: 2rem;
  color: white;
}
.change {
  margin-bottom: 1.25rem;
}
</style>