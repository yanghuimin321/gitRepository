export default{
    getEventList(state){
        return state.event;
    },
    getToDo(state){
        return state.event.filter(function(item){
            if(item.type===1){
                return item;
            }
        });
    },
    getDone(state){
        return state.event.filter((item)=>{
            if(item.type===2){
                return item;
            }
        });
    },
    getCancel(state){
        return state.event.filter(function(item){
            if(item.type===3){
                return item;
            }
        });
    }
}