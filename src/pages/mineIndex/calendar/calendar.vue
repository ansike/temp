<template>
  <transition name="fade">
    <div class="calendar" v-if="isShow">
      <div class="close-wrap" @click="close"><span class="close"></span></div>

      <div class="cale-wrap">
        <div class="month">
          <div class="click-left" @click="pickPre(currentYear,currentMonth)">
            <span class=" arrow-left" :class="offsetMonth <= -leftMonth?'cant-left':''"></span>
          </div>
          <span class="year-month">{{currentYear}}年{{currentMonth}}月</span>
          <div class="click-right" @click="pickNext(currentYear,currentMonth)">
            <span class=" arrow-right" :class="offsetMonth >= rightMonth?'cant-right':''"></span>
          </div>
        </div>

        <ul class="weekdays">
          <li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>日</li>
        </ul>

        <ul class="days">
          <li v-for="(day, index) in days" :class="[(day.getMonth()+1 != currentMonth)?'other-month':'',(Date.parse(day) < today)?'oldDay':'',(Date.parse(day) == today)?'toDay':'']">
            <div @mouseover="showLesson(day, index, $event)" @mouseout="hideLesson" :class="dayClass(day)">
              <span class="days-num">{{ day.getDate()}}</span>
            </div>
          </li>
        </ul>
 
        <div v-if="isDailogShow" @mouseover="overDialog" @mouseout="hideLesson" class="lesson-list" :style="hoverPosition">
          <div v-for="(item, index) in lessonList" class="lesson-item">
            <div class="item-wrap"><p class="title">课程名称：</p><p class="item-text">{{item.courseName}}</p></div>
            <div class="item-wrap"><p class="title">班级名称：</p><p class="item-text">{{item.className}}</p></div>
            <div class="item-wrap"><p class="title">上课时间：</p><p class="item-text">{{item.time}}</p></div>
          </div>
          <div :class="{'dl-arrow-right':offsetColumn<=3,'dl-arrow-left':offsetColumn>3,'dl-arrow-down':offsetIndex>20}" ></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import bus from '@/utils/eventBus/eventBus';

  export default {
    name: 'calendar',
    data () {
      return {
        isShow: false,        //日历组件是否显示
        isDailogShow: false,  //悬停弹窗是否显示
        offsetX: 0,           //用于悬停弹窗的定位，x轴偏移量
        offsetY: 0,           //用于悬停弹窗的定位，y轴偏移量
        offsetColumn: 0,      //用于悬停弹窗的定位，当前鼠标悬停的日期的列数
        offsetIndex:0,

        currentYear: 1970,    //当前页，年
        currentMonth: 1,      //当前页，月
        currentWeek: 1,       //当前页，的1号是星期几
        days: [],             //当前月所有日期list
        dayList: {},          //接口返回的课程情况
        lessonList: [],       //鼠标悬停在有课日期时，显示的课程list数据

        offsetMonth: 0,       //日历左右翻月的偏移量
        leftMonth: 2,         //日历往左最多翻两页
        rightMonth: 2,        //日历往右最多翻两页
        today:''
      };
    },

    created: function () {
      this.fetchMonth(new Date().getFullYear(), new Date().getMonth() + 1);
      this.initData(this.formatDate(new Date().getFullYear(), new Date().getMonth() + 1, 1));
    },

    mounted: function() {
      var self = this;
      bus.$on("showCalendarEvent", function(data) {
        self.isShow = data;
      });
      var date = new Date();
      this.today = Date.parse(this.formatDate(date.getFullYear(),date.getMonth()+1,date.getDate()));
    },

    computed: {
      hoverPosition: function() {
        var dialogWidth = 350;      //弹窗宽度

        if(this.offsetColumn <= 3) {
          var left = this.offsetX + 90;
          var top = this.offsetY;
        } else {
          var left = this.offsetX - dialogWidth;
          var top = this.offsetY;
        }
        if(this.offsetIndex > 20){
          var line = Math.floor(this.offsetIndex / 7);
          var bottom = (5 - line) * 46;
          return "left:" + left + "px; bottom:" + bottom + "px";
        } else {
          return "left:" + left + "px; top:" + top + "px";
        }
      }
    },

    methods: {
      fetchMonth: function(year, month) {
        var self = this;
        var tempObj = {};

        self.axios.get(this.URL_PREFIX +'/desktc/course/CalendarInfo', {params: { month: year + '-' + month }}).then((response) => {
          var res = response.data;

          if(res.errNo == 0) {
            if(res.data && res.data.list){
              var dataList = res.data.list;
              //将后端返回的数据再次格式化，避免后端格式变化产生bug
              for(var item in dataList) {
                var tempDate = new Date(item);
                var resDate = self.formatDate(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate());
                tempObj[resDate] = dataList[item];
              }
              self.dayList = tempObj;
            }else{

            }
          }else{
            self.$message({
              type:"error",
              message:res.errstr
            })
          }
        });
      },

      dayClass: function(day) {
        var itemDate = this.formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate());
        if(this.dayList[itemDate]) {
          return "has-lesson ";
        }
      },

      close: function() {
        this.isShow = false;
        bus.$emit("showListEvent", "true")
      },

      showLesson: function(date, index, event) {
        var onedayWidth = 98;
        var onedayheight = 46;

        if (this.hasClass(event.currentTarget, 'has-lesson')) {
          //根据index计算当前日期距离父元素cale-wrap的偏移量
          this.offsetX = (index % 7) * onedayWidth;
          this.offsetY = parseInt(index / 7) * onedayheight + 72;
          this.offsetColumn = index % 7 + 1;
          this.offsetIndex = index;

          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          var d = date.getDate();
          this.lessonList = this.dayList[this.formatDate(y, m, d)];
          
          this.isDailogShow = true;
        }
      },

      overDialog: function() {
        this.isDailogShow = true;
      },

      hideLesson: function() {
        this.isDailogShow = false;
      },

      hasClass: function(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
      },

      initData: function(cur) {
        var firstDay = new Date(cur);                 // 当前页，当前月的1号
        this.currentYear = firstDay.getFullYear();
        this.currentMonth = firstDay.getMonth() + 1;
        this.currentWeek = firstDay.getDay();         // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        this.days.length = 0;

        // 初始化本月1号以前的day
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(firstDay);
          d.setDate(d.getDate() - i);
          this.days.push(d);
        }

        // 初始化本月1号以后的day
        for (var i = 1; i <= 42 - this.currentWeek; i++) {
          var d = new Date(firstDay);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
      },

      pickPre: function(year, month) {
        if(this.offsetMonth > -this.leftMonth) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(0);
          this.fetchMonth(d.getFullYear(), d.getMonth() + 1);
          this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));

          this.offsetMonth -= 1;
        }
      },

      pickNext: function(year, month) {
        if(this.offsetMonth < this.rightMonth) {
          var d = new Date(this.formatDate(year , month , 1));
          d.setDate(35);
          this.fetchMonth(d.getFullYear(), d.getMonth() + 1);
          this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));

          this.offsetMonth += 1;
        }
      },

      // 格式化日期：2016-01-02
      formatDate: function(year, month, day){
        var y = year;
        var m = month;
        if(m < 10) {m = "0" + m;} 
        var d = day;
        if(d < 10) {d = "0" + d;}
        return y + "-" + m + "-" + d;
      }
    }
  };
