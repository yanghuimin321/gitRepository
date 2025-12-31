<template>
  <div id="app" :class="themeStore.theme">
    <Header v-on:cPages="changePages" />
    <div class="container" v-show="!table">
      <AddEvent></AddEvent>
      <ListEvent></ListEvent>
      <Sidebar
        :is-show="tools"
        @opentheme="((tools = false), (theme = true))"
        @upload="uploadData"
        @opentable="((tools = false), (table = true))"
        @clear="clearData"
      ></Sidebar>
      <Theme :is-show="theme"></Theme>
    </div>

    <transition name="dialog">
      <Dialog :msg="tips" v-show="dialog" @cancel="dialog = false" @sure="sureDialog"></Dialog>
    </transition>

    <Table :is-show="table" @delevent="delData"></Table>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import Header from '@/components/todo_header.vue'
import AddEvent from '@/components/event_add.vue'
import ListEvent from '@/components/event_list.vue'
import Footer from '@/components/todo_footer.vue'
import Sidebar from '@/components/todo_sidebar.vue'
import Table from '@/components/event_table.vue'
import Dialog from '@/components/todo_dialog.vue'
import Theme from '@/components/todo_theme.vue'
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useEventStore } from '@/stores/event'
const themeStore = useThemeStore()
const eventStore = useEventStore()

const tools = ref(false)
const table = ref(false)
const theme = ref(false)
const dialog = ref(false)
const tips = ref('')
const dialogType = ref('')
const del_info = ref({
  index: 0,
  id: 0,
})

function changePages() {
  if (table.value) table.value = !table.value
  else if (theme.value) theme.value = !theme.value
  else tools.value = !tools.value
}
function clearData() {
  tools.value = false
  dialog.value = true
  dialogType.value = 'clear'
  tips.value = '清空后无法恢复，确认清空吗？'
}
function uploadData() {
  tools.value = false
  tips.value = 'upload'
  dialog.value = true
  dialogType.value = 'upload'
}
function delData(index, id) {
  dialog.value = true
  dialogType.value = 'del'
  tips.value = '删除后无法恢复，确认清空吗？'
  del_info.value = {
    index: index,
    id: id,
  }
}
function sureDialog() {
  switch (dialogType.value) {
    case 'clear':
      eventStore.eventOperate('clear')
      toast.success('清除数据成功')
      break
    case 'del':
      eventStore.eventOperate('del', del_info.value)
      toast.success('删除成功')
      break
  }
  dialog.value = false
}
</script>

<style lang="scss">
html,
body,
ul,
li,
input,
p {
  margin: 0;
  padding: 0;
}
body {
  font-size: 16px;
  font-family: 'Helvetica Neue', Helvetica, 'microsoft yahei', arial, STHeiTi, sans-serif;
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
#app {
  height: 100%;
  padding-bottom: 60px;
  box-sizing: border-box; //边框边距等放入指定高宽中
}
.container {
  width: 100%;
  max-width: 800px;
  padding: 0 10px;
  margin: auto;
  box-sizing: border-box;
  // &.hide{
  //   display: none;
  // }
}
button {
  padding: 7px 0;
  outline: none;
  text-align: center;
  border-radius: 4px;
  box-sizing: border-box;
  font: inherit;
  cursor: pointer;
  border-width: 0;
}
// input,button{
//   -webkit-tap-highlight-color: transparent;
// }
// input[type=text]{
//   -webkit-appearance: none;
// }
ul {
  list-style: none;
}
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
</style>
