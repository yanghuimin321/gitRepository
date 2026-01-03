// import { useState } from 'react';
import './App.scss';
import Header from './components/todo_header/index';
import AddEvent from './components/event_add/index';
import ListEvent from './components/event_list/index'
import Sidebar from './components/todo_sidebar/index'
import Theme  from './components/todo_theme';
import Table from './components/event_table'
import Footer from './components/todo_footer';
import Dialog from './components/todo_dialog';
import {useThemeStore} from './stores/useThemeStore';
import { useEventStore } from './stores/useEventStore';
import toast, { Toaster } from 'react-hot-toast'
import { useState, useRef } from 'react';

function App() {
  const themeClassName = useThemeStore((state) => state.theme)
  const eventOperate = useEventStore(state=> state.eventOperate)
  const [table, setTable] = useState(false);
  const [tools, setTools] = useState(false)
  const [theme, setTheme] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [tips, setTips] = useState('')
  const dialogType = useRef('')
  const del_info = useRef({
    index: 0,
    id: 0,
  })

  const showNotifyMessage = (msg) => toast.success(msg)

  return (
    <div id="app" className={themeClassName}>
      <Header changePages={changePages}></Header>
      <div className="container" style={{display: table? 'none': 'block'}}>
        <AddEvent showNotifyMessage={showNotifyMessage}></AddEvent>
        <ListEvent></ListEvent>
        <Sidebar
          isShow={tools}
          openTheme={()=>(setTools(false), setTheme(true))}
          upload={uploadData}
          openTable={()=>(setTools(false), setTable(true))}
          clear={clearData}
        ></Sidebar>
        <Theme isShow={theme}></Theme>
      </div>
      <Table isShow={table} delevent={delData} toast={showNotifyMessage}></Table>

      <Dialog style={{display: !dialog? 'none': 'block'}} msg={tips} cancel={()=>setDialog(false)} sure={sureDialog}></Dialog>

      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
      <Footer></Footer>
    </div>
  )

  function changePages(){
    if (table) setTable(!table)
    else if (theme) setTheme(!theme)
    else setTools(!tools)
  }
  function clearData() {
    setTools(false)
    setDialog(true)
    dialogType.current = 'clear'
    setTips('清空后无法恢复，确认清空吗？')
  }
  function uploadData() {
    setTools(false)
    setTips('upload')
    setDialog(true)
    dialogType.current = 'upload'
  }
  function delData(index, id) {
    setDialog(true)
    dialogType.current = 'del'
    setTips('删除后无法恢复，确认清空吗？')
    del_info.current = {
      index: index,
      id: id,
    }
  }
  function sureDialog() {
    switch (dialogType.current) {
      case 'clear':
        eventOperate('clear',{})
        showNotifyMessage('清除数据成功')
        break
      case 'del':
        eventOperate('del', del_info.current)
        showNotifyMessage('删除成功')
        break
    }
    setDialog(false)
  }
}

export default App
