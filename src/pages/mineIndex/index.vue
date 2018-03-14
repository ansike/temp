<template>
  <div class="index-wrap">
    <notice/>
    <div class="relative-box">
      <lesson/>
      <calendar/>
    </div>
  </div>
</template>

<script>
import notice from './notice/notice';
import lesson from './lesson/lesson';
import calendar from './calendar/calendar';

export default {
  name: 'index',
  data () {
    return {
    };
  },

  mounted(){
  },

  components: {
    notice,
    lesson,
    calendar
  }
};
</script>

<style lang="less" scoped>
.home .subfield-right .index-wrap {
  padding: 0;
  background: #f8f8f8;
  overflow-y: auto;

  .relative-box{
    position: relative;
    min-height: 420px;
  }
}
</style>
