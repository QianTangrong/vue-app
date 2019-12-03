<template>
  <div class="wrap">
    <!-- 顶部 -->
    <div class="van-doc-nav-bar van-nav-bar" style="z-index: 1;">
      <div class="van-nav-bar__left">
        <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" @click="goback">
          <!--顶部-->
        </i>
      </div>
      <div class="van-nav-bar__title van-ellipsis">提交订单</div>
      <div class="van-nav-bar__right">. . .</div>
    </div>
    <!-- 地址联系人 -->
    <!-- 联系人卡片 -->
<van-contact-card
  :type="cardType"
  :name="currentContact.name"
  :tel="currentContact.tel"
  @click="showList = true"
/>

<!-- 联系人列表 -->
<van-popup v-model="showList" position="bottom">
  <van-contact-list
    v-model="chosenContactId"
    :list="list"
    @add="onAdd"
    @edit="onEdit"
    @select="onSelect"
  />
</van-popup>

<!-- 联系人编辑 -->
<van-popup v-model="showEdit" position="bottom">
  <van-contact-edit
    :contact-info="editingContact"
    :is-edit="isEdit"
    @save="onSave"
    @delete="onDelete"
  />
</van-popup>
    <!-- 商品信息 -->
    <div v-for="(book) in books" :key="book.id">
      <van-card
        :num="book.booknum"
        :price="book.bookprice"
        desc="库存紧张"
        :title="book.bookname"
        :thumb="book.bookimg"
      />
    </div>

    <!-- 底部 -->
    <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      books: [],
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      list: [{
        name: '乾唐云',
        tel: '18355425847',
        id: 0
      }]
    };
  },
  methods: {
        // 添加联系人
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },

    // 编辑联系人
    onEdit(item) {
      this.isEdit = true;      
      this.showEdit = true;
      this.editingContact = item;
    },

    // 选中联系人
    onSelect() {
      this.showList = false;
    },

    // 保存联系人
    onSave(info) {
      this.showEdit = false;
      this.showList = false;
      
      if (this.isEdit) {
        this.list = this.list.map(item => item.id === info.id ? info : item);
      } else {
        this.list.push(info);
      }
      this.chosenContactId = info.id;
    },

    // 删除联系人
    onDelete(info) {
      this.showEdit = false;
      this.list = this.list.filter(item => item.id !== info.id);
      if (this.chosenContactId === info.id) {
        this.chosenContactId = null;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    onSubmit() {
      Toast({
  message: '展示图片',
  icon: 'https://img.yzcdn.cn/vant/logo.png'
});
    }
  },
  created() {
    this.books = this.$route.query.shoppingcar; //地址栏取参
    console.log(this.books);
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },

    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
    total: {
      get() {
        var total = 0;
        this.books.forEach(item => {
          if (item.check) {
            total += item.bookprice * item.booknum;
          }
        });
        return total * 100;
      }
    }
  }
};
</script>

<style  scoped>
.wrap{
  margin-bottom: 2.5rem;
}
</style>