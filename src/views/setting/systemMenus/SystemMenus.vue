<template>
  <div style="width: 100%;height: 100%;padding-top: 25px;padding-left: 20px;" class="layout-left-top">
    <div style="width: 300px;height: 100%;">
      <div class="layout-left-top" style="height: 50px;width: 100%;">
        <a-button type="primary" style="width: 100px;">新增</a-button>
        <a-button type="danger" style="width: 100px;">删除</a-button>
      </div>
      <div style="width: 100%;height: calc(100% - 50px);overflow: hidden;">
        <a-tree
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
          <ComponentsTree
            ref="componentsTree"
            :component.sync="itemComponent"
          ></ComponentsTree>
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
          <span style="margin-left: 10px;">{{funcNumber}}</span>
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
    <FuncRoleModal
      ref="funcRoleModal"
      :funcNumber.sync="funcNumber"
    ></FuncRoleModal>
  </div>
</template>

<script>
  import ComponentsTree from "@/components/module/setting_systenMenus/ComponentsTree";
  import IconModal from "@c/module/setting_systenMenus/IconModal";
  import FuncRoleModal from "@c/module/setting_systenMenus/FuncRoleModal";
  import {AddsystemMenu} from "@/api/systemMenu";

  export default {
    components: {
      ComponentsTree,
      IconModal,
      FuncRoleModal
    },
    data() {
      return {
        // 功能权限的数量
        funcNumber: '',
        // 提交需要
        menuTreeData: [],
        selectedIcon: 'appstore',
        isBread: 'false',
        menuTitle: '',
        menuPath: '',
        menuParentId: '',
        itemComponent: '',
      }
    },
    mounted() {
      // 初始化功能权限数量
      this.funcNumber = this.$refs.funcRoleModal.funRoleData.length
      this.organizeMenuTree()


    },
    methods: {
      // 组织菜单树
      organizeMenuTree() {
        this.menuTreeData = [
          {
            title: '菜单总览',
            value: '0',
            key: '0',
            children: []
          }
        ]
      },
      // 点中菜单树
      clickMenu(e) {

      },
      submit() {
        // 非空验证
        if (!this.checkIsExistNotfilled()) return
        let submitObj = {
          // 菜单标题
          menuTitle: this.menuTitle,
          // 菜单组件
          itemComponent: this.itemComponent,
          // 菜单图标
          selectedIcon: this.selectedIcon,
          // 菜单路径
          menuPath: this.menuPath,
          // 菜单父级
          menuParentId: this.menuParentId,
          // 菜单面包屑
          isBread: this.isBread,
          permissions: this.$refs.funcRoleModal.funRoleData
        }
        // 与后端以协商好,除非服务挂掉,不然都以200返回.
        // +返回的数据里有自定义状态码,1成功,0失败
        AddsystemMenu(submitObj).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 检查是否存在未填写项
      checkIsExistNotfilled() {
        let flag = true
        if (!this.menuTitle.trim()) {
          flag = false
          this.$message.warning("菜单标题未填写")
          return flag
        }
        if (!this.itemComponent.trim()) {
          flag = false
          this.$message.warning("菜单组件未选择")
          return flag
        }
        return true


      },
    }
  }

</script>

<style lang="less" scoped></style>