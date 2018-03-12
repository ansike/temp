<template>
    <div class="sd-body">
        <div class="sd-top">
            <p class="sd-h2">{{classInfo.className}}</p>
            <p class="sd-h4">{{classInfo.courseName}}</p>
            <p class="sd-txt">{{classInfo.time}}&nbsp;&nbsp;&nbsp;已上{{classInfo.finishUnit}}个Unit，共{{classInfo.unitTotal}}个Unit</p>
        </div>
        <div class="sd-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课节数据" name="first">
                    <ClassData :data = "unitList" />   
                </el-tab-pane>
                <el-tab-pane label="综合数据" name="second">
                    <Comprehensive :data="aggregateList"  />   
                </el-tab-pane>
              </el-tabs>
        </div>
    </div>
</template>
<script>
const ClassData = resolve=>require(['./components/classdata'],resolve);
const Comprehensive = resolve=>require(['./components/comprehensive'],resolve);
export default{
    data(){
        return{
            classInfo:{},
            unitList:[],
            aggregateList:[],
            activeName: 'first',
        }
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            var self = this;
            this.axios.get('/misfz/task/studentdetail').then((res) => {
                let data = res.data;
                if(data.errNo==0){
                    this.classInfo = data.data.classInfo;
                    this.unitList = data.data.unitList;
                    this.aggregateList = data.data.aggregateList;
                }else{
                    this.$message({
                        type: 'error',
                        message: res.data.errStr
                    });
                }
            });
        },
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    },
    components:{
        ClassData,
        Comprehensive
    }
}
</script>
<style lang="less">
@import url('../../style/common.less');
    .sd-body{
        .sd-h2{
            font-size: @font-18;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .sd-h4{
            font-size: @font-16;
            font-weight: 400;
            margin-bottom: 8px;
        }
        .sd-txt{
            font-size: @font-12;
            margin-bottom: 6px;
        }
        .sd-content{
            margin-top: 20px;
        }
    }
</style>