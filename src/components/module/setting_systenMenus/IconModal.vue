<template>
  <div class="w100 h100">
    <a-modal v-model="isShowIconModal" title="图标选择" on-ok="handleOk" :maskClosable="false">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">
          确定
        </a-button>
        <a-button key="submit" type="primary" @click="handleOk">
          取消
        </a-button>
      </template>
      <div class="w100 layout-left-top">
        <div v-for="(item,index) in allIconType" :key="index" style="margin: 10px;">
          <a-icon
            :type="item"
            style="font-size:30px;cursor: pointer;"
            @click="this.selectedIcon2 = item"
          ></a-icon>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  export default {
    props: ["allIconType", "selectedIcon"],
    data() {
      return {
        isShowIconModal: false,
        selectedIcon2: '',
      };
    },
    mounted() {

    },
    methods: {
      handleOk() {
        this.$emit('update:selectedIcon', this.selectedIcon2)
        this.isShowIconModal = false
      },
      handleCancel() {
        this.isShowIconModal = false
      }
    }
  };
</script>