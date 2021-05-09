<template>
  <div style="width: 100%;height: 100%;" class="layout-left-center">
    <div style="width: 250px;height: 100%;border-right: 1px solid rgba(0, 0, 0, 0.2);" class="bgColor_">
      <SideMenu></SideMenu>
    </div>
    <div style="width: calc(100% - 250px);height: 100%;" class="bgColor_">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SideMenu from "@/components/SideMenu.vue";

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