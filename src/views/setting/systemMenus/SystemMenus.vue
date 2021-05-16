<template>
  <div style="width: 100%;height: 100%;padding-top: 25px;padding-left: 20px;" class="layout-left-top">
    <div style="width: 300px;height: 100%;">
      <div class="layout-left-top" style="height: 50px;width: 100%;">
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
      <div style="margin-bottom: 20px;">节点详情:</div>
      <!--标题-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">标题:</div>
        <a-input style="width: 250px;" v-model="menuTitle"></a-input>
      </div>
      <!--组件-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">组件:</div>
        <div>
          <ComponentsTree ref="componentsTree"></ComponentsTree>
        </div>
      </div>
      <!--图标-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">图标:</div>
        <span>
          <a-icon :type="selectedIcon" style="margin-right: 5px;"/>
          <span
            @click="$refs.iconModal.isShowIconModal=true"
            style="cursor: pointer;"
          >请选择
          </span>
        </span>
      </div>
      <!--路径-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">路径:</div>
        <a-input style="width: 250px;" v-model="menuPath"></a-input>
      </div>
      <!--上级-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">上级:</div>
        <a-tree-select
          v-model="menuParentId"
          style="width: 250px"
          :auto-expand-parent="true"
          :tree-data="menuTreeData"
          :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
        />
      </div>
      <!--面包屑-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">面包屑:</div>
        <a-radio-group v-model="isBread" buttonStyle="solid" style="text-align: center;">
          <a-radio-button value="false" style="width: 125px">false</a-radio-button>
          <a-radio-button value="true" style="width: 125px">true</a-radio-button>
        </a-radio-group>
      </div>
      <!--功能权限-->
      <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
        <div style="width: 80px;">功能权限:</div>
        <div style="width: 250px;" class="layout-left-center">
          <span style="margin-left: 10px;">1</span>
          <span style="margin-left: 10px;cursor: pointer;" @click="$refs.funcRoleModal.isFuncRoleModal=true">编辑</span>
        </div>
      </div>
      <!--新增提交-->
      <div class="layout-left-center" style="width: 100%;">
        <a-button type="primary" @click="submit">提交</a-button>
      </div>

    </div>
    <div style="width: calc(100% - 350px - 300px);height: 100%;"></div>
    <IconModal
      ref="iconModal"
      :selectedIcon.sync="selectedIcon"
    ></IconModal>
    <FuncRoleModal ref="funcRoleModal">

    </FuncRoleModal>
  </div>
</template>

<script>
  import ComponentsTree from "@/components/module/setting_systenMenus/ComponentsTree";
  import IconModal from "@c/module/setting_systenMenus/IconModal";
  import FuncRoleModal from "@c/module/setting_systenMenus/FuncRoleModal";

  export default {
    components: {
      ComponentsTree,
      IconModal,
      FuncRoleModal
    },
    data() {
      return {
        // 提交需要
        menuTreeData: [],
        selectedIcon: 'appstore',
        isBread: 'false',
        menuTitle: '',
        menuPath: '',
        menuParentId: '',
        // 树节点唯一值
        onlyId:''
      }
    },
    mounted() {
    },
    methods: {
      // 点中菜单树
      clickMenu(e) {

      },
      submit() {
        console.log(this.$refs.iconModal.selectedIcon2)
      }
    }
  }

</script>

<style lang="less" scoped></style>