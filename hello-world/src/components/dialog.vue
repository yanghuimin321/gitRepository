<template>
    <div class="dialog">
        <div class="dialog_wrapper">
            <div class="dialog_header"><span>提示</span></div>

            <div v-if="msg!=='upload'" class="dialog_content">{{msg}}</div>
            <div v-else class="dialog_content">
                <input type="file" accept=".txt" @change="upload">
                <p>只允许上传由侧边栏下载的notepad.txt文件</p>
                <p v-if="up_success">数据读取成功，是否确定导入？</p>
                <p v-if="up_error">上传失败，只允许notepad.txt文件</p>
            </div>

            <div class="dialog_footer">
                <button type="button" class="cancel_btn" @click="cancelEvent">取消</button>

                <button v-if="msg!=='upload'" type="button" class="sure_btn" @click="sureEvent">确定</button>
                <button v-else type="button" class="sure_btn" @click="sureUpload">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            up_success:false,
            up_error:false,
            events:''
        }
    },
    props:['msg'],
    methods:{
        upload(event){
            const self=this;
            //console.log(event);
            const files=event.srcElement.files;
            const reader=new FileReader();

            if(files[0]&&files[0].name.indexOf('notepad')!==-1){
                reader.onload=function(event1){
                    self.up_error=false;
                    self.up_success=true;
                    self.events=event1.target.result;
                }
                reader.readAsText(files[0]);
            }
            else{
                self.up_success=false;
                self.up_error=true;
            }
        },
        cancelEvent(){
            this.$emit('cancel');
        },
        sureEvent(){
            this.$emit('sure');
        },
        sureUpload(){
            if(this.up_success){
                this.$store.dispatch('uploadevent',this.events);
                this.cancelEvent();
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .dialog{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
        background: rgba(0,0,0,0.4);
        z-index:999;
        .dialog_wrapper{
            position: absolute;
            left: 50%;
            top: 20%;
            width: 96%;
            max-width: 400px;
            margin: 0 auto;
            transform: translateX(-50%);
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,.3);
            box-sizing: border-box;
            animation: dialog .5s;//
        }
        .dialog_header{
            padding: 20px 20px 0;
        }
        .dialog_content{
            padding: 30px 20px;
            color: #475669;
            font-size: 18px;
            text-align: center;
            p{
                font-size: 14px;
                margin-top: 10px;
            }
        }
        .dialog_footer{
            padding: 10px 20px 15px;
            text-align: right;
            button{
                font-size: 14px;
            }
            .cancel_btn{
                width: 50px;
                background: #fff;
                border: 1px solid #c0ccda;
                color: #1f2d3d;
            }
            .sure_btn{
                width: 50px;
                margin-left: 5px;
                color: #fff;
                //background: black;
                transition: background .3s ease-in;
            }
        }
    }
    @keyframes dialog{
        from{
            top: 15%;
        }
    }
</style>