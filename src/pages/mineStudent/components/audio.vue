<template>
  <div class="audio-body">
      <lazy-component >
        <audio type="audio/mpeg">
          <source :src="audioUrl">
         您的浏览器不支持 audio 标签。
        </audio>
      </lazy-component>
      <span class="horn" :class="{'playing' : status=='暂停' ? true : false}"></span>
  </div>                    
</template>
<script>
export default{
    data(){
        return{
          status:'播放'
        }
    },
    props:['audioUrl'],
    created(){
    },
    mounted(){

    },
    methods:{
        plays(){
          let that = this;
          let audio = this.$el.querySelector("audio")
          if(audio.paused){
            //解决双点之后可能的报错
            setTimeout(function () {
              audio.play(); 
            },96)
            this.status = '暂停';
            let timer = null;
            timer = setTimeout(function () {
              that.status = '播放';
            },parseInt(audio.duration*1000));
          }else{
            audio.pause(); 
            this.status = '播放';
          }
        },
        handler (component) {
          console.log('this component is showing')
        }
    },

}
</script>
<style lang="less">
@import url(../../../style/variable.less);
    .audio-body{
      width: 20px;
      display: inline-block;
      text-align: left;
      position: relative;
    }
    .horn{
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      background: url(../resource/3.png) no-repeat center center;
      background-size: cover;
    }
    .playing{
      background: url(../resource/1.gif) no-repeat center center;
      background-size: cover;
    }

</style>