</script>

<style lang="less" scoped>
  @font-small: 12px;
  @font-middle: 14px;
  @font-big: 16px;
  @color-green:#34d718;
  @color-orange:#ff5e2c;
  @color-font:#373737;
  @color-light-font: #aaa;

  .calendar {
    position: absolute;
    padding: 20px;
    min-width: 830px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    color: @color-font;
    font-size: @font-small;
    text-align: center;

    .close-wrap {
      float: right;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .close {
      display: inline-block;
      margin-top: 8px;
      background: #aaa;
      font-size: 0;
      -webkit-transform: rotate(45deg);

      &:after {
        content: '/';
        display: block;
        width: 24px;
        height: 2px;
        background: #aaa;
        -webkit-transform: rotate(-90deg);
      }
    }

    .cale-wrap {
      position: relative;
      display: inline-block;
      width: 690px;
    }

    .month {
      width: 100%;
      height: 44px;
      display: flex;
      font-size: @font-big;
      justify-content:center;
    }

    .click-left {
      width: 100px;
      height: 100%;
      cursor: pointer;
      text-align: right;
      padding-right: 4px;
      margin-top: -2px;
    }

    .click-right {
      display: inline-block;
      width: 100px;
      height: 100%;
      cursor: pointer;
      text-align: left;
      padding-left: 4px;
      margin-top: -2px;
    }

    .arrow-left {
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-right: 8px solid @color-green;
      border-bottom: 4px solid transparent;
    }

    .arrow-right {
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 4px solid transparent;
      border-left: 8px solid @color-green;
      border-bottom: 4px solid transparent;
    }

    .cant-left {
      border-right-color: #bcbcbc;
    }

    .cant-right {
      border-left-color: #bcbcbc;
      cursor: not-allowed;
    }

    .weekdays {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      margin-bottom: 15px;
      color: #aaa;
    }

    .weekdays li {
      display: inline-block;
      width: 98px;
      text-align: center;
    }

    .days {
      padding: 0;
      background: #FFFFFF;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      font-size: 16px;
    }

    .days li {
      display: inline-block;
      width: 98px;
      height:46px;
      div {
        display: inline-block;
        width: 100%;
        height: 100%;
        line-height: 36px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        &:hover > .days-num {
          background: #efefef;
        }
      }

      .days-num {
        display: inline-block;
        width: 36px;
        height: 36px;
        border-radius: 100%;
      }

      .has-lesson {
        &:after {
          content: "";
          position: relative;
          width: 0px;
          display: block;
          height: 0px;
          border-radius: 4px;
          background: @color-orange;
          margin: -8px 0 0 47px;
          border: 2px solid #ff5e2c;
          color: #aaa;
        }
      }
      &.oldDay{
        .has-lesson {
          &:after {
            border-color:#bcbcbc;
          }
        }
      }
      &.toDay{
        .days-num{
          background: #4cc760;
          color: #ffffff;
        }
        .has-lesson {
          &:after {
            border-color: #ffffff;
          }
        }
      }
    }

    .other-month {
      color: @color-light-font;
    }
    .lesson-list {
      position: absolute;
      width: 370px;
      padding: 0 20px;
      // max-height: 225px;
      // overflow: auto;
      box-shadow:0 2px 6px 0 rgba(153,153,153,0.40);
      box-sizing: border-box;
      background: #fff;

      .dl-arrow-left {
        position: absolute;
        right: -10px;
        top: 14px;
        border-top: 8px solid transparent;
        border-left: 10px solid #e8e8e8;
        border-bottom: 8px solid transparent;

        &:after {
          content: "";
          position: absolute;
          left: -10px;
          top: -7px;
          border-top: 7px solid transparent;
          border-left: 9px solid #fff;
          border-bottom: 7px solid transparent;
        }
      }
      .dl-arrow-down {
        bottom: 24px;
        top: auto!important;
      }

      .dl-arrow-right {
        position: absolute;
        left: -10px;
        top: 14px;
        border-top: 8px solid transparent;
        border-right: 10px solid #e8e8e8;
        border-bottom: 8px solid transparent;

        &:after {
          content: "";
          position: absolute;
          right: -10px;
          top: -7px;
          border-top: 7px solid transparent;
          border-right: 9px solid #fff;
          border-bottom: 7px solid transparent;
        }
      }
    }


    .lesson-item {
      padding: 16px 0;
      overflow: hidden;
      border-bottom: 1px solid #f2f2f2;
      text-align: left;

      &:last-child {
        border: none;
      }

      .item-wrap {
        margin-bottom: 6px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .title {
        float: left;
        color: #aaa;
      }


      .item-text {
        padding-left: 60px;
        color: #333;
      }
    }
  }

  .fade-leave-active,.fade-enter-active{
    transition: all .8s ease;
  }

  .fade-leave-active,.fade-enter{
    opacity: 0;
  }
</style>
