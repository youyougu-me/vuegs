<template>
  <div style="width: 100%;height: 100%;">
    <a-tree-select
      style="width: 250px;"
      v-model="checkedKeys"
      :treeData="treeData"
      treeDefaultExpandAll
      :dropdownStyle="{maxHeight:'400px',overflow:'auto'}"
      @change="onSelect"/>
  </div>
</template>

<script>
  export default {
    props: ['component'],
    data() {
      return {
        treeData: [],
        checkedKeys: []
      }
    },
    mounted() {
      this.getTreeData()
    },
    methods: {
      onSelect() {
        // console.log(this.checkedKeys)
        this.$emit('update:component', this.checkedKeys)
      },
      getTreeData() {
        let treeArr = []
        let page = require.context('@/views', true, /.vue$/).keys();
        page.forEach(item => {
          // let item2 = item.substring(0, item.length - 4)
          let item2 = item
          // console.log(item2)
          let arr = item2.split('/')
          // console.log(arr)
          arr.forEach((ele, index) => {
            let path = ''
            let parentId = ''
            for (let i = 0; i <= index; i++) {
              if (i == 0) {
                path = '.'
                parentId = ''
              } else {
                path = path + '/' + arr[i]
                parentId = path.substring(0, path.length - arr[index].length - 1)
              }
            }
            let obj = {
              name: ele,
              path: path,
              id: path,
              parentId: parentId
            }
            treeArr.push(obj)
          })
        })
        // 去重
        treeArr = this.unique(treeArr)
        this.treeData = this.dgTree(treeArr, '.')
      },
      // 组装树
      dgTree(arr, num) {
        // console.log(arr)
        let needArr = []
        arr.forEach(item => {
          if (item.parentId === num) {
            needArr.push({
              title: item.name,
              key: item.id,
              value: item.id,
              path: item.id,
              children: this.dgTree(arr, item.id)
            })
          }
        })
        return needArr
      },
      unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1));
      },
    },
  }

</script>

<style lang="less" scoped></style>