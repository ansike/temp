<template>
  <transition name="fade">
    <div class="index-lesson" v-if="isShow">
      <div @click="showCalendar" class="go-calendar">
        <span>日历</span>
        <span class="today">{{new Date().getDate()}}</span>
      </div>

      <h3 class="title">本周</h3>
      <p class="tip">本周共有<span style="color:#ff5e2c">&nbsp;{{lessonList.length}}&nbsp;</span>节课</p>

      <p v-for="(item, index) in lessonList" class="lesson-item">
        {{index+1}}、
        课程名称：<span class="item-data">{{item.courseName}}</span>
        班级名称：<span class="item-data">{{item.className}}</span>
        上课时间：<span class="item-data">{{item.time}}</span>
      </p>
      <div v-if="nodata" class="no-data">暂无数据哦~</div>
    </div>
  </transition>
</template>

<script>
import bus from '@/utils/eventBus/eventBus';

export default {
  name: 'indexLesson',

  data () {
    return {
      isShow: true,
      lessonList: [],
      nodata: false
    };
  },

  created: function() {
    this.initData();
  },

  mounted: function() {
    var self = this;
    bus.$on("showListEvent", function(data) {
      self.isShow = data;
    });
  },

  methods: {
    initData: function () {
      var self = this;
      self.axios.get(this.URL_PREFIX +'/desktc/course/mycourse').then((response) => {
        var res = response.data;
        if(res.errNo == 0 ) {
          if(res.data && res.data.list && res.data.list.length) {
            self.lessonList = res.data.list;
          } else {
            self.nodata = true;
          }
        } else {
          self.$message({
            type:"error",
            message:res.errstr
          })
        }
      });
    },

    showCalendar: function() {
      this.isShow = false;
      bus.$emit("showCalendarEvent", "true");
    }
  }
};
</script>

<style lang="less" scoped>
  @import '../../../style/variable.less'; //引入全局less文件
  @font-title: 24px;
  @font-small: 12px;
  @font-middle: 14px;
  @font-big: 16px;
  .index-lesson {
    position: absolute;
    padding: 30px 20px 20px;
    min-width: 830px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    color: @color-title;
    font-size: @font-small;
    line-height: 1;
    overflow: hidden;
    min-height: 320px;

    .go-calendar {
      float: right;
      width: 48px;
      height: 56px;
      margin-top: -10px;
      line-height: 23px;
      border-radius: 6px;
      box-shadow: 0 2px 10px 0 rgba(76,199,96,0.4);
      text-align: center;
      color: @color-main;
      cursor: pointer;

      .today {
        display: block;
        width: 40px;
        height: 30px;
        margin: 0 auto;
        border-radius: 2px;
        background: @color-main;
        line-height: 30px;
        font-size: @font-big;
        color: #fff;
      }
    }

    .title {
      margin: 0 0 10px;
      font-size: @font-title;
    }

    .tip {
      margin-bottom: 16px;
      color: @color-content-light;
    }

    .no-data {
      margin: 30px 0 10px;
      text-align: center;
      color: #aaa;
    }

    .lesson-item {
      margin-bottom: 8px;
      color: #666;

      .item-data {
        margin-right: 12px;
        font-weight: bold;
        color: @color-title;
      }
    }
  }

  .fade-leave-active,.fade-enter-active{
    transition: all .6s ease;
  }

  .fade-leave-active,.fade-enter{
    opacity: 0;
  }
</style>
