<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有了,再拖裤子都掉了" @load="onLoad">
      <div class="books" v-for="(book,i) in bookList" :key="book.id" @click="toDetails(book.id)">
        <div class="img_box">
          <img :src="book.img" alt />
        </div>
        <div class="text_box">
          <div class="book_name_wrap">
            <p class="book_name">
              <van-tag type="danger" v-if="i<3">TOP{{i+1}}</van-tag>
              {{book.name}}
            </p>
          </div>
          <div class="book_author_wrap">
            <p class="book_author">{{book.author}}</p>
          </div>
          <div class="book_descs_wrap">
            <p class="book_descs">{{book.descs}}</p>
          </div>
          <div class="book_price_wrap">
            <p class="book_price">￥{{book.price}}</p>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      type: "",
      bookList: [],
      loading: false,
      finished: false
    };
  },
    computed:{
   ...mapState(['userInfo','shoppingcar','bookkinds','allbooks'])
  },
  methods: {
    ...mapActions(["localUser","getshoppingcar",'getallbooks']),
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.bookList.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    toDetails(id){
         this.$router.push({ name: "bookDetails" ,query:{bookid:id}});
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.$axios
      .get("api/bookList", { params: { type: this.type } }) //axios的get传参只能用params，后台用query接收
      .then(res => {
        this.bookList = res.data.result;
      });
        //     if(!this.allbooks.length>0){
        //       console.log(445465);
        //   this.getallbooks({url:'/api/allbooks'})
        //   console.log(22222);
        // }
  }
};
</script>

<style  scoped>
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