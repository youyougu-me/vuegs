<template>
  <div class="width-100-per height-100-per">
    <div class="overflow-auto width-100-per" style="height: calc(100% - 40px)">
      <a-tree checkable
              defaultExpandAll
              :treeData="allUserTreeData"
              @check="checkUser"
              v-model="checkedUserArray"
              v-if="allUserTreeData.length>0"
      >
      </a-tree>
    </div>
  </div>
</template>

<script>
  import {Tree} from 'ant-design-vue';

  export default {
    components: {
      ATree: Tree,
    },
    props: {},
    data() {
      return {
        allUserTreeData: [],
        checkedUserArray: [],
        checkedUserArrayOnlyType0: [],
        // 上一次关联的人员只包含子节点++
        // ++这个变量只在提交修改的绑定时起作用
        lastCheckedUserArrayOnlyType0: [],

      }
    },
    mounted() {
      // 组装树
      this.getPeopleTreeData();
    },
    methods: {
      // 清空
      removeAll(){
        this.checkedUserArray = []
        this.checkedUserArrayOnlyType0 = []
        // 上次提交的勾选,不需要清空,因为提交时需要对比啊
        // this.lastCheckedUserArrayOnlyType0 = []
      },
      // 根据角色id查角色下的人员,并在树上勾选
      // 拿给父组件在打开弹框的时候调用
      checkPersonByRoleId(roleId) {
        let testObject = {
          // that.checkedList父组件传过来的角色id
          userRoleId: [roleId],
          check: "0"
        }
        this.$apollo.query({
          query: require('_graphql/settings/query/findRoleUser.gql'),
          variables: {entity: testObject},
          fetchPolicy: 'no-cache'
        }).then(data => {
          // 此角色下的人员
          const findRoleUser = data.data.findRoleUser
          // 人员树选中的id数组
          this.checkedUserArray = [];
          for (let i in findRoleUser) {
            this.checkedUserArray.push(findRoleUser[i].id)
          }
          // 上次勾选的,因为是后端传过来的,所以只包含最底层子节点++
          // 就算是最底层的所有子节点勾选完,此时在页面上父节点被勾选++
          // ++但是打印出来的依然只有最底层子节点的个数
          // console.log(this.checkedUserArray)
          this.lastCheckedUserArrayOnlyType0 = JSON.parse(JSON.stringify(this.checkedUserArray))
          // 同样本次勾选的子节点也当初始化
          this.checkedUserArrayOnlyType0 = JSON.parse(JSON.stringify(this.checkedUserArray))
        }).catch(error => {
          console.log(error)
        })
      },
      // 给父组件提交用
      submitRoleToUser(roleId, type) {
        return new Promise(async (resolve, reject) => {
          if (type === 'add') {
            // 关联人员
            let users = this.checkedUserArrayOnlyType0
            let res = await this.submitRoleToUserApi(roleId, 'add', users)
            resolve(res)
            return
          }
          // 否则便是修改,type = update (需提交本次相对与上次增加的关联人员与减少的关联人员)
          // 关于这两个变量一来都会赋初始值,一个赋初始值后不会变,一个会动态改变
          let lessArr = this.lessItemComLast(this.checkedUserArrayOnlyType0, this.lastCheckedUserArrayOnlyType0)
          let moreArr = this.moreItemComLast(this.checkedUserArrayOnlyType0, this.lastCheckedUserArrayOnlyType0)
          await this.submitRoleToUserApi(roleId, 'add', moreArr)
          let resTwo = await this.submitRoleToUserApi(roleId, 'del', lessArr)
          resolve(resTwo)
        })
      },
      submitRoleToUserApi(roleId, type, arr) {
        return new Promise((resolve, reject) => {
          // console.log(roleId,type)
          this.$apollo.mutate({
            mutation: require('_graphql/settings/mutation/updateUserRole.gql'),
            variables: {roleId: roleId, userIds: arr, mark: type},
            fetchPolicy: 'no-cache'
          }).then(data => {
            resolve(data)
          })
        })

      },
      checkUser(checkedVal, e) {
        this.checkedUserArrayOnlyType0 = []
        if (e.checkedNodes.length === 0) {
          // console.log(this.checkedUserArrayOnlyType0)
          return
        }
        e.checkedNodes.forEach(item => {
          if (item.data.props.type === '0') {
            this.checkedUserArrayOnlyType0.push(item.data.props.dataRef.key)
          }
        })
      },
      // 组装人员树
      getPeopleTreeData() {
        this.$apollo.query({
          query: require('_graphql/settings/query/findAllUsersChecked.gql'),
          variables: {},
          fetchPolicy: 'no-cache'
        }).then(data => {
          // 传递过去的是人员平级数组
          this.transUserArrayToUserTree(data.data.findAllUsersChecked);
        }).catch(error => {
          console.log(error)
        })
      },
      transUserArrayToUserTree(tree) {
        let newTree = []
        for (let r of tree) {
          if (r.parentId === '1') {
            let ct = this.dataTreeDg(r, tree);
            if (ct.length !== 0) {
              newTree.push({
                title: r.name,
                key: r.code,
                type: r.userType,
                children: this.dataTreeDg(r, tree)
              })
            } else {
              newTree.push({
                title: r.name,
                key: r.code,
                type: r.userType,
              })
            }
          }
        }
        this.allUserTreeData = [{
          title: '建制总览',
          key: "1000",
          type: "1",
          children: newTree
        }]
      },
      dataTreeDg(pt, tree) {
        const that = this;
        let newRR = [];
        for (let t of tree) {
          if (pt.id === t.parentId) {
            let ct = that.dataTreeDg(t, tree);
            if (ct.length !== 0) {
              newRR.push({
                title: t.name,
                key: t.code,
                type: t.userType,
                children: ct
              });
            } else {
              newRR.push({
                title: t.name,
                key: t.code,
                type: t.userType,
              });
            }
          }
        }
        return newRR;
      },
      // 工具函数,相比于上次少的元素
      lessItemComLast(checkedUserArrayOnlyType0, lastCheckedUserArrayOnlyType0) {
        let arr = []
        // 第二个有的第一个没得
        arr = lastCheckedUserArrayOnlyType0.filter(item => {
          if (checkedUserArrayOnlyType0.indexOf(item) === -1) {
            return item
          }
        })
        return arr
      },
      // 工具函数,相比于上次多的元素
      moreItemComLast(checkedUserArrayOnlyType0, lastCheckedUserArrayOnlyType0) {
        let arr = []
        // 第一个有的第二个没有
        arr = checkedUserArrayOnlyType0.filter(item => {
          if (lastCheckedUserArrayOnlyType0.indexOf(item) === -1) {
            return item
          }
        })
        return arr
      }
    }
  }
</script>

<style scoped>

</style>