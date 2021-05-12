<template>
  <div>
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
        <div class="h100 border" style="width: 40%;padding: 10px;">
          <div class="layout-side">
            <a-button style="width: 50%;" type="primary">新增</a-button>
            <a-button style="width: 50%;" type="danger">删除</a-button>
          </div>
          <div
            class="w100 cp"
            style="margin-top:15px;"
            v-for="(item,index) in funRole"
            :key="index"
            :class="[{'clickActiveItem':index === activeItem},{'hoverChange':index !== activeItem}]"
            @click="clickFuncRoleItem(item,index)"
          >
            {{item.menuTitle}}
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
        // 当前激活的功能项
        activeItem: 0,
        isFuncRoleModal: false,
        funRole: [
          {
            type: 0,
            menuTitle: '新增训练计划',
            onlyId: 'add1'
          },
          {
            type: 1,
            isBread: true,
            menuTitle: '新增设计',
            menuPath: '',
            menuParentId: '',
            onlyId: 'add2'
          }
        ]
      };
    },
    mounted() {

    },
    methods: {
      clickFuncRoleItem(item, index) {
        this.activeItem = index
      },
      handleOk() {
        this.isFuncRoleModal = false
      },
      handleCancel() {
        this.isFuncRoleModal = false
      }
    }
  };
</script>

<style lang="less" scoped>

</style>