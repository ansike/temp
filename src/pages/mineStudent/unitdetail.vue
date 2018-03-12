<template>
    <div class="ud-body" v-loading="loading">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <template v-for="(item, $key) in data">
                <el-tab-pane :label="item.name" :name="'tab'+$key">
                    <TabComponent :data="item.data" />
                </el-tab-pane>
            </template>
        </el-tabs>
    </div>
</template>
<script>
const TabComponent = resolve => require(['./components/tabcomponent.vue'],resolve);
export default{
    data(){
        return{
            activeName: 'tab0',
            data:[],
            loading: true,
        }
    },
    created(){
        this.initData();
    },
    mounted(){

    },
    methods:{
        initData(){
            var self = this;
            this.axios.get('/misfz/task/unitdetail').then((res) => {
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
    
</style>