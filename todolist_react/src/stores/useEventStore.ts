import { create } from 'zustand'
import * as func from './function'

interface Event {
  id: number,
  type: number,
  content: string,
  time: string
}

interface EventState {
  event: Array<Event>,
  count: number,
  eventMoveTo: (string, Event) => void,
  eventOperate: (string, Event) => void,
  eventUpload: (Object)=> void
}

export const useEventStore = create<EventState>((set, get) => ({
  event: func.local.get().event || [],
  count: func.local.get().count || 0,
  eventMoveTo: (type, obj) => {
    const event = get().event.map((item)=>{
      if(item.id === obj.id){
        const newType = type === 'todo' ? 1 : type === 'done' ? 2 : 3
        return {
          ...item,
          type: newType,
          time: newType == 2? func.getDate() : ''
        }
      }
      return item;
    })
    const index = event.findIndex((item) => item.id === obj.id)
    const [item] = event.splice(index, 1)
    event.unshift(item)
    set((state)=>({
      ...state,
      event: event
    }));

    func.local.set({
      event: event,
      count: get().count
    })
  },
  eventOperate: (type, obj) => {
    let event = [...get().event];
    let count = get().count;
    if (type === 'add') {
      obj.id = ++count;
      event.unshift(obj)
    } else if (type === 'del') {
      const index = event.findIndex((item) => item.id === obj.id)
      event.splice(index, 1)
    } else if (type == 'edit') {
      const index = event.findIndex((item) => item.id === obj.id)
      event[index].content = obj.content
    } else if (type === 'clear') {
      event = []
    }
    set(()=>({
      event: event,
      count: count
    }))
    func.local.set({
      event: event,
      count: count
    })
  },
  eventUpload: (data)=> {
    data = JSON.parse(data)
    set(()=>({
      event: data.event.event,
      count: data.event.count
    }))
  }
}))