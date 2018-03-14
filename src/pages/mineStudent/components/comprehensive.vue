<template>
    <el-table
      :data="data"
      stripe
      size="mini"
      style="width: 100%">
        <el-table-column
        align="center"
        prop="studentName"
        label="学生姓名"
        >
        </el-table-column>
        <template v-for="(items,$key) in listData">
          <el-table-column
            align="center"
            type="index"
            :label="computedUnit($key)"
            width="80">
                <el-table-column
                  align="center"
                  label="课前挑战"
                  :prop="items.before"
                  >
                </el-table-column>
                <el-table-column
                  align="center"
                  label="课后挑战"
                  :prop="items.after"
                  >
                </el-table-column>
          </el-table-column>
        </template>
    </el-table>
</template>
<script>
export default{
    data(){
        return{
        }
    },
    props:['data',],
    created(){
    },
    mounted(){
      // this.initData();
      
    },
    methods:{
      initData(){
       
      },
      computedUnit(index){
          return 'Unit'+(++index)
      }
    },
    computed:{
      listData(){
        let temp = [];
        let data = this.$props.data
        if(!data[0]) return false;
        let num = data[0].unitDetail.length;
        for(let i = 0; i < num; i++){
          let data = {
              "before":"unitDetail["+i+"].beforeClass",
              "after":"unitDetail["+i+"].afterClass"
          }
          temp.push(data);
        }
        return temp
      }
    }
}
</script>