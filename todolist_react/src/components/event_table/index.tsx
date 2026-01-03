import { useState,useRef,useMemo } from 'react'
import styles from './index.module.scss'
import { useEventStore } from '../../stores/useEventStore'

export default function Table({isShow,delevent, toast}){
  const eventOperate = useEventStore(state=>state.eventOperate)
  const event = useEventStore(state=> state.event)
  const [isEdit, setIsEdit] = useState(false)
  const [active, setActive] = useState(false)
  const [screenTitle, setScreenTitle] = useState('')
  const [content, setContent] = useState('')
  const [screenType, setScreenType] = useState(0)
  const info = useRef({
    content: '',
    id: 0,
    index: 0,
  })
  const inputRef = useRef(null)
  const notepad = useMemo(() => event.filter(function (item) {
    if (screenType !== 0 && screenTitle !== '') {
      if (item.type === screenType && item.content.indexOf(screenTitle) !== -1)
        return item
    } else if (screenType !== 0 && screenTitle === '') {
      if (item.type === screenType) return item
    } else if (screenType === 0 && screenTitle !== '') {
      if (item.content.indexOf(screenTitle) !== -1) return item
    } else return item
  }),[event,screenTitle,screenType])


  function getType(type) {
    if (type === 0) return '筛选类型'
    else if (type === 1) return '未完成'
    else if (type === 2) return '已完成'
    else if (type === 3) return '已取消'
  }

  function editData() {
    info.current.content = content.trim();
    if(info.current.content){
      eventOperate('edit', info.current)
      setIsEdit(false)
      toast('修改成功')
    }
  }
  function doSelect(id) {
    setScreenType(id)
    setActive(false)
  }
  function showInput(index) {
    setIsEdit(true)
    info.current = {
      index: index,
      content: notepad[index].content,
      id: notepad[index].id,
    }
    setContent(info.current.content)
    inputRef.current.focus()
  }


  return (
    <div className={`${styles.event_all} event_all ${isShow? `${styles[`event_all_show`]} event_all_show` : ''}`}>
      <div className={`${styles.table_box} table_box`}>
        <div className={`${styles.edit_input} edit_input ${isEdit? `${styles[`edit_input_show`]} edit_input_show` : ''}`}>
          <input type="text" value={content} onChange={(e)=>setContent(e.target.value)} ref={inputRef} onKeyUp={(e)=>{if(e.key === 'Enter') editData();}} />
          <button onClick={editData}>确定</button>
        </div>

        <div className={`${styles.screen_box} screen_box`}>
          <div className={`${styles.div_select} div_select`}>
            <div className={`${styles.div_value} div_value`} onClick={()=>setActive(!active)}>{getType(screenType)}</div>

            <div className={`${styles.div_select_body} div_select_body ${active? `${styles[`active`]} active` : ''}`}>
              <div className={`${styles.div_option} div_option`} onClick={()=>doSelect(0)}>筛选类型</div>
              <div className={`${styles.div_option} div_option`} onClick={()=>doSelect(1)}>未完成</div>
              <div className={`${styles.div_option} div_option`} onClick={()=>doSelect(2)}>已完成</div>
              <div className={`${styles.div_option} div_option`} onClick={()=>doSelect(3)}>已取消</div>
            </div>
          </div>

          <input type="text" className={`${styles.div_search} div_search`} placeholder="筛选关键词" value={screenTitle} onChange={(e)=>setScreenTitle(e.target.value)} />
        </div>

        <table className={`${styles.event_table} event_table`}>
          <thead>
            <tr>
              <th>#</th>
              <th>所有事项</th>
              <th style={{width:''}}>类型</th>
              <th style={{width:''}}>操作</th>
            </tr>
          </thead>

          <tbody>
            {
              notepad.map((value,index)=>(
                <tr key={value.id}>
                  <td style={{'textAlign': 'center'}}>{ index + 1 }</td>
                  <td>{ value.content }</td>
                  <td style={{'textAlign': 'center'}}>{ getType(value.type) }</td>
                  <td style={{'textAlign': 'center'}}>
                    <button onClick={()=>showInput(index)}>编辑</button>
                    <button className={`${styles.del_btn} del_btn`} onClick={()=>delevent(index, value.id)}>删除</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
} 