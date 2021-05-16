<template>
  <div>
    <a-modal v-model="isShowIconModal" title="图标选择" on-ok="handleOk" :maskClosable="false">
      <template slot="footer">
        <a-button key="back" @click="handleOk">
          确定
        </a-button>
        <a-button key="submit" type="primary" @click="handleCancel">
          取消
        </a-button>
      </template>
      <div class="w100 layout-left-top">
        <div v-for="(item,index) in allIconType" :key="index" style="margin: 10px;">
          <a-icon
            :type="item"
            style="font-size:30px;cursor: pointer;"
            @click="iconCilck(item,index)"
            class="hoverChange"
          ></a-icon>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import {allIconType} from "@/components/module/setting_systenMenus/iconType";
  export default {
    props: ["selectedIcon"],
    data() {
      return {
        allIconType:allIconType,
        isShowIconModal: false,
        selectedIcon2: 'appstore',
      };
    },
    mounted() {

    },
    methods: {
      iconCilck(e) {
        this.selectedIcon2 = e
      },
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