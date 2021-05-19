<template>
  <div
    style="width: 100%;height: 100%;"
  >
    <div
      style="width: 100%;height: 50px;border-bottom: 1px solid #000;"
    >
      <HeadView></HeadView>
    </div>
    <div style="width: 100%;height: calc(100% - 50px);">
      <router-view></router-view>

    </div>


  </div>
</template>
<script>
  import HeadView from "@/views/layout/Head"
  export default {
    components: {
      HeadView
    },
    data() {
      return {};
    },
    methods: {}
  };
</script>