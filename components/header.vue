<template>
  <div>
<form action="/">
  <van-search
    v-model="value"
    placeholder="搜索功能还在完善中"
    show-action
    @click="search"
    disabled
  />
</form>
  </div>
</template>


<script>
import { Search } from 'vant';

export default {
  data(){
    return{
      value:''
    }
  },
  methods:{
    search(){

    },
    Cancel(){

    }
  }
}
</script>