<template>
    <div class="event_all" :class="{'event_all_show':isShow}">
        <div class="table_box">
            <div class="edit_input" :class="{'edit_input_show':isEdit}">
                <input type="text" v-model="info.content" ref="content" @keyup.enter="editData">
                <button @click="editData">确定</button>
            </div>



            <div class="screen_box">
                <div class="div_select" >
                    <div class="div_value" @click="active=!active">{{getTypeName}}</div>

                    <div class="div_select_body" :class="{'active':active}">
                        <div class="div_option" @click="doSelect(0)">筛选类型</div>
                        <div class="div_option" @click="doSelect(1)">未完成</div>
                        <div class="div_option" @click="doSelect(2)">已完成</div>
                        <div class="div_option" @click="doSelect(3)">已取消</div>
                    </div>
                </div>


                <input type="text" class="div_search" placeholder="筛选关键词" v-model="screen_title">
            </div>



            <table class="event_table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>所有事项</th>
                        <th width="">类型</th>
                        <th width="">操作</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(value,index) in notepad" :key="value.id">
                        <td style="text-align:center">{{index+1}}</td>
                        <td>{{value.content}}</td>
                        <td style="text-align:center">{{getType(value.type)}}</td>
                        <td style="text-align:center">
                            <button @click="showInput(index)">编辑</button>
                            <button class="del_btn" @click="showDialog(index,value.id)">删除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {
            isEdit:false,
            active:false,
            screen_title:'',
            screen_type:0,
            info:{
                content:'',
                id:0,
                index:0
            }
        }
    },
    props:['isShow'],
    computed:{
        getTypeName:function(){
            return this.getType(this.screen_type);
        },
        notepad:function(){
            let self=this;
            return this.$store.getters.getEventList.filter(function(item){
                if(self.screen_type!==0&&self.screen_title!==""){
                    if(item.type===self.screen_type&&item.content.indexOf(self.screen_title)!==-1)
                    return item;
                }
                else if(self.screen_type!==0&&self.screen_title===""){
                    if(item.type===self.screen_type)
                    return item;
                }
                else if(self.screen_type===0&&self.screen_title!==""){
                    if(item.content.indexOf(self.screen_title)!==-1)
                    return item;
                }
                else return item;
            });
        }
    },
    methods:{
        editData:function(){
            this.info.content=this.info.content.trim();
            if(this.info.content){
                this.$store.dispatch('editevent',this.info);
                this.isEdit=false;
                this.$toast('修改成功');
            }
        },
        doSelect:function(id){
             this.screen_type=id;
             this.active=false;
        },
        getType:function(type){
             if(type===0)
             return "筛选类型";
             else if(type===1)
             return "未完成";
             else if(type===2)
             return "已完成";
             else if(type===3)
             return "已取消";
        },
        showInput:function(index){
             this.isEdit=true;
             this.info={
                 index:index,
                 content:this.notepad[index].content,
                 id:this.notepad[index].id
             }
             this.$refs.content.focus();//this.$refs.content获取输入框部分<input type="text" v-model="info.content" ref="content" @keyup.enter="editData">
        },
        showDialog(index,id){
             this.$emit('delevent',index,id);
        }
    }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .event_all{
        position: fixed;
        width: 100%;
        // height: 100%;
        top: 70px;
        bottom: 0;
        transform: translateX(-100%);
        transition: transform .5s;
        overflow-y: scroll;
        background: #fff;
        &.event_all_show{
            transform: translateX(0);
        }
        &::-webkit-scrollbar{
            width: 0;
        }
        .table_box{
            width: 100%;
            max-width: 1000px;
            padding: 20px 5px 70px;
            margin: auto;
            box-sizing: border-box;
            .edit_input{
                position: fixed;
                top: 0;
                right: 5px;
                left: 5px;
                max-width: 1000px;
                margin:auto;
                height: 60px;
                padding: 10px 100px 10px 10px;
                box-sizing: border-box;
                z-index: 10;
                transform: translateY(-260px);
                transition: transform .3s;
                background: #f3f3f3;
                border:1px solid #eee;
                border-radius: 4px;
                &.edit_input_show{
                    transform: translateY(0);
                }
                input{
                    float: left;
                    width: 100%;
                    height: 40px;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                }
                button{
                    //background: black;
                    position: absolute;
                    right: 10px;
                    width: 80px;
                    height: 40px;
                    color: #fff;
                    border: 0;
                }
            }
            .screen_box{
                position: relative;
                padding: 0 0 10px 95px;
                height: 35px;
                .div_select{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 85px;
                    height: 35px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border: 1px solid #eee;
                    font-size: 12px;
                    color: #999;
                    cursor:pointer;
                    &::after{
                        position: absolute;
                        right: 6px;
                        top: 12px;
                        width: 6px;
                        height: 6px;
                        content: '';
                        border-right: 1px solid #999;
                        border-bottom: 1px solid #999;
                        transform: rotate(45deg);
                    }
                }
                .div_value{
                    line-height: 35px;
                }
                .div_select_body{
                    position: absolute;
                    left: 0;
                    top: 38px;
                    width: 85px;
                    height: 0;
                    padding-left: 10px;
                    line-height: 30px;
                    box-sizing: border-box;
                    overflow: hidden;
                    z-index: 10;
                    box-shadow: none;
                    border:none;
                    border-radius: 3px;
                    background: #fff;
                    transition: all .3s;
                }
                .active{
                        height: 122px;
                        border: 1px solid #eee;
                        box-shadow: 0 0 1px #ddd;
                    }
                .div_search{
                    width: 100%;
                    height: 35px;
                    line-height: 25px;
                    padding: 5px 10px;
                    box-sizing:border-box;
                    border: 1px solid #eee;
                    font-size: 12px;
                    font-family: Arial,'Microsoft YaHei';
                    color: #999;
                }
            }
            .event_table{
                width: 100%;
                padding: 0;
                border-left: 1px solid #eee;
                border-top: 1px solid #eee;
                border-spacing: 0px;//相邻边框间隔
                td,th{
                    position: relative;
                    height: 40px;
                    min-width: 0;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    // text-overflow: ellipsis;
                    vertical-align: middle;
                    border: {
                        right: 1px solid #eee;
                        bottom: 1px solid #eee;
                    }
                    //text-align:center;
                }
                button{
                    padding: 3px 7px;
                    font-size: 12px;
                    color: #fff;
                    border: 0;
                    margin: 0 3px 3px 0;
                    //background: black;
                    &.del_btn{
                        background: #f57067 !important;
                    }
                }
            }
        }
    }
</style>