<template>
  <div class="width-100-per height-100-per" id="settingUser">
    <!--新增按钮S-->
    <a-card
      class="card-width"
      style="text-align: center;display: flex;justify-content: center;"
      :hoverable="true"
      @click="addRoles">
      <span style="font-size: 40px;line-height: 20px;">+</span>
    </a-card>
    <!--新增按钮E-->
    <!--角色卡片S-->
    <template v-if="isShowCard">
      <a-card
        class="card-width"
        style="position: relative;"
        :hoverable="true"
        v-for="(user,index) in userRoleList"
        :key="index"
        @click="handleClickRole(user)"
      >
        <div :title="user.roleName" style="position: relative">
      <span style="margin-left: 18px;color: white">
        <span class="roleNameClass">{{user.roleName}}</span><br>
        <!--此角色绑定的人的数量-->
        <span style="font-weight: bold;margin-left: 18px">{{user.countUser}}</span>
      </span>
          <span style="position: absolute;top: 0px;right: 20px">
              <a-icon type="user"
                      style="font-size: 40px;
                vertical-align: middle;color: white"/>
            </span>
        </div>
      </a-card>
    </template>
    <!--角色卡片S-->
    <template>
      <!--修改角色模态框S-->
      <a-model
        :title="isAddRole?'新增角色':'修改角色'"
        :visible="isShowRoleModal"
        width="1000px"
        @ok="handleOkModel"
        @cancel="handleCancelModel"
        :footer="null"
      >
        <div class="width-100-per" style="height: 600px">
          <!--顶部一排S-->
          <div class="width-100-per height-50-px layout-left-center border-bottom">
            <div>角色名:
              <a-input placeholder="请输入角色名" style="width: 150px;" v-model.trim="roleName"></a-input>
            </div>
            <!--是否是监考人S-->
            <a-button-group class="margin-left-10-px" name="buttonGroup">
              <a-button :class="{activeButton:isInvigilator===true}" @click="isInvigilator = !isInvigilator">监考者
              </a-button>
              <a-button :class="{activeButton:isInvigilator===false}" @click="isInvigilator = !isInvigilator">非监考者
              </a-button>
            </a-button-group>
            <!--是否是监考人E-->
          </div>
          <!--顶部一排E-->
          <!--中间S-->
          <div class="width-100-per layout-side" style="height: calc(100% - 100px);">
            <!--菜单设置S-->
            <div
              class="height-100-per border-left border-right overflow-hidden"
              :style="{width:isShowUserToRole?100/4+'%':100/3+'%'}"
            >
              <div class="width-100-per layout-left-center padding-left-10-px height-30-px"
                   style="background-color: #7e6b5a;">菜单设置
              </div>
              <div class="width-100-per" style="height: calc(100% - 30px)">
                <div class="overflow-auto width-100-per" style="height: calc(100% - 0px)">
                  <a-tree checkable
                          defaultExpandAll
                          :autoExpandParent="true"
                          :treeData="treeData"
                          v-model="roleQx"
                          @check="selectTreeNode"
                  >
                  </a-tree>
                </div>
              </div>
            </div>
            <!--菜单设置E-->
            <!--功能权限设置S-->
            <div class="height-100-per" :style="{width:isShowUserToRole?100/4+'%':100/3+'%'}">
              <div class="width-100-per layout-left-center padding-left-10-px height-30-px"
                   style="background-color: #7e6b5a;">功能权限设置
              </div>
              <div class="width-100-per overflow-hidden" style="height: calc( 100% - 30px )">
                <div class=" width-100-per padding-10-px overflow-auto height-100-per">
                  <!--checkedListNew==平级路由+下面的功能选项-->
                  <!--checkedData选择了label里面的哪些value-->
                  <template v-for="(item,index) in checkedListNewAll">
                    <div v-if="item.eveGroup.length!== 0" :key="item.id+index + '55'">
                      <!--平级路由名字S-->
                      <div
                        style="color: #ff4d4f"
                        :key="item.id"
                      >{{item.groupName}}
                      </div>
                      <!--平级路由名字E-->
                      <!--平级路由下面的选项S-->
                      <!--:options是选项-->
                      <!--onChangeGroup有一个参数代表选中的值-->
                      <!--allGroupSelectData[item.id]存的是选中的值-->
                      <a-checkbox-group
                        :options="item.eveGroup"
                        v-model="allGroupSelectData[item.id]"
                        :key="index"
                      >
                      </a-checkbox-group>
                      <!--平级路由下面的选项E-->
                      <hr :key="item.id+index"/>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <!--功能权限设置E-->
            <!--首页菜单设置S-->
            <div class="height-100-per border-left border-right" :style="{width:isShowUserToRole?100/4+'%':100/3+'%'}">
              <div class="width-100-per layout-left-center padding-left-10-px height-30-px"
                   style="background-color: #7e6b5a;">首页菜单设置
              </div>
              <div class=" width-100-per overflow-hidden"
                   style="height: calc( 100% - 30px );display: flex;flex-direction: column;">
                <!--展示区S-->
                <div class="border-bottom padding-10-px" style="min-height: 30px;">
                  <a-checkbox-group :value="displayValue"
                                    @change="selectOrDisplayChange(0,$event)">
                  <span v-for="(it,idx) of displayOptions" style="display: inline-block;margin-right: 8px;"
                        :key="idx">
                     <a-checkbox style="margin: 0;" :value="it.value" :key="idx"> </a-checkbox>
                    <span style="padding: 0 0 0 8px">{{`${it.label}`}}</span>
                    <a-icon type="arrow-up" v-if="idx>0" @click.prevent="changeLocation(1,idx)"/>
                    <a-icon type="arrow-down" v-if="idx<(displayOptions.length - 1)"
                            @click.prevent="changeLocation(2,idx)"/>
                  </span>
                  </a-checkbox-group>
                </div>
                <!--展示区E-->
                <!--选择区S-->
                <div class=" width-100-per padding-10-px overflow-auto" style="flex: 1">
                  <a-checkbox-group :options="selectOptions" :value="selectValue"
                                    @change="selectOrDisplayChange(1,$event)">
                  </a-checkbox-group>
                </div>
                <!--选择区E-->
              </div>
            </div>
            <!--首页菜单设置E-->
            <!--人员关联设置S-->
            <div v-if="isShowUserToRole" class="height-100-per border-left border-right"
                 :style="{width:isShowUserToRole?100/4+'%':100/3+'%'}">
              <div class="width-100-per layout-left-center padding-left-10-px height-30-px"
                   style="background-color: #7e6b5a;">人员关联设置
              </div>
              <div class="width-100-per" style="height: calc(100% - 30px)">
                <UserRoleToPerson ref="roleToUser"></UserRoleToPerson>
              </div>
            </div>
            <!--人员关联设置E-->
          </div>
          <!--中间E-->
          <!--底部S-->
          <div class="width-100-per height-50-px border-top layout-right-center">
            <button-style>
              <a-button-group slot="content">
                <!--<a-button v-waves icon="swap" @click="userToRole" type="primary">人员关联</a-button>-->
                <a-button v-waves icon="reload" @click="onRemove" v-show="!isAddRole" type="danger">清空</a-button>
                <a-button v-waves icon="delete" @click="onDelete" v-show="!isAddRole" type="danger">删除
                </a-button>
                <a-button v-waves icon="close" @click="onClose" type="primary">取消</a-button>
                <a-button v-waves icon="check" @click="onSubmit" type="primary">提交</a-button>
              </a-button-group>
            </button-style>
          </div>
          <!--底部E-->
        </div>
      </a-model>
      <!--修改角色模态框E-->
    </template>
  </div>

