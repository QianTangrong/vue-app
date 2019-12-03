<template>
  <div class="wrap">
    <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="goback">
          <!--顶部-->
        </i>
      </div>
      <div class="van-nav-bar__title van-ellipsis">购物车</div>
      <div class="van-nav-bar__right">. . .</div>
    </div>
    <!-- 中心内容 -->
    <!-- 未登录或者购物车无商品显示 -->
    <div class="null_content" v-if="shoppingcar.length<1">
      <img src="../../static/images/timg.jpg" alt />
      <div>
        <p class="tips">您的购物车空空如也，快去选购自己心仪的商品吧</p>
      </div>
    </div>

    <div class="content" v-if="shoppingcar.length>0">
      <div class="top">
        <p>当当网</p>
      </div>
      <div class="top1"></div>
      <div class="book_box" v-for="(item,i) in shoppingcar" :key="item.bookid">
        <div class="check">
          <input type="checkbox" v-model="item.check" class="check" />
        </div>
        <div class="book_img">
          <img :src="item.bookimg" alt @click="todetails(item.bookid)" />
        </div>
        <div class="other">
          <div class="book_name">
            {{item.bookname}}
            <span class="del_span" @click="del(item,item.bookid,i)">删除</span>
          </div>
          <div class="book_pN">
            <div class="book_price">￥{{item.bookprice}}</div>
            <div class="book_bun">
              <div class="reduce" @click="reduce(item,item.bookid,item.booknum)">-</div>
              <div>{{item.booknum}}</div>
              <div class="add" @click="add(item,item.bookid)">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 提交订单部分 -->
    <div>
      <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" class="sub">
        <van-checkbox v-model="quan" checked-color="#f30">全选</van-checkbox>
        <span slot="tip">
          抓紧优惠，速度下单
          <span>机不可失</span>
        </span>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Dialog } from "vant";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      shoppingcar: [],
      bookskind: 0,
      // checked: true
      // total: NaN
      totalNum: 0
    };
  },
  methods: {
    ...mapActions(["getStuInfo"]),
    todetails(id) {
      this.$router.push({ name: "bookDetails", query: { bookid: id } });
    },
    goback() {
      this.$router.go(-1);
    },
    onSubmit() {
      if (this.shoppingcar.length > 0) {
        this.$router.push({
          name: "submit",
          query: { shoppingcar: this.shoppingcar }
        });
      }
    },
    reduce(item, bookid, booknum) {
      if (booknum > 1) {
        this.$axios
          .get("api/adre", { params: { bookid, flag: 0 } })
          .then(res => {
            // console.log(res);
            if (res.data.flag) {
              item.booknum--;
            }
          });
      } else {
        item.booknum = 1;
        Toast("别减啦，再减没啦");
      }
    },
    add(item, bookid) {
      this.$axios.get("api/adre", { params: { bookid, flag: 1 } }).then(res => {
        // console.log(res);
        if (res.data.flag) {
          item.booknum++;
        }
      });
    },
    del(item, bookid, i) {
      Dialog.confirm({
        message: "确认删除该商品吗"
      })
        .then(() => {
          this.$axios
            .get("api/delete", { params: { bookid, flag: 1 } })
            .then(res => {
              // console.log(res);
              if (res.data.flag) {
                this.shoppingcar.splice(i, 1);
              } else {
                Toast(res.data.msg);
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  watch: {},
  computed: {
    ...mapState(["Shoppingcar"]),
    quan: {
      get() {
        var flag = true;
        this.shoppingcar.forEach(item => {
          if (!item.check) {
            flag = false;
          }
        });
        return flag;
      },
      set(newVal) {
        console.log(newVal);
        this.shoppingcar = this.shoppingcar.map(item => {
          item.check = newVal;
          return item;
        });
      }
    },
    total: {
      get() {
        var total = 0;
        this.shoppingcar.forEach(item => {
          if (item.check) {
            total += item.bookprice * item.booknum;
          }
        });
        return total * 100;
      }
    }
  },
  mounted() {
    this.$axios
      .get("api/shoppingcar") //axios的get传参只能用params，后台用query接收
      .then(res => {
        if (res.data.flag) {
          this.shoppingcar = res.data.result;
          this.bookskind = res.data.result.length;
          // console.log(res);
          // console.log(this.shoppingcar);
          if (this.shoppingcar.length > 0) {
          } else {
            // console.log(11);
          }
        } else {
        }
      });
  }
};
</script>

<style scoped>
.wrap {
  margin-bottom: 4rem;
}
.van-nav-bar {
  position: fixed;
  width: 100%;
  /* top: 0; */
  /* left: 0; */
}
.null_content {
  width: 100%;
  height: 40%;
  padding: 4rem;
}
.null_content img {
  width: 100%;
  height: 80%;
  opacity: 0.2;
}
.tips {
  font-size: 0.8rem;
  color: #aaa;
  opacity: 0.7;
}
.content {
  width: 100%;
  min-height: 2.5rem;
  /* background-color: #fff; */
  padding: 0.3rem;
  display: block;
  margin-bottom: 6.6rem;
}
.top {
  height: 2.6rem;
  width: 100%;
  padding: 0.3rem 1rem;
  /* background: red; */
  font-size: 1.2rem;
  font-weight: 600;
  color: #f30;
  position: absolute;
  top: 2.5rem;
  left: 0;
}
.top1 {
  height: 2.6rem;
  width: 100%;
  padding: 0.3rem;
}
.book_box {
  width: 100%;
  height: 10rem;
  background: white;
  display: flex;
  padding: 1.4rem 0.3rem;
  margin-bottom: 0.5rem;
}
.book_img {
  margin-left: 0.6rem;
}
.book_img img {
  width: 5rem;
  height: 7rem;
}
.check {
  width: 1rem;
  height: 1rem;
  margin-top: 1.5rem;
  border-radius: 50%;
}
.other {
  padding: 0 0 0 0.8rem;
}
.book_name {
  color: #323232;
  font-size: 0.9rem;
}
.book_pN {
  display: flex;
  width: 16rem;
  height: 6rem;
  /* background-color:red; */
  justify-content: space-around;
  padding-top: 4rem;
}
.book_bun {
  width: 6rem;
  height: 1.6rem;
  display: flex;
  /* border: 1px solid gray; */
  justify-content: space-around;
}
.book_bun div {
  width: 2rem;
  height: 1.6rem;
  border: 1px solid #aaa;
  text-align: center;
}
.sub {
  margin-bottom: 3rem;
}
.del_span {
  display: inline-block;
  float: right;
  font-weight: 300;
}
</style>
