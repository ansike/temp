<template>
    <div class="ud-body" v-loading="loading">
        <div class="breadcrumb-box">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ name:'classlist' }">我的学生</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ name:'studentdetail', query:{classId:classId}  }">{{this.$route.query.className}}</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.query.unitName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <template v-for="(item, $key) in data.arrExam">
                <el-tab-pane :label="item.name" :name="'tab'+$key">
                    <TabComponent :data="item.data" />
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>
<script>
var qs = require('qs');
const TabComponent = resolve => require(['./components/tabcomponent.vue'],resolve);
export default{
    data(){
        return{
            activeName: 'tab0',
            data:[],
            loading: true,
            classId:'',
            unitId:'',
        }
    },
    created(){
        if(this.$route.query){
            this.classId = this.$route.query.classId;
            this.unitId = this.$route.query.unitId;
        }
        this.initData();
    },
    mounted(){
        console.log(11)

    },
    methods:{
        initData(){
            var self = this;
            this.axios.get(this.URL_PREFIX+'/desktc/student/answerdetaildata?classId='+this.classId+'&unitId='+this.unitId).then((res) => {
                let data = res.data;
                if(data.errNo==0){
                    this.data = data.data;
                    this.loading = false;
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
        TabComponent
    }
}
</script>
<style lang="less">
    @import url('../../style/common.less');
</style>