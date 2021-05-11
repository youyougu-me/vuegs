<template>
  <div class="w100 h100">
    <a-modal
      v-model="isFuncRoleModal"
      title="功能权限"
      on-ok="handleOk"
      :maskClosable="false"
      :width="600"
    >
      <template slot="footer">
        <a-button key="back" @click="handleOk">
          确定
        </a-button>
        <a-button key="submit" type="primary" @click="handleCancel">
          取消
        </a-button>
      </template>
      <div class="w100 layout-side" style="height: 400px;">
        <div class="h100 border" style="width: 40%">
          <div class="layout-side" style="padding: 10px;">
            <a-button style="width: 50%;" type="primary">新增</a-button>
            <a-button style="width: 50%;" type="danger">删除</a-button>
          </div>
        </div>
        <div class="h100 border" style="width: 58%"></div>

      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    props: [],
    data() {
      return {
        isFuncRoleModal: false
      };
    },
    mounted() {

    },
    methods: {
      handleOk() {
        this.isFuncRoleModal = false
      },
      handleCancel() {
        this.isFuncRoleModal = false
      }
    }
  };
</script>