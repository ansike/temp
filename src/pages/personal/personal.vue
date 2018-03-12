<template>
    <div class="per-body">
        <div class="per-info">
            <Per></Per>
        </div>
        <div class="per-income">
            <InCome></InCome>
        </div>
    </div>
</template>
<script>
const Per = resolve => require(['./components/per.vue'],resolve);
const InCome = resolve => require(['./components/income.vue'],resolve);

export default{
    data(){
        return{

        }
    },
    created(){

    },
    mounted(){

    },
    methods:{

    },
    components:{
        Per,
        InCome
    }
}
</script>
<style lang="less">
    .per-body{
        height: 100%;
        box-sizing: border-box;
        .per-info{
            padding: 20px;
            height:  calc(~"50% - 10px");
            box-sizing: border-box;
            background-color: white;
        }
        .per-income{
            height: calc(~"50% - 10px");
            padding: 20px;
            margin-top: 20px;
            box-sizing: border-box;
            background-color: white;

        }
    }
</style>