import styles from './index.module.scss'
import * as func from '../../stores/function'

export default function Sidebar({isShow, openTheme, upload, openTable, clear}){

  return (
    <div className={`${styles.tool} tool ${isShow? `${styles[`show-tools`]} show-tools` : ''}`}>
      <ul className={`${styles.sidebar} sidebar`}>
        <li>
          <button className={`${styles.btn} btn`} onClick={openTheme}>切换主题</button>
        </li>
        <li>
          <button className={`${styles.btn} btn`} onClick={()=>downloadData('notepad.txt', JSON.stringify({
            event: func.local.get(),
            theme: func.theme_local.get()
          }))}>下载数据</button>
        </li>
        <li>
          <button className={`${styles.btn} btn`} onClick={upload}>导入数据</button>
        </li>
        <li>
          <button className={`${styles.btn} btn`} onClick={openTable}>编辑数据</button>
        </li>
        <li>
          <button className={`${styles.btn} btn`} onClick={clear}>清空数据</button>
        </li>
      </ul>
    </div>
  )

  function downloadData(fileName, content) {
    //通过超链接来下载文件，download规定下载后文件名称，href为下载链接。
    const aTag = document.createElement('a')
    const blob = new Blob([content]) //javascript中blob对象。
    aTag.download = fileName
    aTag.href = URL.createObjectURL(blob) //URL.createObjectURL()会创建一个DOMString，包含了一个对象URL，该URL可用于指定源object的内容。
    aTag.click()
    URL.revokeObjectURL(blob.toString()) //每个对象必须通过调用方法来释放。
  }

} 