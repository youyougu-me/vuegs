<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="user"/><span @click="goToTheRouter(menuInfo)">{{ menuInfo.title }}</span>
        </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.key">
        <a-icon type="pie-chart"/>
        <span @click="goToTheRouter(item)">{{ item.title }}</span>
      </a-menu-item>
      <LoopSubmenu v-else :menuInfo="item" :key="item.key"></LoopSubmenu>
    </template>
  </a-sub-menu>
</template>

<script>
  import LoopSubmenu from "@/components/LoopSubmenu"
  import {Menu} from 'ant-design-vue';

  export default {
    // 这个必填
    // 必须保证与官网的模板一样
    name: 'LoopSubmenu',
    isSubmenu: true,
    props: {
      ...Menu.SubMenu.props,
      menuInfo: {
        type: Object,
        default: () => ({})
      },

    },
    components: {
      LoopSubmenu
    },
    data() {
      return {}
    },
    methods:{
      goToTheRouter(item) {
        console.log("点击了路由")
        if (item.path) {
          this.$router.push(item.path)
        }
      }
    }

  }

</script>

<style lang="less" scoped></style>