<template>
    <div class="tool" :class="{'show-tools':isShow}">
        <ul class="sidebar">
            <li>
                <button class="btn" @click="openTheme()">切换主题</button>
            </li>
            <li>
                <button class="btn" @click="downloadData('notepad.txt',getData)">下载数据</button>
            </li>
            <li>
                <button class="btn" @click="uploadData()">导入数据</button>
            </li>
            <li>
                <button class="btn" @click="openTable()">编辑数据</button>
            </li>
            <li>
                <button class="btn" @click="clearData()">清空数据</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {};
    },
    props:['isShow'],
    computed:{
        getData(){
            //const self=this;
            return JSON.stringify(this.$store.state);
        }
    },
    methods:{
        openTheme(){
            this.$emit('opentheme');
        },
        downloadData(fileName,content){//通过超链接来下载文件，download规定下载后文件名称，href为下载链接。
            let aTag=document.createElement('a');
            let blob=new Blob([content]);//javascript中blob对象。
            aTag.download=fileName;
            aTag.href=URL.createObjectURL(blob);//URL.createObjectURL()会创建一个DOMString，包含了一个对象URL，该URL可用于指定源object的内容。
            aTag.click();
            URL.revokeObjectURL(blob);//每个对象必须通过调用方法来释放。
        },
        uploadData(){
            this.$emit('upload');
        },
        openTable(){
            this.$emit('opentable');
        },
        clearData(){
            this.$emit('clear');
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
    .tool{
        position:fixed;
        top:0;
        left:0;
        bottom: 0;
        width: 250px;
        padding: 100px 20px 30px;
        box-sizing: border-box;
        transform: translateX(-250px);
        transition: all .3s;
        text-align: center;
        background:  rgba(0,0,0,.5);
        font-size: 16px;
        // z-index:9;
        &.show-tools{
            transform: translateX(0);
        }
        .sidebar{
            &>li{
                line-height: 60px;
            }
        }
        .btn{
            //background: black;
            width: 100px;
            height: 40px;
            line-height: 26px;
            color:#fff;
            transition:background 3s ease-in;
        }
    }
</style>