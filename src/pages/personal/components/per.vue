<template>
    <div class="per-body">
        <p class="per-title">个人信息</p>
        <p class="per-detail">
            <span>昵称：小王</span>
            <span>授课账号：8132798173</span>
        </p>
        <div class="teach-time-box">
            <span>授课时间：</span>
            <ul class="per-time-list">
                <li v-for="item in timeList">
                    {{item.date}}&nbsp;{{item.time}}
                </li>
            </ul>
            <i class="el-icon-edit" @click="edit"></i>
        </div>
        <el-dialog
          title="编辑授课时间"
          :visible.sync="dialogVisible"
          width="600px"
          center
          :close-on-click-modal="false"
          :before-close="handleClose">
            <el-form :inline="true" :model="timeData" class="dialog-list" ref="timeForm">
                <span class="colorMain">温馨提示：</span><span>
                添加授课时间时，请选择时间段时长大于等于1小时，小于2小时，以方便教务进行排课。</span>
                <p style="text-align:right"><button class="fz-btn green-btn" @click="addItem">增加</button></p>
                <br />
                <div v-for="(items,index) in timeData.editList" class="dl-child">
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <el-form-item label="日期"
                        :prop="'editList.' + index + '.date'"
                        :rules="{ required: true, message: '日期不能为空', trigger: 'change'}" >
                        <el-select 
                            size="mini" 
                            v-model="items.date" 
                            placeholder="请选择">
                            <el-option
                              v-for="item in timeData.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    &nbsp; &nbsp; &nbsp;
                    <el-form-item label="时间" 
                        :prop="'editList.' + index + '.time'"
                        :rules="[{ required: true, message: '时间不能为空', trigger: 'blur'},
                                { validator:validatTime, message: '必须大于一个小时，小于两个小时！', trigger: 'blur'}]">
                        <el-time-picker
                            size="mini"
                            is-range
                            v-model="items.time"
                            format="HH:mm"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            placeholder="选择时间范围">
                        </el-time-picker>
                    </el-form-item>
                    <el-button type="text" @click="deleteItem(index)">删除</el-button>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('timeForm')">保&nbsp;&nbsp;存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            timeList:[
                {
                    "date":"每周二",
                    "time":"17:00-19:00"
                },
                {
                    "date":"每周三",
                    "time":"17:00-18:00"
                },
                {
                    "date":"每周四",
                    "time":"12:00-14:00"
                }
            ],
            timeData:{
                editList:[
                ],
                options:[
                    {
                        value: '每周一',
                        label: '每周一'
                    },{
                        value: '每周二',
                        label: '每周二'
                    },{
                        value: '每周三',
                        label: '每周三'
                    },{
                        value: '每周四',
                        label: '每周四'
                    },{
                        value: '每周五',
                        label: '每周五'
                    },{
                        value: '每周六',
                        label: '每周六'
                    },{
                        value: '每周日',
                        label: '每周日'
                    }
                ]
            },
            dialogVisible: false
        }
    },
    created(){
        this.init();
    },
    mounted(){

    },
    methods:{
        init(){
            let that = this;
            that.editList = [];
            this.timeList.reduce((prev, cur, index, arr)=>{
                let now = new Date();
                let time = cur.time.split("-");
                let time1 = now.setHours(time[0].split(":")[0], time[0].split(":")[1], 0, 0);
                let time2 = now.setHours(time[1].split(":")[0], time[1].split(":")[1], 0, 0);
                let temp = {
                    date:cur.date,
                    time:[time1,time2],
                }
                that.timeData.editList.push(temp);
            },{})
        },
        submitForm(formName){
            let that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    let beData = that.timeData.editList;
                    let data = that.dealData(beData);
                    debugger
                    console.log('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重新处理时间
        dealData(val){
            let temp = [];
            val.reduce((prev,cur,index,arr)=>{
                let date = new Date(cur.time[0]);
                let str = (date.getHours() < 10 ? "0"+date.getHours() : date.getHours())+':';
                str += date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
                date = new Date(cur.time[1]);
                str += "-" + (date.getHours() < 10 ? "0"+date.getHours() : date.getHours())+':';
                str += date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
                let obj = {
                    date: cur.date,
                    time: str
                }
                temp.push(obj);
            },{})
            return temp;
        },
        //校验时间
        validatTime(rule, value, callback){
            let len = value[1]-value[0];
            if(len >= 3600000 && len <=7200000){
                callback()
            }else{
                callback('时间必须大于一个小时，小于两个小时')
            }
        },
        edit(){
            this.dialogVisible = true;
        },
        addItem(){
            let temp = {
                    date:'',
                    time:[0,0],
                }
            this.timeData.editList.push(temp);
        },
        deleteItem(val){
            this.timeData.editList.splice(val,1);
        },
        handleClose(done) {
            // this.$confirm('确认关闭？')
            //   .then(_ => {
                done();
            //   })
            //   .catch(_ => {});
        }
    },
    components:{

    }
}
</script>
<style lang="less">
@import url('../../../style/common.less');
.per-body{
    overflow-y:auto;
    .el-icon-edit{
        font-size: 16px;
        &:hover{
            cursor: pointer;
            color: @color-main
        }
    }
    .el-dialog__body{
        padding: 30px 20px 0;
        max-height: 400px;
        overflow-y:auto;
        .dialog-list{
            min-height: 100px;
            .dl-child{
                margin-bottom: 10px;
                .el-select{
                    width: 100px;
                }
            }
        }
        .el-date-editor--timerange.el-input__inner{
            width: 200px;
            .el-range-input{
                width: 30%;
            }
        }
    }
}
.per-title{
    font-size: 26px;
    margin-bottom: 30px;
}
.per-detail{
    margin-bottom: 20px;
    overflow: hidden;
    &>span{
        width: 50%;
        float: left;
    } 
}
.teach-time-box{
    line-height: 30px;
    .per-time-list{
        display: inline-block;
        width: 200px;
        vertical-align: top;
    }
}
</style>