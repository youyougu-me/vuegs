<template>
  <div style="width: 100%;height: 100%;" class="layout-left-top">
    <div class="layout-left-top" style="height: 50px;width: 100%;">
      <a-button style="width: 80px;" @click="addMenus">新增</a-button>
      <a-button type="primary" style="width: 80px;" @click="editTreeNode">编辑</a-button>
      <a-button type="danger" style="width: 80px;" @click="deleteTreeNode">删除</a-button>
    </div>
    <div style="width: 100%;height: calc(100% - 50px);overflow: hidden;">
      <a-tree
        v-if="personTreeData.length"
        :autoExpandParent="true"
        :treeData="personTreeData"
        @select="clickTreeNode"
        defaultExpandAll
      />
    </div>
  </div>
</template>

<script>
  import {QueryAllPerson} from "@/api/systemPerson";


  export default {
    components: {},
    data() {
      return {
        // 人员树形数据
        personTreeData: [],
        // 人员平行数据
        personEqualData: [],
      }
    },
    async mounted() {
    },
    methods: {
      // 查询平级菜单
      queryEqualPerson() {
        return new Promise((resolve, reject) => {
          // .then一定成功
          QueryAllPerson().then(res => {
            resolve(res.data)
          })
        })
      },
      // 点击树节点
      clickTreeNode() {

      },
      addMenus() {

      },
      editTreeNode() {

      },
      deleteTreeNode() {

      }

    }
  }


</script>

<style lang="less" scoped></style>