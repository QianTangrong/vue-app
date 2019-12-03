<template>
  <div>
    <van-tabbar v-model="active" active-color="#f30" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/app/" name="首页">首页</van-tabbar-item>
      <van-tabbar-item icon="search" dot to="/app/sort" name="分类">分类</van-tabbar-item>
      <van-tabbar-item
        icon="shopping-cart-o"
        :info="bookkinds"
        to="/app/shoppingCar"
        name="购物车"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/app/mine" name="我的">我的</van-tabbar-item>
    </van-tabbar>

    <nuxt-child></nuxt-child>
    <Footer />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
// import Footer from '~/components/footer.vue'
export default {
  data() {
    return {
      active: 0,
      value: ""
    };
  },
  methods: {
    onSearch() {}
  },
  components: {
    // Footer
  },
  computed: {
    ...mapState(["userInfo", "shoppingcar", "bookkinds", "allbooks"])
  }
};
</script>