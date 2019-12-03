<template>
    <footer>
        <div v-for="(foot,i) in foots" :key="i">
            <nuxt-link :to="{path:foot.path}">
                <i class="iconfont " v-html="foot.icon"> </i>
                <span>{{foot.txt}}</span>
                <van-tag class="hot" v-if="i==2" type="danger">8</van-tag>
            </nuxt-link>
        </div>  
    </footer>
</template>


<script>
export default {
    name:'foot',
    data(){
        return {
             foots:[
                {txt:"首页",path:"/app/",name:"app",icon:"&#xe62a;"},
                {txt:"分类",path:"/app/sort",name:"sort",icon:"&#xe778;"},
                {txt:"购物车",path:"/app/shoppingCar",name:"shoppingCar",icon:"&#xe614;"},
                {txt:"我的",path:"/app/mine",name:"mine",icon:"&#xe60c;"}
			],
        }
    }
}
</script>

<style lang="scss" scoped>

footer{
	position:fixed;
	width:100%;
	height:2rem;
	left:0;
	bottom:0;
	background:#fff;
	display:flex !important;
    z-index:100;
    border-top:1px solid black;
	div{
		flex:1;
		height:2rem;
		a{
			display: block;
			width:100%;
			height:100%;
			display:flex;
			flex-direction:column;
			box-sizing:border-box;
			padding:0.06rem 0;
			text-align:center;
			font-family:"微软雅黑";
			color:#999;
			position: relative;
			i{
			width:100%;
			height:1.2rem;
			line-height:0.45rem;
			font-size:0.42rem !important;
			}
			span{
				width:100%;
				height:0.5rem;
				line-height:0.35rem;
				font-size:0.26rem;
			}
			.hot{
				position: absolute;
				top:0;
				left:60%;
				display: inline;
                width:0.25rem;
                border-radius: 50%;
			}
		}
		.nav-active,.router-link-exact-active{
			color:#0dc441;
		    border-color:#0dc441;
		}

	}
}
html {
   font-size: 62.5%; 
//    font-family:$yh;
   font-size:calc(100vw/7.5);      // 移动端 适配    750:100 = 100vw:x  7.5:1 = 100vw:x  x =100vw/7.5
   font-size:-webket-calc(100vw/7.5);   // 设计稿宽度  640px 

}
</style>

