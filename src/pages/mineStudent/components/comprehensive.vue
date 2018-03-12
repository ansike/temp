<template>
    <el-table
      :data="data"
      stripe
      size="mini"
      style="width: 100%">
        <el-table-column
        align="center"
        :prop="tableColum.column"
        label="学生姓名"
        width="80">
        </el-table-column>
        <template v-for="(items,$key) in tableColum.data">
          <el-table-column
            align="center"
            type="index"
            :label="computedUnit($key)"
            width="80">
                <el-table-column
                  align="center"
                  label="课前挑战"
                  :prop="items.before"
                  width="80">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="课后挑战"
                  :prop="items.after"
                  width="80">
                </el-table-column>
          </el-table-column>
        </template>
    </el-table>
</template>
<script>
export default{
    data(){
        return{
            tableColum:{
                column:'stuName',
                data:[] 
            }
        }
    },
    props:['data',],
    created(){
    },
    mounted(){
      this.initData();
      
    },
    methods:{
      initData(){
        if(!this.$props.data) return false;
        let num = this.$props.data[0].unitDetail.length;
        this.tableColum.data = [];
        for(let i = 0; i < num; i++){
          let data = {
              "before":"unitDetail["+i+"].before",
              "after":"unitDetail["+i+"].after"
          }
          this.tableColum.data.push(data);
        }
      },
      computedUnit(index){
          return 'Unit'+(++index)
      }
    }
}
</script>