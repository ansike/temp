<template>
    <div class="classlist">
        <div class="cl-panel" v-for="item in list">
            <p class="cl-h4">{{item.className}}</p>
            <p class="cl-h6">{{item.productName}}</p>
            <p class="cl-txt">{{item.time}}</p>
            <p class="cl-txt">已上{{item.finishUnit}}个Unit，共{{item.unitTotal}}Unit</p>
            <p class="cl-btn">
                <button class="fz-btn green-btn" >学生报告</button>
                <button class="fz-btn green-btn" @click="studentData(item.classId)">学生数据</button>
            </p>
        </div>
    </div>
</template>
<script>
var qs = require('qs');
export default{
    data(){
        return{
            list: []
        }
    },
    created(){
        this.init();
    },
    mounted(){

    },
    methods:{
        init(){
            this.axios.get(this.URL_PREFIX+'/desktc/student/classlist').then((res) => {
                let data = res.data;
                if(data.errNo==0){
                    this.list = data.data.list;

                }else{
                    this.$message({
                        type: 'error',
                        message: res.data.errStr
                    });
                }
            });
        },
        studentData(classId){
            this.$router.push({name:'studentdetail',query:{classId:classId}})
        }
    }
}
</script>
<style lang="less">
    @import url('../../style/common.less');
    .classlist{
        display: flex;
        flex-direction: row;
        align-items: space-around;
        flex-wrap: wrap;
        .cl-panel{
            width: 360px;
            padding: 20px;
            margin-right: 20px;
            margin-bottom: 20px;
            border-radius: 6px;
            background-color: @color-btn-disable;
            &>p{
            }
            .cl-h4{
                font-size: @font-16;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .cl-h6{
                font-size: @font-14;
                font-weight: 500;
                margin-bottom: 16px;
            }
            .cl-txt{
                font-size: @font-12;
                margin-bottom: 10px;
            }
            .cl-btn{
                margin-top: 30px;
                font-size: @font-12;
                text-align: right;
            }
        }
    }
</style>