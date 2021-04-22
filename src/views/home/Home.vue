<template>
  <div
    style="width: 100%;height: 100%;"
    class="layout-center"
  >

    <div style="width: 900px;height: 460px;border: 1px solid #2d2d2d;border-radius: 5px;"
         class="layout-left-top">
      <div
        style="width: 230px;height: 100px;border: 1px solid #2d2d2d;margin: 30px;border-radius: 10px;"
        class="layout-center"
        v-for="(item,index) in indexLsit"
        :key="index"
        @click="gotoTheModlue(item)"
      >
        <div style="font-size: 30px;">{{item.name}}</div>
      </div>
    </div>


  </div>
</template>
<script>


  export default {
    data() {
      return {
        indexLsit: [
          {
            name: '系统设置',
            path: '/index/setting'
          },
          {
            name: '财务管理',
            path: '/index/moneyManage'
          },
          {
            name: '线上考试',
            path: '/index/onlineExam'
          },
          {
            name: '流程审批',
            path: '/index/processApproval'
          }
        ]
      };
    },
    methods: {
      gotoTheModlue(item){
        this.$router.push(item.path)
      }
    }
  };
</script>