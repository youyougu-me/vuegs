<template>
  <div>
    <a-modal
      v-model="isFuncRoleModal"
      title="功能权限"
      on-ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
      :width="700"
      :footer="null"
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
            <a-button style="width: 50%;" type="primary" @click="addFunRoleData">新增</a-button>
            <a-button style="width: 50%;" type="danger" @click="deleteFunRoleData">删除</a-button>
          </div>
          <div
            class="w100 cp"
            style="margin-top:15px;"
            v-for="(item,index) in funRoleData"
            :key="index"
            :class="[{'clickActiveItem':index === activeItem},{'hoverChange':index !== activeItem}]"
            @click="clickFuncRoleItem(item,index)"
          >
            {{item.title.trim()?item.title:'标题未填写'}}
          </div>
        </div>
        <div class="h100 border" style="width: 58%">
          <div class="w100 layout-center">功能权限详情</div>
          <div class="w100" style="margin-top: 10px;padding-left: 10px;">
            <!--类型-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">类型:</div>
              <a-radio-group v-model="funcRoleSettingCurrent.type" buttonStyle="solid" style="text-align: center;">
                <a-radio-button value="false" style="width: 125px">路由</a-radio-button>
                <a-radio-button value="true" style="width: 125px">modal</a-radio-button>
              </a-radio-group>
            </div>
            <!--标题-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">标题:</div>
              <a-input style="width: 250px;" v-model="funcRoleSettingCurrent.title"></a-input>
            </div>
            <!--组件-->
            <div
              class="layout-left-center"
              style="width: 100%;margin-bottom: 20px;"
              v-if="funcRoleSettingCurrent.type === 'false'">
              <div style="width: 80px;">组件:</div>
              <div>
                <ComponentsTree ref="componentsTree"
                                :component.sync="funcRoleSettingCurrent.funcComponent"
                ></ComponentsTree>
              </div>
            </div>
            <!--图标-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"
                 v-if="funcRoleSettingCurrent.type === 'false'">
              <div style="width: 80px;">图标:</div>
              <span>
          <a-icon :type="funcRoleSettingCurrent.icon" style="margin-right: 5px;"/>
          <span
            @click="$refs.iconModal.isShowIconModal=true"
            style="cursor: pointer;"
          >请选择
          </span>
        </span>
            </div>
            <!--路径-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"
                 v-if="funcRoleSettingCurrent.type === 'false'">
              <div style="width: 80px;">路径:</div>
              <a-input style="width: 250px;" v-model="funcRoleSettingCurrent.path"></a-input>
            </div>
            <!--标识-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;">
              <div style="width: 80px;">标识:</div>
              <a-input style="width: 250px;" v-model="funcRoleSettingCurrent.onlyId"></a-input>

            </div>
            <!--面包屑-->
            <div class="layout-left-center" style="width: 100%;margin-bottom: 20px;"
                 v-if="funcRoleSettingCurrent.type === 'false'">
              <div style="width: 80px;">面包屑:</div>
              <a-radio-group v-model="funcRoleSettingCurrent.isBread" buttonStyle="solid" style="text-align: center;">
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
      :selectedIcon.sync="funcRoleSettingCurrent.icon"
    ></IconModal>
  </div>
</template>
<script>
  import ComponentsTree from "@/components/module/setting_systenMenus/ComponentsTree";
  import IconModal from "@c/module/setting_systenMenus/IconModal";

  export default {
    props: ["funcNumber"],
    components: {
      ComponentsTree,
      IconModal
    },
    data() {
      return {
        // 当前激活的功能项
        activeItem: 0,
        isFuncRoleModal: false,
        funRoleData: [
          // {
          //   // 模
          //   type: 'false',// 路由
          //   // 模
          //   title: '新增训练计划',
          //   // 模
          //   onlyId: 'add1',
          //   icon: 'appstore',
          //   path: '/addPlan',
          //   isBread: 'true',
          //   funcComponent: '',
          // },
          // {
          //   // 模
          //   type: 'true',
          //   // 模
          //   title: '训练设计',
          //   // 模
          //   onlyId: 'add2'
          // }
        ],
        funcRoleSettingCurrent: {
          // 模
          type: 'false',
          // 模
          title: '',
          // 模
          onlyId: '',
          icon: 'appstore',
          path: '',
          isBread: 'false',
          funcComponent: '',
        },
        funcRoleSettingClean: {
          type: 'false',
          title: '新增项',
          onlyId: '',
          icon: 'appstore',
          path: '',
          isBread: 'false',
          funcComponent: '',
        }
      };
    },
    mounted() {
      // 默认显示已有的第一项
      if (this.funRoleData.length > 0) {
        this.funcRoleSettingCurrent = this.funRoleData[0]
      }
    },
    methods: {
      clickFuncRoleItem(item, index) {
        this.activeItem = index
        // 不能用深拷贝,用的就是双向绑定
        this.funcRoleSettingCurrent = this.funRoleData[this.activeItem]
      },
      handleOk() {
        this.$emit("update:funcNumber", this.funRoleData.length)
      },
      // 点击×号会执行这个函数,弹窗也会自动关闭,不管你设不设置都会自动关闭
      handleCancel() {
        // 更新功能权限数量
        this.$emit("update:funcNumber", this.funRoleData.length)
      },
      addFunRoleData() {
        // 默认为新增路由
        this.funRoleData.push(JSON.parse(JSON.stringify(this.funcRoleSettingClean)))
        // 选中新增的
        this.clickFuncRoleItem(this.funcRoleSettingClean, this.funRoleData.length - 1)
      },
      deleteFunRoleData() {
        this.funRoleData.splice(this.activeItem, 1)
      }
    }
  };
</script>

<style lang="less" scoped>

</style>