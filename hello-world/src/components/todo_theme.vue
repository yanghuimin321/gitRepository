<template>
    <div class="theme" :class="{'theme_show':isShow}">
        <div class="theme_box">
            <div class="theme_title">点击切换主题颜色</div>

            <div class="theme_content">
                <ul>
                    <li @click="selectTheme('blue')">
                        <span style="background:#00b0f0"></span>#00b0f0
                    </li>
                    <li @click="selectTheme('green')">
                        <span style="background:#00d1b2"></span>#00d1b2
                    </li>
                    <li @click="selectTheme('orange')">
                        <span style="background:#f4b976"></span>#f4b976
                    </li>
                    <li @click="selectTheme('pink')">
                        <span style="background:#f39894"></span>#f39894
                    </li>
                    <li @click="selectTheme('cyan')">
                        <span style="background:#26b6be"></span>#26b6be
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data:function(){
        return {}
    },
    props:['isShow'],
    methods:{
        selectTheme(color){
            //console.log(color);
            this.$store.dispatch('selectTheme',color);
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .theme{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 230px;
        padding: 100px 20px 30px;
        box-sizing: border-box;
        transform: translateX(-250px);
        transition: transform .3s;
        background:  rgba(0,0,0,.5);
        //z-index:9;
        &.theme_show{
            transform: translateX(0);
        }
        .theme_box{
            width: 100%;
            padding: 0 10px;
            margin: auto;
            box-sizing: border-box;
        }
        .theme_title{
            margin: 0 0 20px;
            font-size: 20px;
            color:#fff;
        }
        .theme_content{
            //text-align: center;
            li{
                position: relative;
                width: 70px;
                height: 36px;
                line-height: 36px;
                padding-left: 36px;
                border:1px solid #aaa;
                border-radius: 3px;
                cursor: pointer;
                margin: 0 auto 10px;
                background: #fff;
                span{
                    position: absolute;
                    left: 8px;
                    top: 8px;
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>