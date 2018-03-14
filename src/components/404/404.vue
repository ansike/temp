<template>
    <div class="notFond">
        <h1>404</h1>
        <p>页面路径出错了，点击<router-link to="/">回到首页</router-link></p>
    </div>
</template>
<style lang="less">
@import url('../../style/variable.less');
    .notFond{
        text-align: center;
        &>h1{
            margin-top: 300px;
            font-size: 50px;
            color: @color-main;
        }
        &>p{
            &>a{
                color: @color-main;
            }
        }
    }
</style>