</template>

<script>
  import UserRoleToPerson from "@/components/module/setting_userRole/UserRoleToPerson"
  import {dataTreeDg} from '@/components/module/setting_userRole/util'

  export default {
    components: {
      UserRoleToPerson,
    },
    watch: {
      roleQx(newVal, oldVal) {
        // console.log('new')
        // console.log(newVal)
        // console.log('new')
        // console.log('old')
        // console.log(oldVal)
        // console.log('old')
        // 对比两个,得出取消时的id差异
        this.lessSelect = []
        if (newVal.length < oldVal.length) {
          // console.log("点击了取消")
          oldVal.forEach(item => {
            if (newVal.indexOf(item) === -1) {
              this.lessSelect.push(item)
            }
          })
          // console.log(this.lessSelect)

        }
      }
    },
    data() {
      return {
        // 相比于上次取消了哪些
        lessSelect: [],
        // 子权限存储,若父节点未选择完就必须要这个字段
        roleQxTwo: [],
        // 用于新增角色刷新
        isShowCard: true,
        // 角色列表
        userRoleList: [],
        // 展示区选项
        displayOptions: [],
        // 展示区值
        displayValue: [],
        // 选择区选项
        selectOptions: [],
        // 选择区值
        selectValue: [],
        // 角色名字
        roleName: '',
        // 所有平级的菜单数据
        allEqualMenus: [],
        // 菜单树
        treeData: [],
        // 所有平级路由+它下面的所有可选选项
        checkedListNewAll: [],
        // 它是一个对象,key是平级路由id,value是此路由下的功能(不是选项,是已有的功能)
        allGroupSelectData: {},
        // 当前选中的树节点
        roleQx: [],
        // 新增修改模态框
        isShowRoleModal: false,
        // 是新增模式还是修改模式
        isAddRole: true,
        // 是否展示人员关联的那一栏
        isShowUserToRole: true,
        // 是否是监考者
        isInvigilator: false,
        // 当前编辑的角色id,只在点击角色卡片后(或点击新增)为其赋值
        currentEditUserRoleId: null,
        // 当前编辑角色绑定的人员数量
        currentEditUserRoleNumber: 0,
      }
    },
    async mounted() {
      // 获取角色列表
      await this.showUserRoleList()
      // 查询所有菜单并展示,什么角色都是这个菜单
      // await this.findAllMenus()

    },
    methods: {
      // 获取角色列表
      showUserRoleList() {
        return new Promise((resolve, reject) => {
          this.$apollo.query({
            query: require('_graphql/settings/query/queryRoles.gql'),
            variables: {},
            fetchPolicy: 'no-cache'
          }).then(data => {
            this.userRoleList = data.data.findAllRole;
            resolve(this.userRoleList)
          }).catch((error) => {
            console.log(error)
          })
        })
      },
      handleClickRole(user) {
        // 模态框变为修改模式
        this.isAddRole = false
        // 打开模态框
        this.isShowRoleModal = true
        // 查看角色详情
        this.checkTheUserRole(user)
        // 初始化人员关联框
        // 页面加载完包括此子组件加载完才触发的钩子
        this.$nextTick(() => {
          this.$refs.roleToUser && this.$refs.roleToUser.checkPersonByRoleId(user.id)
        })

      },
      // 查看角色详情
      async checkTheUserRole(userInfo) {
        let copyUserInfo = JSON.parse(JSON.stringify(userInfo))
        // console.log(copyUserInfo)
        // 当前编辑角色id
        this.currentEditUserRoleId = copyUserInfo.id
        this.currentEditUserRoleNumber = copyUserInfo.countUser
        // 角色名
        this.roleName = copyUserInfo.roleName
        // 是否是监考者
        this.isInvigilator = copyUserInfo.invigilator
        // 此角色选中的菜单,是一个id数组
        this.roleQx = copyUserInfo.roleQx
        // 初始化子菜单,后来加上
        this.roleQxTwo = copyUserInfo.roleQxTwo
        // 初始此角色所有的功能权限选项
        await this.initFuncSet(copyUserInfo.roleQx)
        // 此角色所有的功能权限值
        this.allGroupSelectData = JSON.parse(copyUserInfo.btnPermissions[0])
        // 此角色所有首页菜单展示值,因为提交到后端去过
        this.displayValue = copyUserInfo.indexPermissions
        // 首页菜单区域初始
        this.initIndexMenuDisplay()

      },
      // 选中菜单树节点
      async selectTreeNode(checkedKeys, e) {
        // 点击菜单展示菜单下的功能权限
        await this.initFuncSet(checkedKeys)
        // 取消此菜单勾选清空此菜单下的功能权限
        this.initAllFunsBySelectMenu(e)
        // 解决平级菜单与首页菜单联动bug
        this.deleteDisplay(e)
        // 首页菜单区域初始
        this.initIndexMenuDisplay()

        // 子菜单存储
        let roleQxTwo = [...checkedKeys, ...e.halfCheckedKeys]
        this.roleQxTwo = roleQxTwo
      },
      // 由于菜单会重复选中,导致首页菜单在菜单取消时未清空干净
      deleteDisplay(e) {
        if (e.checked === true) return
        // 相比于上次少的
        this.lessSelect.forEach(ele => {
          this.displayOptions = this.displayOptions.filter(item => {
            if (item.value !== ele) {
              return item
            }
          })

          this.displayValue = this.displayValue.filter(item => {
            if (item !== ele) {
              return item
            }
          })
        })
      },
      // 已知所有的平级菜单数组,选中的平级菜单id数组与首页菜单(展示区值数组)++
      // ++求首页菜单展示(展示区选项数组) + (选择区选项)
      // 两个地方会调用,1点击角色卡片进入,2角色有拥有菜单改变时
      // displayValue这4个值绑定到复选框上,当点击复选框,便会自动更新值
      initIndexMenuDisplay(allEqualMenus, roleQx, displayValue) {
        this.selectOptions = []
        for (let data of this.allEqualMenus) {
          // 树上被选中的所有节点的id
          for (let data2 of this.roleQx) {
            if (data.id === data2) {
              this.selectOptions.push({
                value: data.id,
                label: data.meta.title,
                path: data.path,
                parentId: data.parentId
              })
            }
          }
        }
        this.selectOptions = this.unique(this.selectOptions);
        // 根据首页的展示区过滤
        // arr 是根据菜单组织的所有能选择的
        let arr = JSON.parse(JSON.stringify(this.selectOptions))
        this.displayOptions = []
        // this.displayValue是已知,并且当你点击时它自动会变,只需赋初始值
        for (let item of this.displayValue) {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (item == arr[i].value) {
              // 展示区选项与值是一致的
              // 这里只关注展示区的值
              this.displayOptions.push(arr[i])
              // 展示区有的,选择区应当删除
              arr.splice(i, 1)
              break;
            }
          }
        }
        this.selectOptions = JSON.parse(JSON.stringify(arr))
      },
      // 选择区复选框改变,展示区复选框改变
      selectOrDisplayChange(e, checkedValues) {
        // 在选择区点击
        if (e === 1) {
          if (this.displayOptions.length < 6) {
            for (let i in this.selectOptions) {
              if (this.selectOptions[i].value == checkedValues) {
                this.displayOptions.push(this.selectOptions[i])
                this.displayValue.push(checkedValues[0])
                this.selectOptions.splice(i, 1)
              }
            }
          } else {
            this.$message.error("最多勾选六个")
          }
        } else {
          for (let i in this.displayValue) {
            if (checkedValues.indexOf(this.displayValue[i]) == '-1') {
              for (let idx in this.displayOptions) {
                if (this.displayOptions[idx].value == this.displayValue[i]) {
                  this.selectOptions.push(this.displayOptions[idx])
                  this.displayOptions.splice(idx, 1)
                  break;
                }
              }
              this.displayValue.splice(i, 1)
              break;
            }
          }
        }
      },
      // 改变首页菜单展示区前后位置
      changeLocation(e, idx) {
        // idx是展示区这几个的索引
        // e===1是往前的箭头
        if (e === 1) {
          this.displayValue.splice(idx - 1, 1, ...this.displayValue.splice(idx, 1, this.displayValue[idx - 1]))
          this.displayOptions.splice(idx - 1, 1, ...this.displayOptions.splice(idx, 1, this.displayOptions[idx - 1]))
        } else {
          this.displayValue.splice(idx, 1, ...this.displayValue.splice(idx + 1, 1, this.displayValue[idx]))
          this.displayOptions.splice(idx, 1, ...this.displayOptions.splice(idx + 1, 1, this.displayOptions[idx]))
        }
      },
      // 传入平级菜单id数组,得到这些id下的功能权限
      initFuncSet(arr) {
        return new Promise((resolve, reject) => {
          this.$apollo.query({
            query: require('_graphql/settings/query/findAllByIdIn.gql'),
            variables: {ids: arr},
            fetchPolicy: 'no-cache'
          }).then((data) => {
            let dataObjs = data.data.findAllByIdIn;
            if (dataObjs.length === 0) {
              this.checkedListNewAll = []
              resolve(this.checkedListNewAll)
              return
            }
            let checkedListNewAll2 = [];
            dataObjs.forEach((item) => {
              let toolArr = []
              if (item.permissions === null) {
                return
              }
              for (let dataBase of item.permissions) {
                toolArr.push({
                  value: dataBase.meta.key,
                  label: dataBase.meta.title,
                })
              }
              checkedListNewAll2.push({
                eveGroup: toolArr,
                id: item.id,
                groupName: item.meta.title
              })
            })
            this.checkedListNewAll = JSON.parse(JSON.stringify(checkedListNewAll2))
            resolve(this.checkedListNewAll)
          })
        })
      },
      // 根据是否选中某个菜单,初始化这个菜单对应的功能权限
      initAllFunsBySelectMenu(e) {
        if (this.allGroupSelectData[e.node.dataRef.key] === undefined) return
        if (e === true) {
          this.allGroupSelectData[e.node.dataRef.key] = []
          console.log(this.allGroupSelectData)
          return
        }
        // e===false
        delete this.allGroupSelectData[e.node.dataRef.key]
      },
      // 人员关联
      userToRole() {
        // 展示或隐藏人员关联
        this.isShowUserToRole = !this.isShowUserToRole
      },
      // 查询所有菜单
      findAllMenus() {
        return new Promise((resolve, reject) => {
          this.$apollo.query({
            query: require('_graphql/settings/query/findAllRouter.gql'),
            variables: {},
            fetchPolicy: 'no-cache'
          }).then(data => {
            // 这是一个数组,父级与子级菜单的id信息都在这个一维平行数组中
            const routerData = data.data.findAllRouter;
            // 所有平级菜单
            this.allEqualMenus = JSON.parse(JSON.stringify(routerData))
            // 将平级菜单组装成树S
            const newTree = [];
            for (let r of routerData) {
              if (r.parentId === '0') {
                let ct = dataTreeDg(r, routerData);
                if (ct.length !== 0) {
                  newTree.push({
                    title: r.meta.title,
                    key: r.id,
                    path: r.path,
                    btnPermissions: r.permissions,
                    value: [],
                    children: dataTreeDg(r, routerData)
                  })
                } else {
                  newTree.push({
                    title: r.meta.title,
                    key: r.id,
                    value: [],
                    btnPermissions: r.permissions,
                    path: r.path,
                  })
                }
              }
            }
            // 菜单树
            this.treeData = JSON.parse(JSON.stringify(newTree))
            // 将平级菜单组装成树E
          })
        })
      },
      // 清空即初始化
      onRemove() {
        // 清空角色名
        this.roleName = ''
        // 清空监考者
        this.isInvigilator = false
        // 清空菜单设置勾选
        this.roleQx = []
        // 清空平级路由对应的功能选项
        this.checkedListNewAll = []
        // 清空菜单下的功能权限
        this.allGroupSelectData = {}
        // 展示区选项
        this.displayOptions = []
        // 展示区值
        this.displayValue = []
        // 选择区选项
        this.selectOptions = []
        // 选择区值
        this.selectValue = []
        // 清空人员
        this.$refs.roleToUser.removeAll()
      },
      // 删除
      onDelete() {
        if (this.currentEditUserRoleNumber > 0) {
          this.$message.error("请先删除当前角色绑定的人员")
          return
        }
        this.$apollo.mutate({
          mutation: require('_graphql/settings/mutation/deleteRole.gql'),
          variables: {id: this.currentEditUserRoleId}
        }).then(async data => {
          this.$message.success('删除成功')
          // 重新获取角色列表
          await this.showUserRoleList()
          // 关闭模态框
          this.isShowRoleModal = false

        })
      },
      // 取消
      onClose() {
        // 关闭模态框
        this.isShowRoleModal = false
      },
      // 提交
      onSubmit() {
        // isAddRole
        if (this.roleName.trim() === '') {
          this.$message.error("请输入角色名")
          return
        }
        // 新增修改公用
        let submitRole = {
          roleName: this.roleName,
          // 选中的菜单树节点
          roleQx: this.roleQx,
          // 是否是监考人,默认不是
          invigilator: this.isInvigilator,
          // 功能权限
          btnPermissions: JSON.stringify(this.allGroupSelectData),
          // 首页展示菜单
          indexPermissions: this.displayValue,
          // 角色类型,true或者false是否是超级管理员
          roleType: false,
          // 角色子权限
          // roleQxTwo: [],
          roleQxTwo: this.roleQxTwo,
          // 父级id,默认1000即角色总览
          parentId: "1000",
          // 个人信息还是作战信息
          remarks: true
        }
        if (this.isAddRole) {
          // 新增
          this.$apollo.mutate({
            mutation: require('_graphql/settings/mutation/newRoles.gql'),
            variables: {entity: submitRole}
          }).then(async data => {
            let res = data.data.addRole
            // 提交关联的人员
            await this.$refs.roleToUser.submitRoleToUser(res.data.id, 'add')
            this.$message.success("新增成功")
            // 关闭模态框
            this.isShowRoleModal = false
            // 重新获取角色列表
            this.isShowCard = false
            await this.showUserRoleList()
            this.isShowCard = true
          })

        } else {
          // 修改
          // 多提交一个id
          submitRole.id = this.currentEditUserRoleId
          this.$apollo.mutate({
            mutation: require('_graphql/settings/mutation/updateRole.gql'),
            variables: {entity: submitRole}
          }).then(async data => {
            let res = data.data.updateRole
            if (data.data.updateRole.code === "CODE_500") {
              this.$message.error('提交失败！注册标识有且只能有一个')
              return
            }
            // 提交关联的人员
            await this.$refs.roleToUser.submitRoleToUser(res.data.id, 'update')
            this.$message.success('修改成功')
            // 重新获取角色列表
            await this.showUserRoleList()
            // 关闭模态框
            this.isShowRoleModal = false
          })
        }

      },


      addRoles() {

        // 确认为新增模式标志
        this.isAddRole = true
        // 当前编辑角色id
        this.currentEditUserRoleId = null
        this.isShowRoleModal = true
        // 初始化人员关联框
        // 页面加载完包括此子组件加载完才触发的钩子
        this.$nextTick(() => {
          // 传递add勾选的状态便是为空
          this.$refs.roleToUser && this.$refs.roleToUser.checkPersonByRoleId('add')
          // 清空
          this.onRemove()
        })
      },
      handleCancelModel() {
        this.isShowRoleModal = false
      },
      handleOkModel() {
        this.isShowRoleModal = false
      },
      //数组去重
      unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
      }
    }
  }
</script>


<style lang="less">
  .card-width {
    width: 170px;
    margin: 5px;
    height: 80px;
    float: left;
    border-top: 2px solid;
    border-radius: 5px;
  }

  .activeButton {
    background-color: #235C46;
    color: white;
  }

  .roleNameClass {
    max-width: 45px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
  }


  .ant-checkbox-group-item {
    /*width: 109px !important;*/
  }


</style>
