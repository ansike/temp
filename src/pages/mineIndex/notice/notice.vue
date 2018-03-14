<template>
  <div class="index-notice">
    <div class="top-wrap">
      <div v-if="isShowAll" @click="showAllNote" class="cloze-all">{{allNoteTip}}</div>
      <p class="top-title">通知</p>
    </div>
    <div class="list-wrap">
      <transition-group name="fadelist">
        <div v-for="(item, index) in noteList" v-if="index > (showCount-1)? showNote:true" class="item-wrap"
             :key="index">
          <div class="item-title" @click="closeOrOpen(index)">
            <span class="title">{{item.title}}</span>
            <span class="time">{{item.createTime}}</span>
            <span class="cloze-one">{{item.showTip}}<span class="arrow" :class="item.isShow?'arrow-close':'arrow-open'"></span></span>
          </div>
          <transition name="fadeitem">
            <p v-if="item.isShow" class="item-content">{{item.description}}</p>
          </transition>
        </div>
      </transition-group>
    </div>

    <div v-if="nodata" class="no-data">暂无数据哦~</div>
  </div>
</template>

<script>
  export default {
    name: 'notice',

    data () {
      return {
        showNote: false,
        allNoteTip: '查看更多',
        isShowAll: false,       //控制'查看全部'按钮的显隐
        showCount: 5,           //首屏显示公告的条数
        nodata: false,
        noteList: [],
        lectureConfig: {        //该功能属于通知类，应从后端取，由于主讲端已上线，故加临时解决方案后续需优化 2017/12/18 modified by Chuxueyang
          "lectureNotes": 0,
          "isShow": false,
          "showTip": "展开"
        }
      };
    },

    created: function () {
      this.refresh();
    },

    methods: {
      closeOrOpen: function (index) {
        var item = this.noteList[index];
        item.isShow = !item.isShow;
        item.showTip = (item.isShow) ? '收起' : '展开';
      },

      showAllNote: function () {
        this.showNote = !this.showNote;
        this.allNoteTip = (this.showNote) ? '收起' : '查看全部';
      },

      refresh: function () {
        var self = this;
        this.axios.get(this.URL_PREFIX + '/misfz/task/notice?rn=30').then((response) => {
          var res = response.data;
          if (res.errNo == 0) {
            if (res.data && res.data.list && res.data.list.length) {
              var dataList = res.data.list;
              for (var i = 0; i < dataList.length; i++) {
                dataList[i]['isShow'] = false;
                dataList[i]['showTip'] = '展开';
              }
              self.isShowAll = (dataList.length > self.showCount) ? true : false;
              self.noteList = dataList;
              self.nodata = false;
            } else {
              self.nodata = true;
            }
          } else {
            self.$message({
              type: "error",
              message: res.errstr
            })
          }
        });
      } 
    },

    computed: {
      
    }
  };
</script>

<style lang="less">
  @import "../../../style/variable.less";
  @font-small: 12px;
  @font-middle: 14px;
  @font-title: 24px;

  .index-notice {
    margin-bottom: 12px;
    padding: 30px 20px 20px;
    min-width: 830px;
    background-color: #fff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    color: @color-title;
    font-size: 12px;

    .top-wrap {
      .top-title {
        margin: 0 0 20px;
        font-size: @font-title;
        line-height: @font-title;
      }
    }

    .item-wrap {
      margin-bottom: 10px;

      .item-title {
        cursor: pointer;
        .title {
          display: inline-block;
          width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .item-content {
        color: @color-content-light;
        height: 42px;
        line-height: 32px;
        overflow: hidden;
        .lecture-count {
          padding: 0 3px;
          color: @color-orange;
        }
        .lecture-btn {
          color: @color-main-light;
          cursor: pointer;
        }
      }
    }

    .fadeitem-leave-active, .fadeitem-enter-active {
      transition: all .2s ease;
    }

    .fadeitem-leave-active, .fadeitem-enter {
      height: 0px !important;
      opacity: 0;
    }

    .fadelist-leave-active, .fadelist-enter-active {
      transition: all .2s ease;
    }

    .fadelist-leave-active, .fadelist-enter {
      opacity: 0;
    }

    .time {
      display: inline-block;
      margin-left: 10px;
      width: 140px;
    }

    .cloze-one,
    .cloze-all {
      color: @color-main-light;
      cursor: pointer;
    }

    .cloze-all {
      float: right;
      margin: -6px 0 0 0;
      font-size: @font-middle;
    }

    .arrow {
      display: inline-block;
      width: 8px;
      height: 5px;
      vertical-align: middle;
      margin-left: 5px;
    }

    .arrow-open {
      background: url("img/open.png");
      background-size: cover;
    }

    .arrow-close {
      background: url("img/close.png");
      background-size: cover;
    }

    .no-data {
      margin: 30px 0 10px;
      text-align: center;
      color: #aaa;
    }
  }
</style>
