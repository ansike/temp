<template>
    <div class="classlist">
        <div class="cl-panel" v-for="item in list">
            <p class="cl-h4">{{item.className}}</p>
            <p class="cl-h6">{{item.courseName}}</p>
            <p class="cl-txt">{{item.time}}</p>
            <p class="cl-txt">已上{{item.finishUnit}}个Unit，共{{item.unitTotal}}Unit</p>
            <p class="cl-btn">
                <button class="fz-btn green-btn" >学生报告</button>
                <button class="fz-btn green-btn" @click="studentData()">学生数据</button>
            </p>
        </div>
    </div>
        <!-- <div style="height:100px">
            <audio class="success" 
           src="https://charge.zuoyebang.cc/flipped_1d7ea3c10ace85a6e937e9eaec010731.mp3?authorization=bce-auth-v1%2F80054b2251d24cb98eda994c93426d7d%2F2018-03-07T09%3A20%3A28Z%2F1800%2Fhost%2F1f870bac5906598839f1048c9e823258df89dce797ee00cbc3c183cf18fdb4c0"
            controls>
           您的浏览器不支持 audio 标签。
            </audio>
        </div> -->
</template>
<script>
export default{
    data(){
        return{
            list: [
                {
                    "classId":1,
                    "className": "testweqweqweq",
                    "courseName": "testasdasd",
                    "time": "2018-02-12 到 2018-03-12 每周五18:00-19:00",
                    "finishUnit": "3",
                    "unitTotal": "3",
                },
                {
                    "classId":2,
                    "className": "test2",
                    "courseName": "test2",
                    "time": "2018-02-12",
                    "finishUnit": "3",
                    "unitTotal": "3",
                },
                {
                    "classId":2,
                    "className": "test2",
                    "courseName": "test2",
                    "time": "2018-02-12",
                    "finishUnit": "3",
                    "unitTotal": "3",
                },
                {
                    "classId":2,
                    "className": "test2",
                    "courseName": "test2",
                    "time": "2018-02-12",
                    "finishUnit": "3",
                    "unitTotal": "3",
                }
            ]
        }
    },
    mounted(){

    },
    methods:{
        studentData(val){
            this.$router.push({name:'studentdetail'})
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
                margin-bottom: 8px;
            }
            .cl-h6{
                font-size: @font-14;
                font-weight: 500;
                margin-bottom: 8px;
            }
            .cl-txt{
                font-size: @font-12;
                margin-bottom: 6px;
            }
            .cl-btn{
                margin-top: 40px;
                font-size: @font-12;
                text-align: right;
            }
        }
    }
</style>