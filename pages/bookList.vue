<template>
  <div class="wrap">
   <van-search
  v-model="value"
  placeholder="请输入搜索关键词"
  show-action
  shape="round"
  @search="onSearch"
>
  <div slot="action" @click="back">返回</div>
</van-search>

  <Book/>


  </div>
</template>


<script>
import Header from "~/components/header.vue";
import Book from "~/components/book.vue";
export default {
  data() {
    return {
      type: "",
      bookList: [],
      value:''
    };
  },
  methods: {
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
    onSearch(){

    },
    back(){
      this.$router.push('/app/sort')
    }
  },
  components: {
    Header,
    Book
  },
  created() {
    this.type = this.$route.query.type; //地址栏取参
    // console.log(this.type);
  },
  mounted() {
    // this.$axios
    //   .get("api/bookList", { params: { type: this.type } }) //axios的get传参只能用params，后台用query接收
    //   .then(res => {
    //     this.bookList = res.data.result;
    //     console.log(res.data.result);
    //   });
  }
};
</script>


<style  scoped>

</style>