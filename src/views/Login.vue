<template>
  <div
    style="width: 100%;height: 100%; "
    class="layout-center bgColor_"
  >
    <div
      style="width: 600px;height: 400px;border: 1px solid #000;border-radius: 10px;text-align: center;"
    >
      <div style="margin-top: 60px;font-size: 20px;">xxxx</div>
      <a-input style="width: 75%;margin-top: 20px;" size="large" v-model="email"></a-input>
      <a-input style="width: 75%;margin-top: 20px;" size="large" type="password" v-model="password"></a-input>
      <div class="layout-center" style="margin-top: 20px;">
        <span style="margin-right: 15px;cursor: pointer;" @click="goRegister">没有账号?去注册</span>
        <a-button size="large" @click="gotoLogin" :loading="loginLoading">登录</a-button>
      </div>

    </div>

  </div>
</template>
<script>



  export default {
    data() {
      return {
        loginLoading: false,
        email: '945029149@qq.com',
        password: '123456'

      };
    },
    methods: {
      gotoLogin() {
        this.loginLoading = true
        let submitObj = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch("login/login", submitObj).then(res => {
          this.loginLoading = false
          this.$message.success("登录成功")
          this.$router.push("/")
        }).catch(err => {
          this.loginLoading = false
          console.log(err)
        })

      },
      goRegister() {
        this.$router.push("/register")
      }
    }
  };
</script>