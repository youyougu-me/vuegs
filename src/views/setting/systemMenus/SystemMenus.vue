<template>
  <div style="width: 100%;height: 100%;" class="layout-left-top">
    <div style="width: 300px;height: 100%;">
      <div class="layout-left-center" style="height: 50px;width: 100%;">
        <a-button type="primary" style="width: 100px;">新增</a-button>
        <a-button type="danger" style="width: 100px;">删除</a-button>
      </div>
      <div style="width: 100%;height: calc(100% - 50px);overflow: hidden;">
        <a-tree
          v-model="checkedMenuNode"
          checkable
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :selected-keys="selectedKeys"
          :tree-data="treeData"
          @expand="onExpand"
          @select="onSelect"
        />
      </div>
    </div>
    <div style="width: 350px;height: 100%;">
      <div>节点详情:</div>
      <div class="layout-side" style="width: 100%;">
        <div style="width: 80px;text-align: right;">组件:</div>
        <div>
          <ComponentsTree></ComponentsTree>
        </div>
      </div>
    </div>
    <div style="width: calc(100% - 350px - 300px);height: 100%;"></div>
  </div>
</template>

<script>
  import ComponentsTree from "@/views/setting/systemMenus/template/ComponentsTree";

  export default {
    components: {
      ComponentsTree
    },
    data(){
      return{
        // 选中的菜单节点
        checkedMenuNode:[],
      }
    }
  }

</script>

<style lang="less" scoped></style>