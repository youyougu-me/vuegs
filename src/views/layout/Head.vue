<template>
  <div
    style="width: 100%;height: 100%;"
    class="layout-side bgColor2_"
  >
    <div style="height: 100%;" class="layout-left-center">
      <a-icon
        type="home"
        style="font-size: 20px;margin-left: 10px;"
        @click="$router.push('/')"
      />
    </div>
    <div style="height: 100%;" class="layout-right-center">
      <a-popover title="tips">
        <template slot="content">
          <p @click="exitLogin">退出登录</p>
        </template>
        <a-icon type="user" style="font-size: 20px;"></a-icon>
        <span style="margin-right: 20px;margin-left: 5px;">{{$store.state.login.username}}</span>
      </a-popover>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      exitLogin() {
        this.$store
          .dispatch("login/exit")
          .then(res => {
            this.$router.push('/login');
            this.$message.success("成功退出")
          })
          .catch(err => {
            console.log(err)
          });
      }
    }
  }

</script>

<style lang="less" scoped></style>