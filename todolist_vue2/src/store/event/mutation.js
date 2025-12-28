import * as func from '../function'
import * as type from './mutation_type'
export default{
    [type.EVENTTODONE](state,obj){
        for(let i=0;i<state.event.length;i++){
            if(state.event[i].id===obj.id){
                state.event[i].type=2;
                state.event[i].time=func.getDate();
                var item=state.event[i];
                state.event.splice(i,1);
                break;
            }
        }
        state.event.unshift(item);
        func.local.set(state);
    },
    [type.EVENTTODO](state,obj){
        for(let i=0;i<state.event.length;i++){
            if(state.event[i].id===obj.id){
                state.event[i].type=1;
                
                var item=state.event[i];
                state.event.splice(i,1);

                break;
            }
        }
        state.event.unshift(item);
        func.local.set(state);
    },
    [type.EVENTTOCANCEL](state,obj){
        for(let i=0;i<state.event.length;i++){
            if(state.event[i].id===obj.id){
                state.event[i].type=3;

                var item=state.event[i];
                state.event.splice(i,1);

                break;
            }
        }
        state.event.unshift(item);
        func.local.set(state);
    },
    [type.ADDEVENT](state,obj){
        state.count++;
        obj.id=state.count;
        state.event.unshift(obj);
        func.local.set(state);
    },
    [type.DELEVENT](state,obj){
        if(state.event[obj.index].id===obj.id){
            state.event.splice(obj.index,1);
        }
        else{
            state.event.filter(function(item,index){
                if(item.id===obj.id){
                    state.event.splice(index,1);
                }
            })
        }
        func.local.set(state);
    },
    [type.EDITEVENT](state,obj){
        state.event.filter(function(item){
            if(item.id===obj.id){
                item.content=obj.content;
            }
        })
        func.local.set(state);
    },
    [type.CLEAREVENT](state){
        state.event=[];
        func.local.clear();
    },
    [type.UPLOADEVENT](state,data){
        data=JSON.parse(data);
        state.event=data.event.event;
        state.count=data.event.count;
        func.local.set(state);
    }
}