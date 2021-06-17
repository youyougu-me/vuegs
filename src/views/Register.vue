<template>
  <div
    style="width: 100%;height: 100%; "
    class="layout-center bgColor_"
  >
    <div
      style="width: 600px;height: 400px;border: 1px solid #000;border-radius: 10px;text-align: center;"
    >
      <div style="margin-top: 60px;font-size: 20px;">用户注册</div>
      <a-input style="width: 75%;margin-top: 20px;" size="large" placeholder="请填写公司校验码" v-model="companyId"></a-input>
      <a-input style="width: 75%;margin-top: 20px;" size="large" placeholder="请填写用户名" v-model="personName"></a-input>
      <a-input style="width: 75%;margin-top: 20px;" size="large" placeholder="请填写邮箱" v-model="email"></a-input>
      <a-input style="width: 75%;margin-top: 20px;" size="large" type="password" placeholder="请输入密码"
               v-model="password"></a-input>
      <div class="layout-center" style="margin-top: 20px;">
        <span style="margin-right: 15px;cursor: pointer;" @click="goLogin">已经注册?去登录</span>
        <a-button size="large" @click="register" :loading="resgisterLoading">注册</a-button>
      </div>

    </div>

  </div>
</template>
<script>

  import {ReGister} from "@/api/login";

  export default {
    data() {
      return {
        resgisterLoading:false,
        companyId: '',
        personName: '',
        email: '',
        password: ''
      };
    },
    methods: {
      register() {
        this.resgisterLoading = true
        let submitObj = {
          companyId: this.companyId,
          personName: this.personName,
          email: this.email,
          password: this.password,
          // 默认值
        }
        ReGister(submitObj).then((res, err) => {
          let errObj = res.meta.msg
          for (let key in errObj) {
            if (key === 'emailSuccessErr') {
              this.$message.success(errObj[key])
              this.resgisterLoading = false
              break;
            } else {
              this.$message.error(errObj[key])
              break;
            }
          }
          this.resgisterLoading = false
        })
      },
      goLogin(){
        this.$router.push("/login")
      }
    }
  };
</script>