<template>
  <div style="width: 100%;height: 100%;" class="layout-left-top">
    <!--左S-->
    <div style="width: 300px;height: 100%;" class="border-right">
      <div class="layout-left-top" style="height: 50px;width: 100%;">
        <a-button type="primary" style="width: 100px;" @click="addMenus">新增</a-button>
        <a-button type="danger" style="width: 100px;" @click="deleteTreeNode">删除</a-button>
      </div>
      <div style="width: 100%;height: calc(100% - 50px);overflow: hidden;">
        <a-tree
          v-if="menuTreeData.length"
          :autoExpandParent="true"
          :treeData="menuTreeData"
          @select="clickMenu"
          defaultExpandAll
        />
      </div>
    </div>
    <!--左E-->
    <!--中S-->
    <div style="width: 350px;height: 100%;" class="border-right">
      <div class="w100 h100 layout-center"
           v-if="isAddMenuStatus===false&&(currentClickTreeNodeId==='0'||currentClickTreeNodeId === undefined)">
        <a-empty>
          <span>暂无选中节点数据</span>
        </a-empty>
      </div>
      <div class="w100 h100" v-else>
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
            v-if="menuTreeData.length"
            tree-default-expand-all
            v-model="menuParentId"
            style="width: 250px"
            :disabled="!isAddMenuStatus"
            :autoExpandParent="true"
            :treeData="menuTreeData"
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
            <span style="margin-left: 10px;cursor: pointer;"
                  @click="$refs.funcRoleModal.receiveFunRoleData(funcMenus,isAddMenuStatus)">编辑</span>
          </div>
        </div>
        <!--新增提交-->
        <div class="layout-left-center" style="width: 100%;">
          <a-button type="primary" @click="submit">{{isAddMenuStatus?'新增提交':'编辑提交'}}</a-button>
        </div>
      </div>


    </div>
    <!--中E-->
    <!--右S-->
    <div style="width: calc(100% - 350px - 300px);height: 100%;"></div>
    <!--右E-->
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
  import {AddsystemMenu, QuerySystemMenu, EditSystemMenu} from "@/api/systemMenu";

  export default {
    components: {
      ComponentsTree,
      IconModal,
      FuncRoleModal
    },
    data() {
      return {
        // 当前点击树节点
        currentClickTreeNodeId: undefined,
        // 是否是新增模式
        isAddMenuStatus: false,
        // 功能权限的数量
        funcNumber: '',
        funcMenus: [],
        // 树形菜单
        menuTreeData: [],
        // 平级菜单
        equalMenus: [],
        // 当前选中树节点的属性 用于删除树节点
        currentClickMenuTreeRef: {},
        // 提交需要S
        selectedIcon: 'appstore',
        isBread: 'false',
        menuTitle: '',
        menuPath: '',
        menuParentId: '',
        itemComponent: '',
        // 提交需要E
      }
    },
    async mounted() {
      // 初始化功能权限数量
      this.funcNumber = this.$refs.funcRoleModal.funRoleData.length
      this.equalMenus = await this.queryequalMenus()
      this.organizeMenuTree(this.equalMenus)


    },
    methods: {
      deleteTreeNode() {
        if (this.currentClickTreeNodeId === undefined) {
          this.$message.error("请先选中树节点再进行删除")
          return
        }
        if (this.currentClickTreeNodeId === '0') {
          this.$message.error("根节点不可删除")
          return
        }
        // console.log(this.currentClickMenuTreeRef)

        let deleteArr = this.getTreeNodeChild(this.currentClickMenuTreeRef.node.dataRef)
        console.log(deleteArr)

      },
      // 递归得到删除节点的子节点id
      getTreeNodeChild(treeNode) {
        let needArr = []

        function getChild(treeNode) {
          needArr.push(treeNode.key)
          if (treeNode.children && treeNode.children.length > 0) {
            treeNode.children.forEach(item => {
              getChild(item)
            })
          }
        }

        getChild(treeNode)
        return needArr
      },
      // 新增菜单
      addMenus() {
        this.isAddMenuStatus = true
        this.clearInput()
      },
      // 定义一个清空显示框的方法
      clearInput() {
        this.selectedIcon = 'appstore'
        this.isBread = 'false'
        this.menuTitle = ''
        this.menuPath = ''
        this.menuParentId = ''
        this.itemComponent = ''
        // 清空功能权限组件
        this.funcNumber = 0
      },
      // 查询平级菜单
      queryequalMenus() {
        return new Promise((resolve, reject) => {
          // .then一定成功
          QuerySystemMenu().then(res => {
            resolve(res.data)
          })
        })
      },
      // 递归树
      dgTree(equalMenus, parentId) {
        let maxChildren = []
        equalMenus.forEach(item => {
          if (item.menuParentId === parentId) {
            maxChildren.push({
              title: item.menuTitle,
              value: item._id,
              key: item._id,
              children: this.dgTree(equalMenus, item._id)
            })
          }
        })
        return maxChildren
      },
      // 组织菜单树
      organizeMenuTree(equalMenus) {
        let maxChildren = this.dgTree(equalMenus, '0')
        this.menuTreeData = [
          {
            title: '菜单总览',
            value: '0',
            key: '0',
            children: maxChildren,
          }
        ]
      },
      // 点中菜单树
      clickMenu(e, ref) {
        // 切换为编辑模式
        this.isAddMenuStatus = false
        // 点击第二次的时候会等于undefined
        this.currentClickTreeNodeId = e[0]
        if (this.currentClickTreeNodeId === undefined) return
        // 不是总览
        if (this.currentClickTreeNodeId !== "0") {
          this.equalMenus.forEach(item => {
            if (item._id === this.currentClickTreeNodeId) {
              // 给展示项赋值 一共7项
              this.menuTitle = item.menuTitle
              this.itemComponent = item.itemComponent
              this.selectedIcon = item.selectedIcon
              this.menuPath = item.menuPath
              this.isBread = item.isBread
              this.menuParentId = item.menuParentId
              this.funcMenus = item.permissions
              // 更新功能权限数量
              this.funcNumber = this.funcMenus.length
            }
          })
        }
        this.currentClickMenuTreeRef = ref
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
        // 新增
        if (this.isAddMenuStatus) {
          AddsystemMenu(submitObj).then(async res => {
            if (res.meta.status === 1) {
              this.$message.success("添加成功")
              // 刷新树
              this.equalMenus = await this.queryequalMenus()
              this.organizeMenuTree(this.equalMenus)
            } else {
              this.$message.warning("添加失败")
            }
            // 什么时候走.catch,后端服务挂掉
          }).catch(err => {
            this.$message.warning("添加失败")
          })
        }
        // 编辑
        else {
          submitObj._id = this.currentClickTreeNodeId
          EditSystemMenu(submitObj).then(async res => {
            if (res.meta.status === 1) {
              this.$message.success("修改成功")
              // 刷新树
              this.equalMenus = await this.queryequalMenus()
              this.organizeMenuTree(this.equalMenus)
            }
          })
        }


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
        if (!this.menuPath.trim()) {
          flag = false
          this.$message.warning("菜单路径未选择")
          return flag
        }
        if (!this.menuParentId.trim()) {
          flag = false
          this.$message.warning("菜单上级未选择")
          return flag
        }
        // 功能权限里面的
        if (this.$refs.funcRoleModal.funRoleData.length > 0) {
          let funcs = this.$refs.funcRoleModal.funRoleData
          for (let item of funcs) {
            if (!item.title.trim()) {
              flag = false
              this.$message.warning("存在功能权限的标题未填写")
              return flag
            }
            if (!item.onlyId.trim()) {
              flag = false
              this.$message.warning("存在功能权限的标识未填写")
              return flag
            }
            if (!item.funcComponent.trim()) {
              flag = false
              this.$message.warning("存在功能权限的组件未填写")
              return flag
            }
            if (!item.path.trim()) {
              flag = false
              this.$message.warning("存在功能权限的路径未填写")
              return flag
            }
          }
        }
        // 没有return false那就是全部都通过 flag始终为true
        return flag
      },
    }
  }

</script>

<style lang="less" scoped></style>