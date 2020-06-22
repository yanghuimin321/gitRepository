<template>
    <div class="event_add">
        <input type="text" class="add_input" v-model="content" @keyup.enter="submit" placeholder="待办事项"/>
        <button @click="submit" class="add_btn">提交</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            content:''
        }
    },
    methods:{
        submit(){
            //let self=this;
            let params={
                id:0,
                type:1,
                content:'',
                time:''
            };
            this.content=this.content.trim();   //去掉字符首尾空格
            if(this.content){
                params.content=this.content;
                this.$store.dispatch('addevent',params);
                this.content='';
                this.$toast('添加成功');
            }
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .event_add{
        position:relative;
        padding:30px 90px 30px 0px;
        //font-size:16px;
        .add_input{
            width: 100%;
            height: 40px;
            padding: 7px 10px;
            line-height: 26px;
            border:1px solid #c0ccda;
            border-radius: 4px;
            transition:border-color .2s linear;
            box-sizing: border-box;
            font-size: inherit;
            &:focus{//输入框被点击
                outline: none;   //输入框边框轮廓
            }
        }
        .add_btn{
            position:absolute;
            right: 0;
            top:30px;
            width: 80px;
            height: 40px;
            line-height: 26px;
            color:#fff;
            //background-color: black;
        }
    }
</style>