<template>
  <div style="width: 100%;height: 100%;" class="layout-left-top">
    <!--左S-->
    <div style="width: 300px;height: 100%;" class="border-right">
      <PersonTree></PersonTree>
    </div>
    <!--左E-->
    <!--中S-->
    <div style="width: calc(100% - 350px);height: 100%;" class="border-right">


    </div>
    <!--中E-->
  </div>
</template>

<script>
  import PersonTree from "@/components/module/setting_person/PersonTree";

  export default {
    components: {
      PersonTree
    },
    data() {
      return {}
    },
    async mounted() {
    },
    methods: {}
  }


</script>

<style lang="less" scoped></style>