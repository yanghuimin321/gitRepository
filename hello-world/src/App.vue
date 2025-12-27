<template>
  <div id="app" :class="getTheme">
    <Header v-on:cPages="changePages"/>
    <div class="container" v-show="!table">
      <addEvent></addEvent>
      <listEvent></listEvent>
      <Sidebar :is-show="tools" 
      @opentheme="tools=false;theme=true;"
      @upload="uploadData"
      @opentable="tools=false;table=true;"
      @clear="clearData"
      ></Sidebar>
      <Theme :is-show="theme"></Theme>
    </div>

    <transition name="dialog">
      <Dialog :msg="tips" v-show="dialog" @cancel="dialog=false;" @sure="sureDialog"></Dialog>
    </transition>

    <Table :is-show="table" @delevent="delData"></Table>
    <Footer></Footer>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Header from './components/todo_header.vue'
import addEvent from './components/event_add'
import listEvent from './components/event_list'
import Footer from './components/todo_footer'
import Sidebar from './components/todo_sidebar'
import Table from './components/event_table'
import Dialog from './components/todo_dialog'
import Theme from './components/todo_theme'

export default {
  name: 'App',
  data(){
    return {
      tools:false,
      table:false,
      theme:false,
      dialog:false,
      tips:'',
      dialog_type:'',
      del_info:{
        index:0,
        id:0
      }
    }
  },
  components: {
    Header,addEvent,listEvent,Footer,Sidebar,Table,Dialog,Theme
  },
  computed:{
      getTheme(){
        return  this.$store.getters.getTheme;
      }
  },
  methods:{
    changePages(){
      if(this.table)this.table=!this.table;
      else if(this.theme)this.theme=!this.theme;
      else this.tools=!this.tools;
    },
    clearData(){
      this.tools=false;
      this.dialog=true;
      this.dialog_type='clear';
      this.tips='清空后无法恢复，确认清空吗？';
    },
    uploadData(){
      this.tools=false;
      this.tips="upload";
      this.dialog=true;
      this.dialog_type="upload";
    },
    delData(index,id){
      this.dialog=true;
      this.dialog_type='del';
      this.tips="删除后无法恢复，确认清空吗？";
      this.del_info={
        index:index,
        id:id
      }
    },
    sureDialog(){
      switch(this.dialog_type){
        case 'clear':
          this.$store.dispatch('clearevent');
          this.$toast('清除数据成功');
          break;
        case 'del':
          this.$store.dispatch('delevent',this.del_info);
          this.$toast('删除成功');
          break;
      }
      this.dialog=false;
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" src="./theme.scss"></style>

<style lang="scss" rel="stylesheet/scss">
  html,body,ul,li,input,p{
    margin:0;
    padding:0;
  }
  body{
    font-size:16px;
    font-family: "Helvetica Neue", Helvetica, "microsoft yahei", arial, STHeiTi, sans-serif;
  }
  // html,body{
  //   height: 100%
  // }
  // body,#app{
  //   width: 100%;
  //   overflow-x:hidden;  //裁剪div元素内容多余的部分
  // }


  // ::-webkit-scrollbar{//右边滚动条宽度为0
  //   width: 0;
  // }
  #app{
    height: 100%;
    padding-bottom:60px;
    box-sizing: border-box; //边框边距等放入指定高宽中
  }
  .container{
    width: 100%;
    max-width: 800px;
    padding: 0 10px;
    margin:auto;
    box-sizing: border-box;
    // &.hide{
    //   display: none;
    // }
  }
  button{
    padding: 7px 0;
    outline: none;
    text-align: center;
    border-radius: 4px;
    box-sizing: border-box;
    font: inherit;
    cursor:pointer;
    border-width: 0;
  }
  // input,button{
  //   -webkit-tap-highlight-color: transparent;
  // }
  // input[type=text]{
  //   -webkit-appearance: none;
  // }
  ul{
    list-style: none;
  }
  .dialog-enter-active,.dialog-leave-active{
    transition: opacity .3s;
  }
  .dialog-enter,.dialog-leave-to{
    opacity:0;
  }
</style>
