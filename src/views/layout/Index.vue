<template>
  <div
    style="width: 100%;height: 100%;"
    :style="'background-color:'+$bgColor"
  >
    <div
      style="width: 100%;height: 50px;"
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