<template>
  <div class="wrap">
    <Header />
    <van-tabs>
      <van-tab v-for="(index,i) in title" :title="index" :key="i" > 
        <img :src="banners[i]" alt class="banners" @click="tobooklist(index)"/>
        <h3>{{index}}榜单</h3>

        <div class="tushu" v-if="i==0" :to="{path:'/bookList',query:{type:index}}">
          <van-grid :border="false" :column-num=" tushubang.length" >
            <van-grid-item v-for="(item,k) in tushubang" :key="k">
              <van-image :src="tushubang[k]" class="bangdan" />
              <!-- <span>{{tushubangdantitle[k]}}</span> -->
            </van-grid-item>
          </van-grid>

          <van-grid :column-num="3" v-for="(m,n) in tushu" :key="n" class="smallsort">
            <van-grid-item v-for="(p,q) in tushu[n].detail" :key="q" :text="p.title" />
            <h3 class="tushu_sort">{{tushu_sort[n]}}</h3>
          </van-grid>
        </div>

        <div class="ele" v-if="i==1">
          <van-grid :column-num="4">
            <van-grid-item v-for="(ele,i) in elebookbangdan" :key="i" :text="ele.title" />
          </van-grid>

           <h2>当当特色</h2>
          <van-grid :column-num="2">
            <van-grid-item v-for="(ele,i) in ele_tese.detail" :key="i" :text="ele.title" />
          </van-grid>

           <h2>文艺美文</h2>
          <van-grid :column-num="3">
            <van-grid-item v-for="(ele,i) in ele_wenyi.detail" :key="i" :text="ele.title" />
          </van-grid>

           <h2>经管</h2>
          <van-grid :column-num="4">
            <van-grid-item v-for="(ele,i) in ele_jingguan.detail" :key="i" :text="ele.title" />
          </van-grid>

           <h2>人文社科</h2>
           <van-grid :column-num="3">
            <van-grid-item v-for="(ele,i) in ele_renwen.detail" :key="i" :text="ele.title" />
          </van-grid>
        </div>

        <div class="net" v-if="i==2">
          <van-grid :column-num="2">
            <van-grid-item v-for="(net,i) in netbook" :key="i" :text="net.title" />
          </van-grid>

          <h2>特色推荐---</h2>
          <van-grid :column-num="2">
            <van-grid-item v-for="(net,i) in net_tese.detail" :key="i" :text="net.title" />
          </van-grid>

          <h2>特色专区</h2>
          <van-grid :column-num="3">
            <van-grid-item v-for="(net,i) in net_tesezhuangqu.detail" :key="i" :text="net.title" />
          </van-grid>

          <h2>女频</h2>
          <van-grid :column-num="3">
            <van-grid-item v-for="(net,i) in net_nv.detail" :key="i" :text="net.title" />
          </van-grid>

           <h2>男频</h2>
          <van-grid :column-num="3">
            <van-grid-item v-for="(net,i) in net_nan.detail" :key="i" :text="net.title" />
          </van-grid>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Header from "~/components/header.vue";
export default {
  data() {
    return {
      title: [], //总的分类
      banners: [], //每个大分类的大图
      mini_banner: [], //
      group: [], //除总分类外最多的数据
      bangdan: [], //每个分类的榜单数据
      bangdan_detail: [], //每个分类里面的 榜单 的详细数据
      tushubang: [], //图书榜的  榜单图片
      tushubangdantitle: [], //图书榜 的 榜单标题
      elebookbangdan: [], //电子书榜单详情
      netbook: [],
      tushu: [],
      ele: [],
      net: [],
      tushu_xiaoshuo: [],
      tushu_wenxue: [],
      tushu_qingchun: [],
      tushu_chenggong: [],
      tushu_sort: ["小说", "文学", "青春文学", "成功/励志"],

      ele_tese: [],
      ele_wenyi: [],
      ele_jingguan: [],
      ele_renwen: [],

      net_tese:[],
      net_tesezhuangqu:[],
      net_nv:[],
      net_nan:[]
    };
  },
  components: {
    Header
  },
  methods:{
    tobooklist(index){
      this.$router.push({ name: "bookList" ,query:{type:index}});
    }
  },
  mounted() {
    this.$axios.post("api/allsort").then(res => {
      var result = res.data.result;

      for (var i = 0; i < result.length; i++) {
        var item = result[i];
        this.title.push(item.title);
        this.banners.push(item.banner[0].img);
        this.mini_banner.push(item.mini_banner);
        this.group.push(item.pile[0].group);
      }

      for (var i = 0; i < this.group.length; i++) {
        var grou = this.group[i];
        this.bangdan.push(grou[0]);
      }
      for (var i = 0; i < this.bangdan.length; i++) {
        var bang = this.bangdan[i];
        this.bangdan_detail.push(bang.detail);
      }

      for (var i = 0; i < this.bangdan_detail[0].length; i++) {
        var tushu = this.bangdan_detail[0];
        var tushuicon = tushu[i];
        this.tushubang.push(tushuicon.icon);
        this.tushubangdantitle.push(tushuicon.title);
      }
      this.elebookbangdan = this.bangdan_detail[1];
      this.netbook = this.bangdan_detail[2];
      this.tushu = this.group[0]; //图书
      this.ele = this.group[1]; //电子书
      this.net = this.group[2]; //网络

      this.tushu_xiaoshuo = this.tushu[1];
      this.tushu_wenxue = this.tushu[2];
      this.tushu_qingchun = this.tushu[3];
      this.tushu_chenggong = this.tushu[4];
      this.ele_tese = this.ele[1];
      this.ele_wenyi = this.ele[2];
      this.ele_jingguan = this.ele[3];
      this.ele_renwen = this.ele[4];

      this.net_tese = this.net[1];
      this.net_tesezhuangqu = this.net[2];
      this.net_nv = this.net[3];
      this.net_nan = this.net[4];

    });
  }
};
</script>

<style scoped>
.banners {
  width: 100%;
  height: 11rem;
  margin-bottom: 0.3rem;
}
.bangdan {
  width: 4rem;
  height: 4.5rem;
  margin-bottom: 0.5rem;
}
.smallsort {
  margin-bottom: 0.5rem;
}
.tushu_sort {
  margin-top: 0.7rem;
}
.wrap{
  margin-bottom: 2.5rem;
}
</style>
