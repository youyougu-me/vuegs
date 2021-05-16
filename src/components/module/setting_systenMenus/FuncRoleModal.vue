<template>
  <div>
    <a-modal
      v-model="isFuncRoleModal"
      title="功能权限"
      on-ok="handleOk"
      :maskClosable="false"
      :width="700"
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
        <div class="h100 border" style="width: 58%">
          <div class="w100 layout-center">功能权限详情</div>
          <div class="w100" style="margin-top: 10px;padding-left: 10px;">
            <!--类型-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">类型:</div>
              <a-radio-group v-model="funcRoleSetting.type" buttonStyle="solid" style="text-align: center;">
                <a-radio-button value="false" style="width: 125px">路由</a-radio-button>
                <a-radio-button value="true" style="width: 125px">modal</a-radio-button>
              </a-radio-group>
            </div>
            <!--标题-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">标题:</div>
              <a-input style="width: 250px;" v-model="funcRoleSetting.title"></a-input>
            </div>
            <!--组件-->
            <div
              class="layout-left-center"
              style="width: 100%;margin-bottom: 20px;"
              v-if="funcRoleSetting.type === 'false'">
              <div style="width: 80px;">组件:</div>
              <div>
                <ComponentsTree ref="componentsTree"></ComponentsTree>
              </div>
            </div>
            <!--图标-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"  v-if="funcRoleSetting.type === 'false'">
              <div style="width: 80px;">图标:</div>
              <span>
          <a-icon :type="funcRoleSetting.icon" style="margin-right: 5px;"/>
          <span
            @click="$refs.iconModal.isShowIconModal=true"
            style="cursor: pointer;"
          >请选择
          </span>
        </span>
            </div>
            <!--路径-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"  v-if="funcRoleSetting.type === 'false'">
              <div style="width: 80px;">路径:</div>
              <a-input style="width: 250px;" v-model="funcRoleSetting.path"></a-input>
            </div>
            <!--标识-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">标识:</div>
              <a-input style="width: 250px;" v-model="funcRoleSetting.flag"></a-input>

            </div>
            <!--面包屑-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"  v-if="funcRoleSetting.type === 'false'">
              <div style="width: 80px;">面包屑:</div>
              <a-radio-group v-model="funcRoleSetting.isBread" buttonStyle="solid" style="text-align: center;">
                <a-radio-button value="false" style="width: 125px">false</a-radio-button>
                <a-radio-button value="true" style="width: 125px">true</a-radio-button>
              </a-radio-group>
            </div>
          </div>
        </div>

      </div>
    </a-modal>
    <IconModal
      ref="iconModal"
      :selectedIcon.sync="funcRoleSetting.icon"
    ></IconModal>
  </div>
</template>
<script>
  import ComponentsTree from "@/components/module/setting_systenMenus/ComponentsTree";
  import IconModal from "@c/module/setting_systenMenus/IconModal";

  export default {
    props: [],
    components: {
      ComponentsTree,
      IconModal
    },
    data() {
      return {
        // 当前激活的功能项
        activeItem: 0,
        isFuncRoleModal: true,
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
        ],
        funcRoleSetting: {
          title: '',
          icon: 'appstore',
          path: '',
          flag: '',
          isBread: 'false',
          type: 'false'
        }
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