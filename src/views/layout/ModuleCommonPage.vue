<template>
  <div style="width: 100%;height: 100%;" class="layout-left-center">
    <div style="width: 250px;height: 100%;" class="border-right">
      <SideMenu></SideMenu>
    </div>
    <div style="width: calc(100% - 250px);height: 100%;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SideMenu from "@/components/module/layout/SideMenu";

  export default {
    components: {
      SideMenu,
    },
    data() {
      return {

      };
    },
    created() {
    },
    methods: {},
  };

</script>

<style lang="less" scoped></style>