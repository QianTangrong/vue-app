<template>
  <div class="wrap">
    <van-nav-bar
      :title="bookdetails.name"
      left-text="返回"
      right-text="· · ·"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 商品基本信息 -->
    <div class="book_box">
      <div class="book_img">
        <van-swipe @change="onChange">
          <van-swipe-item>
            <img :src="bookdetails.img" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="bookdetails.img" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="bookdetails.img" alt />
          </van-swipe-item>

          <div class="custom-indicator" slot="indicator">{{ current + 1 }}/3</div>
        </van-swipe>
      </div>

      <div class="book_name_box">
        <p class="book_name">
          <van-tag mark type="danger" color="#f35548" class="tag">当当自营</van-tag>
          {{bookdetails.name}}
        </p>
      </div>
      <div class="book_descs_box">
        <p class="book_descs">{{bookdetails.descs}}</p>
      </div>
      <div class="book_price_box">
        <p class="book_price">
          ￥{{bookdetails.price}}
          <van-tag round class="tag2">降价通知</van-tag>
        </p>
      </div>
    </div>
    <!-- 商品促销信息 -->
    <div class="book_act">
      <div class="act"></div>
    </div>
    <!-- 商品其他信息 -->
    <div class="book_other_box">
      <van-cell :value=bookdetails.author is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">作者</span>
        </template>
      </van-cell>
      <van-cell :value=bookdetails.chubanshe is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">出版</span>
        </template>
      </van-cell>
      <van-cell value="畅销榜第一位" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">排名</span>
        </template>
      </van-cell>
       <van-cell :value=bookdetails.type is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">分类</span>
        </template>
      </van-cell>
    </div>

<!-- 下划线 -->
<van-divider>喜欢就赶紧买哦</van-divider>
    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addtocar" />
      <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      bookid: "",
      bookdetails: {},
      current: 0
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {},
    onClickButton(){
        
    },
    onChange(index) {
      this.current = index;
    },
    onClickIcon() {
      this.$router.push('/app/shoppingCar')
    },
    addtocar() {

      this.$axios
      .get("api/addtocar", { params: { 
          bookid:this.bookdetails.id,
          bookname:this.bookdetails.name,
          bookprice:this.bookdetails.price,
          bookimg:this.bookdetails.img
          } }) //axios的get传参只能用params，后台用query接收
      .then(res => {
        // this.bookdetails = res.data.result[0];
        console.log(res);
        if(res.data.flag){
            Toast.success(res.data.msg);
        }else{
            Toast(res.data.msg);
            this.$router.push("login");
        }
      });
    }
  },
  created() {
    this.bookid = this.$route.query.bookid; //地址栏取参
    // console.log(this.bookid);
    this.$axios
      .get("api/bookdetails", { params: { bookid: this.bookid } }) //axios的get传参只能用params，后台用query接收
      .then(res => {
        this.bookdetails = res.data.result[0];
        // console.log(this.bookdetails);
      });
  }
};
</script>


<style scoped>
.wrap {
  margin-bottom: 3.5rem;
}
.book_img {
  width: 100%;
  height: 45%;
  padding: 1rem 5rem;
  text-align: center;
  background-color: #fff;
  border-bottom: 1px solid #aaa;
}
.custom-indicator {
  float: right;
}
.book_name_box,
.book_descs_box,
.book_price_box,
.book_other_box {
  padding: 0.5rem;
  background-color: #fff;
}
.book_other_box {
  margin-top: 0.7rem;
}
.tag {
  margin-right: 0.2rem;
}
.book_descs {
  font-size: 0.8rem;
  color: #aaa;
  line-height: 1.2rem;
}
.book_price {
  color: #ff463c;
  font-size: 1.5rem;
}
.tag2 {
  margin-left: 0.4rem;
}
</style>