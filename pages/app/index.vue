<template>
  <div class="wrap">
    <Header />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    </van-pull-refresh>


    <van-swipe :autoplay="3000" indicator-color="white" class="swipe-box">
      <van-swipe-item class="swipe-img" v-for="(item,i) in swiperimg" :key="i">
        <img alt :src="item.url" />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="5">
      <van-grid-item
        v-for="value in 10"
        :key="value"
        :icon="icons[value-1]"
        :text="iconTitle[value-1]"
        color="#f30"
        @click="showmsg"
      />
    </van-grid>

    <van-grid :border="false" :column-num="5">
      <van-grid-item v-for="(item,i) in minibanner" :key="i" @click="showmsg">
        <van-image :src="item.url" />
      </van-grid-item>
    </van-grid>

    <h2 class="title">好书推荐</h2>

    

<Book/>

  </div>
</template>

<script>
// import Footer from "~/components/footer.vue";
import Header from "~/components/header.vue";
import Book from "~/components/book.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      // bookkinds:0,
      value: "",
      icons: [
        "fire-o",
        "gift-o",
        "vip-card-o",
        "shop-collect-o",
        "award-o",
        "hot-sale-o",
        "balance-o",
        "tv-o",
        "points",
        "logistics",
        "discount"
      ],
      iconTitle: [
        "图书",
        "童书",
        "新书榜",
        "电子书",
        "学生文具",
        "服装",
        "当当超市",
        "食品",
        "领券中心",
        "签到"
      ],
      swiperimg: [],
      minibanner: [],
      books: [],
      active: "home",
       list: [],
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    ...mapActions(["localUser","getshoppingcar"]),
    showmsg(){
      Toast("这里功能还在完善，试试下面的好书推荐吧");
    },
     onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 500);
    }
  
    
  },
  computed:{
    ...mapState(['userInfo','shoppingcar','bookkinds'])
  },
  components: {
    // Footer,
    Header,
    Book
  },
  mounted() {
    this.$axios.post("api/swiperimg").then(res => {
      // console.log(res);
      this.swiperimg = res.data.result;
    });
    this.$axios.post("api/minibanner").then(res => {
      // console.log(res);
      this.minibanner = res.data.result;
    });
    this.$axios.post("api/allbooks").then(res => {
      // console.log(res);
      this.books = res.data.result;
      // console.log(this.books);
    });

    // console.log(this.shoppingcar);
    // console.log(this.userInfo)
    // if(this.userInfo.mobile){
    //     if(!this.shoppingcar.length>0){
    //       this.getshoppingcar({url:'/api/shoppingcar'})
    //       console.log(22222);
    //     }
    // }
  }
};
</script>

<style>
.wrap {
  margin-bottom: 2.5rem;
}
.swipe-img,
.swipe-img > img {
  width: 100%;
  height: 10.3rem;
}
.title {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  color: #f30;
}
.books {
  width: 100%;
  height: 9rem;
  background: white;
  padding: 0.5rem;
  display: flex;
  margin-bottom: 0.5rem;
}

.img_box {
  width: 25%;
  /* background: red; */
}
.img_box img {
  width: 100%;
  height: 100%;
}
.text_box {
  width: 75%;
  /* background: green; */
  padding: 0 0.3rem 0 0.7rem;
}
.book_name_wrap,
.book_author_wrap,
.book_price_wrap {
  width: 100%;
  height: 20%;
  /* background: yellow; */
}
.book_descs_wrap {
  width: 100%;
  height: 40%;
  overflow: hidden;
  /* background: blue; */
}
.book_name {
  font-weight: 700;
}
.book_author {
  font-size: 0.8rem;
  color: #aaa;
}
.book_descs {
  font-size: 0.9rem;
  color: #888;
  position: relative;

  line-height: 1.3em;

  /* 3 times the line-height to show 3 lines */

  height: 2.3rem;

  overflow: hidden;
}
.book_descs::after {
  content: "...";

  font-weight: bold;

  position: absolute;

  bottom: 0;

  right: 0;
}
.book_price {
  color: #ff4e4e;
  font-size: 1.1rem;
}
</style>