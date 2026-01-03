import { useState, useMemo } from 'react'
import styles from './index.module.scss'
import { useEventStore } from '../../stores/useEventStore'

export default function ListEvent(){
  const [events, setEvents] = useState([{ show: true }, { show: true }, { show: true }])
  const event = useEventStore(state=> state.event)
  const todoEvent = useMemo(() => event.filter(item => item.type === 1),[event])
  const doneEvent = useMemo(() => event.filter(item => item.type === 2),[event])
  const cancelEvent = useMemo(() => event.filter(item => item.type === 3),[event])
  const eventMoveTo = useEventStore((state) => state.eventMoveTo)

  function showEvents(id, event) {
    const temp_event = [...events]
    const show = temp_event[id].show
    if (show) {
      closeEvents(event)
    } else {
      openEvents(event)
    }
    temp_event[id].show = !show
    setEvents(temp_event)
  }
  function closeEvents(event) {
    const element = event.currentTarget.nextElementSibling
    const children = element.getElementsByTagName('ul')[0]

    element.style.height = children.offsetHeight + 'px'
    setTimeout(function () {
      setTimeout(function () {
        element.style.display = 'none'
      }, 300)
      element.style.height = '0px'
    }, 10)
  }
  function openEvents(event) {
    const element = event.currentTarget.nextElementSibling
    const children = element.getElementsByTagName('ul')[0]
    element.style.display = 'block'
    element.style.height = children.offsetHeight + 'px'
    setTimeout(function () {
      element.style.height = 'auto'
    }, 300)
  }


  return (
    <>
      <div className={`${styles.event_content} event_content`}>
        <div className={`${styles.event_tab} event_tab`} onClick={($event)=>showEvents(0, $event)}>
          未完成<span className={!events[0].show? styles[`close-span`]: ''}></span>
        </div>
        <div className={`${styles.event_box} event_box`} style={{ height: 'auto', display: 'block' }}>
          <ul>
            {
              todoEvent.map((value)=>(
                <li className={`${styles.event_list} event_list`}  key={value.id}>
                  <input type="checkbox" key={value.id} onClick={()=>eventMoveTo('done', value)} />
                  <div>{ value.content }</div>
                  <button className={`${styles.cancel_btn} cancel_btn`} onClick={()=>eventMoveTo('cancel', value)}>取消</button>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={`${styles.event_tab} event_tab`} onClick={($event)=>showEvents(1, $event)}>
          已完成<span className={!events[1].show? styles[`close-span`]:''}></span>
        </div>
        <div className={`${styles.event_box} event_box`}>
          <ul>
            {
              doneEvent.map((value)=>(
                <li className={`${styles.event_list} event_list`} key={value.id}>
                  <input
                    type="checkbox"
                    key={value.id}
                    checked
                    onClick={()=>eventMoveTo('todo', value)}
                    onChange={()=>eventMoveTo('todo', value)}
                  />
                  <div>{ value.content }</div>
                  <span className={`${styles.event_time} event_time`}>{ value.time }</span>
                </li>
              ))
            }
          </ul>
        </div>

        <div className={`${styles.event_tab} event_tab`} onClick={($event)=>showEvents(2, $event)}>
          已取消<span className={!events[2].show? styles[`close-span`]: ''}></span>
        </div>
        <div className={`${styles.event_box} event_box`}>
          <ul>
            {
              cancelEvent.map((value)=>(
                <li className={`${styles.event_list} event_list`} key={value.id}>
                  <div className={`${styles.event_cancel} event_cancel`}>{ value.content }</div>
                  <button className={`${styles.cancel_btn} cancel_btn`} onClick={()=>eventMoveTo('todo', value)}>恢复</button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
} 