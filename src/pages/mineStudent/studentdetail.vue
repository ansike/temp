<template>
    <div class="sd-body">
        <div class="breadcrumb-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ name:'classlist' }">我的学生</el-breadcrumb-item>
              <el-breadcrumb-item>{{data.classInfo.className}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sd-top">
            <p class="sd-h2">{{data.classInfo.className}}</p>
            <p class="sd-h4">{{data.classInfo.courseName}}</p>
            <p class="sd-txt">{{data.classInfo.time}}&nbsp;&nbsp;&nbsp;已上{{data.classInfo.finishUnit}}个Unit，共{{data.classInfo.unitTotal}}个Unit</p>
        </div>
        <div class="sd-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="课节数据" name="first">
                    <ClassData :data = "data.unitList" :classId="classId" :className="data.classInfo.className" />   
                </el-tab-pane>
                <el-tab-pane label="综合数据" name="second">
                    <Comprehensive :data="data.aggregateList"  />   
                </el-tab-pane>
              </el-tabs>
        </div>
    </div>
</template>
<script>
const ClassData = resolve=>require(['./components/classdata'],resolve);
// const Comprehensive = resolve=>require(['./components/comprehensive'],resolve);
import Comprehensive from'./components/comprehensive';
export default{
    data(){
        return{
            data:{
                classInfo:{},
                unitList:[],
                aggregateList:[],
                unitTotal:0,
            },
            activeName: 'first',
            classId:'',
        }
    },
    created(){
        if(this.$route.query){
            this.classId = this.$route.query.classId
        }
        this.initData();
    },
    mounted(){
    },
    methods:{
        initData(){
            var self = this;
            this.axios.get(this.URL_PREFIX+'/desktc/student/answerdata?classId='+this.classId,).then((res) => {
                let data = res.data;
                if(data.errNo==0){
                    this.data = data.data;
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