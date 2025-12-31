import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import * as func from '@/stores/function'

export const useEventStore = defineStore('event', () => {
  const event = ref(func.local.get().event || [])
  const count = ref(func.local.get().count || 0)

  const todoEvent = computed(() => {
    return event.value.filter((item) => item.type === 1)
  })
  const doneEvent = computed(() => {
    return event.value.filter((item) => item.type === 2)
  })
  const cancelEvent = computed(() => {
    return event.value.filter((item) => item.type === 3)
  })

  function eventMoveTo(type, obj) {
    if (type === 'todo') type = 1
    else if (type === 'done') type = 2
    else type = 3
    let index = event.value.findIndex((item) => item.id === obj.id)
    let item = event.value[index]
    item.type = type
    if (type === 2) item.time = func.getDate()
    event.value.splice(index, 1)
    event.value.unshift(item)
  }

  function eventOperate(type, obj) {
    if (type === 'add') {
      obj.id = ++count.value
      event.value.unshift(obj)
    } else if (type === 'del') {
      let index = event.value.findIndex((item) => item.id === obj.id)
      event.value.splice(index, 1)
    } else if (type == 'edit') {
      let index = event.value.findIndex((item) => item.id === obj.id)
      event.value[index].content = obj.content
    } else if (type === 'clear') {
      event.value = []
    }
  }

  function eventUpload(data) {
    data = JSON.parse(data)
    event.value = data.event.event
    count.value = data.event.count
  }

  return {
    event,
    count,
    todoEvent,
    doneEvent,
    cancelEvent,
    eventMoveTo,
    eventOperate,
    eventUpload,
  }
})
