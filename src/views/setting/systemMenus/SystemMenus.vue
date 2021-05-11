<template>
  <div style="width: 100%;height: 100%;" class="layout-left-top">
    <div style="width: 300px;height: 100%;">
      <div class="layout-left-center" style="height: 50px;width: 100%;">
        <a-button type="primary" style="width: 100px;">新增</a-button>
        <a-button type="danger" style="width: 100px;">删除</a-button>
      </div>
      <div style="width: 100%;height: calc(100% - 50px);overflow: hidden;">
        <a-tree
          checkable
          :auto-expand-parent="true"
          :tree-data="menuTreeData"
          @select="clickMenu"
        />
      </div>
    </div>
    <div style="width: 350px;height: 100%;">
      <div>节点详情:</div>
      <!--组件-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 10px;">
        <div style="width: 80px;">组件:</div>
        <div>
          <ComponentsTree></ComponentsTree>
        </div>
      </div>
      <!--图标-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 10px;">
        <div style="width: 80px;">图标:</div>
        <span>
          <a-icon :type="selectedIcon" style="margin-right: 5px;"/>
          <span
            @click="$refs.iconModal.isShowIconModal=true"
            style="cursor: pointer;"
            :allIconType="allIconType"
          >请选择
          </span>
        </span>
      </div>
    </div>
    <div style="width: calc(100% - 350px - 300px);height: 100%;"></div>
    <IconModal
      ref="iconModal"
      :allIconType="allIconType"
      :selectedIcon.sync="selectedIcon"
    ></IconModal>
  </div>
</template>

<script>
  import ComponentsTree from "@/components/module/setting_systenMenus/ComponentsTree";
  import {allIconType} from "@/components/module/setting_systenMenus/iconType";
  import IconModal from "@c/module/setting_systenMenus/IconModal";

  export default {
    components: {
      ComponentsTree,
      IconModal
    },
    data() {
      return {
        menuTreeData: [],
        selectedIcon: 'book',
        allIconType: allIconType
      }
    },
    mounted() {
      console.log(this.allIconType)
    },
    methods: {
      // 点中菜单树
      clickMenu(e) {

      }
    }
  }

</script>

<style lang="less" scoped></style>