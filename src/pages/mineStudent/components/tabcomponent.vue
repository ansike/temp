<template>
    <div class="tabc-body">
        <el-collapse v-model="activeName" accordion>
            <template v-for="(item, $key) in data">
                <el-collapse-item :title="($key+1)+'.一致性 Consistency'" :name="($key+1)+''" >
                  <lazy-component >
                      <div class="tabc-img-box" :style="{'background-image':'url('+item.qDetail[0].screenshot+')','background-size': 'contain','background-repeat': 'no-repeat','background-position': 'center center'}" ></div>
                  </lazy-component>
                  <div class="tabc-head">
                        <div class="tabc-answer" v-if="item.type==7">
                            <span >正确答案：</span>
                            {{$key}}
                            <SelfAudio class="selfaudio" :audioUrl="item.qDetail[0].audio" :ref="'selfaudio1'+$key" @click.native="play('selfaudio1'+$key)"></SelfAudio>
                        </div>
                        <div class="tabc-answer" v-else>
                            <span >正确答案：{{item.qDetail[0].answer}}</span>
                        </div>
                        <div class="tabc-correct">
                            <span>正确率：{{item.accuracy}}</span>
                        </div>
                  </div>
                  <div class="tabc-table">
                      <el-table
                        :data="item.stuDetail"
                        stripe
                        border
                        size="mini"
                        style="width: 100%">
                        <el-table-column
                          align="center"
                          label="学生姓名"
                          prop="stuName"
                          >
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="作答情况"
                          >
                            <template slot-scope="scope">
                                <span>{{scope.row.stuAnsewr}}</span>
                                <SelfAudio  class="selfaudio" :audioUrl="item.qDetail[0].audio" :ref="'selfaudio2'+$key+scope.$index" @click.native="play('selfaudio2'+$key+scope.$index)"></SelfAudio>
                            </template>
                        </el-table-column>
                      </el-table>
                  </div>
                </el-collapse-item>
            </template>
        </el-collapse>
    </div>
</template>
<script>
// const SelfAudio = resolve => require(['./audio.vue'],resolve);
import SelfAudio from './audio.vue';
export default{
    data(){
        return{
            activeName:['1'],
        }
    },
    props:['data'],
    created(){
    },
    mounted(){

    },
    methods:{
        play(val){
            this.$refs[val][0].plays();
        }
    },
    components:{
        SelfAudio
    }
}
</script>
<style lang="less">
@import url(../../../style/variable.less);
    .tabc-img-box{
        width: 100%;
        height: 100px;
        margin: 10px 0;
    }
    .tabc-answer{
        width: 50%;
        float: left;
        color: @color-main;
        .selfaudio{
            margin-left: 20px;
            cursor:pointer;
            display: inline-block;
        }
    }
    .tabc-correct{
        width: 50%;
        float: right;
        text-align: right;
        color: @color-main;
    }
</style>