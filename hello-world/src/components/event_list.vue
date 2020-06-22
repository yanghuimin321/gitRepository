<template>
    <div class="event_content">

        <div class="event_tab" @click="showEvents(0,$event)">未完成<span :class="{'close-span':!events[0].show}"></span></div>
        <div class="event_box" v-bind:style="{'height':'auto','display':'block'}">
            <ul>
                <li class="event_list" v-for="value in getToDo" :key="value.id">
                    <input type="checkbox" :key="value.id" @click="moveToDone(value.id)">
                    <div>{{value.content}}</div>
                    <button class="cancel_btn" @click="moveCancel(value.id)">取消</button>
                </li>
            </ul>
        </div>

        <div class="event_tab" v-on:click="showEvents(1,$event)">已完成<span :class="{'close-span':!events[1].show}"></span></div>
        <div class="event_box" >
            <ul>
                <li class="event_list" v-for="value in getDone" :key="value.id">
                    <input type="checkbox" :key="value.id" checked @click="moveToDo(value.id)">
                    <div>{{value.content}}</div>
                    <span class="event_time">{{value.time}}</span>
                </li>
            </ul>
        </div>

        <div class="event_tab" v-on:click="showEvents(2,$event)">已取消<span :class="{'close-span':!events[2].show}"></span></div>
        <div class="event_box"  :class="{'event-box-hide':false}">
            <ul>
                <li class="event_list" v-for="value in getCancel" :key="value.id">
                    <div class="event_cancel">{{value.content}}</div>
                    <button class="cancel_btn" @click="moveToDo(value.id)">恢复</button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            events:[{show:true},{show:true},{show:true}]
        }
    },
    computed:{//事件列表为了能够实时更新，使用computed
        getToDo(){
            return this.$store.getters.getToDo;
        },
        getDone(){
            return this.$store.getters.getDone;
        },
        getCancel(){
            return this.$store.getters.getCancel;
        }
    },
    methods:{
        moveToDone(id){
            this.$store.dispatch('eventdone',id);
        },
        moveToDo(id){
            this.$store.dispatch('eventtodo',id);
        },
        moveCancel(id){
            this.$store.dispatch('eventcancel',id);
        },
        showEvents(id,event){
            const show=this.events[id].show;
            if(show){
                this.closeEvents(event);
            }
            else{
                this.openEvents(event);
            }
            this.events[id].show=!show;
        },
        closeEvents(event){
            let element=event.currentTarget.nextElementSibling;
            let children=element.getElementsByTagName('ul')[0];

            element.style.height=children.offsetHeight+"px";
            setTimeout(function(){
                 setTimeout(function(){
                    element.style.display='none';
                 },300);
                element.style.height='0px';
            },10);
        },
        openEvents(event){
            let element=event.currentTarget.nextElementSibling;
            let children=element.getElementsByTagName('ul')[0];
            element.style.display='block';
            element.style.height=children.offsetHeight+"px";
            setTimeout(function(){
                element.style.height="auto";
            },300);
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .event_content{
        .event_tab{
            //background-color: black;
            position: relative;
            height: 44px;
            line-height: 44px;
            padding-left:20px;
            border-bottom: 1px solid #fff;
            box-sizing: border-box;
            color:#fff;
            cursor:pointer;
            span{
                position: absolute;
                right:20px;
                top:15px;
                width: 10px;
                height:10px;
                content:'';
                border-top: 2px solid #fff;
                border-right: 2px solid #fff;
                transform: rotate(135deg);
                transition: all .3s;
                &.close-span{
                    transform: rotate(45deg);
                }
            }
        }
        .event_box{
            // list-style:none;
            overflow: hidden;//若该元素内容超出了给定的宽度和高度，超出的部分被隐藏，不占位
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            transition:height .3s;
            .event_list{
                position: relative;
                min-height: 44px;
                line-height: 25px;
                padding: 10px 100px 10px 50px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                color:#373e40;
                input[type=checkbox]{
                    position: absolute;
                    left:15px;
                    top:12px;
                    width: 20px;
                    height: 20px;
                }
                .cancel_btn{
                    position: absolute;
                    right: 10px;
                    top: 7px;
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                    background: #fff;
                    border:1px solid #c0ccda;
                    color: #666;
                    font-size:12px;
                }
                .event_time{
                    position: absolute;
                    right: 10px;
                    top:0;
                    line-height: 44px;
                    font-size: 12px;
                    color:#aaa;
                }
                .event_cancel{
                    text-decoration: line-through;
                    color:#999;
                }
            }
        }
    }
</style>