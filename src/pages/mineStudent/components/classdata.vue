<template>
    <el-table
      :data="data"
      stripe
      size="mini"
      style="width: 100%">
      <el-table-column
        align="center"
        label="Unit"
        type="index"
        :index="computedIndex"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="unitName"
        label="Unit名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="startTime"
        label="开播时间">
      </el-table-column>
      <el-table-column
        align="center"
        prop="operator"
        label="Unit状态">
        <template slot-scope="scope">
            <span v-if="scope.row.status==0">未开课</span>
            <span v-else-if="scope.row.status==1">上课中</span>
            <span v-else-if="scope.row.status==2">已结课</span>
        </template>    
      </el-table-column>
      <el-table-column
        align="center"
        width="240"
        label="操作">
        <template slot-scope="scope">
          <template v-if="scope.row.status != 0">
              <button class="fz-btn green-btn" @click="checkItem(scope.row)">查看</button>
          </template>
          <template v-else>
              <button class="fz-btn disable-btn" disabled >查看</button>
          </template>
        </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    props:["data","className","classId"],
    created(){

    },
    methods:{
        computedIndex(index){
            return "Unit"+(++index);
        },
        checkItem(val){
          this.$router.push({name:'unitdetail',query:{'classId':this.$props.classId,'unitId':val.unitId, 'className':this.$props.className,'unitName':val.unitName}})
        }
    }
}
</script>