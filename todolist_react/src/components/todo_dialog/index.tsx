import { useState,useRef } from 'react'
import styles from './index.module.scss'
import { useEventStore } from '../../stores/useEventStore'

export default function Dialog({style,msg,cancel,sure}){
  const eventUpload = useEventStore(state=>state.eventUpload)
  const [upSuccess, setUpSuccess] = useState(false)
  const [upError, setUpError] = useState(false)
  const events = useRef(null)

  function upload(event) {
    // console.log(event);
    const files = event.target.files
    const reader = new FileReader()

    if (files[0] && files[0].name.indexOf('notepad') !== -1) {
      reader.onload = function (event1) {
        setUpError(false)
        setUpSuccess(true)
        events.current = event1.target.result
      }
      reader.readAsText(files[0])
    } else {
      setUpError(true)
      setUpSuccess(false)
    }
  }
  function sureUpload() {
    if (upSuccess) {
      eventUpload(events.current)
      cancel()
    }
  }



  return (
    <div className={`${styles.dialog} dialog`} style={style}>
      <div className={`${styles.dialog_wrapper} dialog_wrapper`}>
        <div className={`${styles.dialog_header} dialog_header`}><span>提示</span></div>
        {msg !== 'upload'? (<div className={`${styles.dialog_content} dialog_content`}>{ msg }</div>) :
          (
            <div className={`${styles.dialog_content} dialog_content`}>
              <input type="file" accept=".txt" onChange={upload} />
              <p>只允许上传由侧边栏下载的notepad.txt文件</p>
              { upSuccess && (<p>数据读取成功，是否确定导入？</p>)}
              { upError && (<p>上传失败，只允许notepad.txt文件</p>)}
            </div>
          )
        }
        <div className={`${styles.dialog_footer} dialog_footer`}>
          <button type="button" className={`${styles.cancel_btn} cancel_btn`} onClick={cancel}>取消</button>
          {
            (msg !== 'upload')?
            (
              <button type="button" className={`${styles.sure_btn} sure_btn`} onClick={sure}>
                确定
              </button>
            ):(
              <button type="button" className={`${styles.sure_btn} sure_btn`} onClick={sureUpload}>确定</button>
            )
          }
        </div>
      </div>
    </div>
  )
} 