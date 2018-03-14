<template>
    <div class="home">
        <div class="subfield-left">
          <leftMenu/>
        </div>
        <div class="subfield-right">
          <router-view/>
        </div>
    </div>
</template>
<script>
import leftMenu from '../../components/leftMenu/leftmenu';
export default {
  components: {
    leftMenu
  },
  mounted(){
    // if(location.href.match(/\?ticket\=[a-z0-9]+/g)){ 
    //   window.location.href=location.href.replace(/\?ticket\=[a-z0-9]+/g,'') 
    // }
    if(location.href.match(/\?.*\#\//g)){ 
      window.location.href=location.href.replace(/\?.*\#\//g,'#/') 
    }
  }
};

</script>
<style lang="less">
  @import "../../style/reset.less";
  @import "../../style/variable.less";
  body{
    /*background: #f8f8f8*/
  }
  .home{
    box-sizing: border-box;
    height: 100%;
      // height: calc(~"100% - 40px");
    .subfield-left{
      box-sizing: border-box;
      width: 130px;
      height: 100%;
      padding: 20px 10px;
      margin-bottom: 20px;
      box-shadow:0 0 8px 0 rgba(0,0,0,0.08);
      // background-color: @color-white;
      position:fixed;
      left:0;
      top:0px;
      z-index: 102;
      background:white;
    }
    .subfield-right{
      box-sizing: border-box;
      padding: 20px 20px 0 150px;
      width: 100%;
      height:100%;
      overflow-y: hidden;
      position: relative;
      background-color: #f8f8f8;
        
    }
  }
</style>