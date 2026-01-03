import { useState } from 'react'
import styles from './index.module.scss'
import {useEventStore} from '../../stores/useEventStore';

export default function AddEvent(showNotifyMessage){
  const [content, setContent] = useState('')
  const eventOperate = useEventStore((state) => state.eventOperate)

  function submit() {
    const params = {
      id: 0,
      type: 1,
      content: '',
      time: '',
    }
    const str = content.trim() //去掉字符首尾空格
    if (str) {
      params.content = str
      eventOperate('add', params)
      setContent('')
      showNotifyMessage('添加成功')
    }
  }

  return (
    <div className={`${styles.event_add} event_add`}>
      <input
        type="text"
        className={`${styles.add_input} add_input`}
        value={content}
        onChange={(e)=>setContent(e.target.value)}
        onKeyUp={(e)=>{
          if(e.key === 'Enter') submit();
        }}
        placeholder="待办事项"
      />
      <button onClick={submit} className={`${styles.add_btn} add_btn`}>提交</button>
    </div>
  )
} 