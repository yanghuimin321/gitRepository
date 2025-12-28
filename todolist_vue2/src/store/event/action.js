export default{
    eventdone:({commit},param)=>commit('EVENTTODONE',{id:param}),
    eventtodo:({commit},param)=>commit('EVENTTODO',{id:param}),
    eventcancel:({commit},param)=>commit('EVENTTOCANCEL',{id:param}),
    addevent:({commit},obj)=>commit('ADDEVENT',obj),
    delevent:({commit},obj)=>commit('DELEVENT',obj),
    editevent:({commit},obj)=>commit('EDITEVENT',obj),
    clearevent:({commit})=>commit('CLEAREVENT'),
    uploadevent:({commit},obj)=>commit('UPLOADEVENT',obj)
}