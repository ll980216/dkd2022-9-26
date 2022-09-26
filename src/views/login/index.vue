<template>
  <div class="login-container">
    <div class="formBox">
      <div class="pic-logo">
        <img src="../../assets/common/logo.png" alt="">
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="left"
        :rules="rules"
      >
        <div class="title-container">
          <el-form-item prop="mobile">
            <span class="svg-container el-icon-mobile-phone" />
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container el-icon-lock"> </span>
            <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" />
            <span class="svg-container" @click="showPWD">
              <svg-icon
                :icon-class="passwordType === 'password'? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-form-item class="verify">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="loginForm.verify" placeholder="请输入验证码" class="form-verify" />
            <img :src="imgData" alt="" @click="getIMG" class="r-ver" />
          </el-form-item>
        </div>

        <el-button class="loginBtn" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
  <!-- 环境变量的作用
  1. 正常公司中 有几个环境 4 开发 dev 测试 test 预发 uat 线上 pro
  2. 在项目里如何配置这几个环境  通过 .env 配置 base api
  开发环境的接口前缀 /api
  线上环境的接口前缀 /prod-api
   -->
</template>
<script>
import { validphone } from '@/utils/validate'
import { getImgAPI } from '@/api/login'
export default {
  name: 'Login',
  data() {
    const phonevalid = (rule, value, callback) => {
      // validphone封装的校验规则 value是接收的当前值
      if (!validphone(value)) {
        callback(new Error('格式错误'))
      } else {
        callback()
      }
    }
    return {
      imgData: [],
      passwordType: 'password',
      loginForm: {
        mobile: '13800000002',
        password: '123456',
        verify: null
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: phonevalid,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: '请输入正确的格式',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getIMG() {
      const { data } = await getImgAPI()
      const blob = new Blob([data], { type: 'image/png' })
      const url = window.URL.createObjectURL(blob)
      // console.log(blob)
      this.imgData = url
    },
    showPWD() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async login() {
      try {
        // 返回promise
        await this.$refs.loginForm.validate()
        // 规则验证成功转圈
        this.loading = true
        await this.$store.dispatch('user/loginActions', this.loginForm)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.getIMG()
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #b39999;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url("~@/assets/common/background.png"); // 设置背景图片
  // background-position: center; // 将图片位置设置为充满整个屏幕
  background-size: cover;
  .formBox {
    position: relative;
    width: 518px;
    height: 388px;
    background-color: #fff;
    margin: auto;
    transform: translateY(50%);
    border-radius: 10px;
    .pic-logo {
      position: absolute;
      width: 96px;
      height: 96px;
      // background-color: #407ffe;
      transform: translateY(-50%);
      left: 50%;
      margin-left: -48px;
      img {
        width: 100%;
      }
    }
  }
  .el-input {
    display: inline-block;
    height: 52px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      height: 52px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
  }
  .el-form-item__error {
    color: #fff;
  }

  .loginBtn {
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    height: 52px;
    line-height: 32px;
    font-size: 14px;
    width: 100%;
    border: none;
    color: #fff;
    border-radius: 8px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 76px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 16px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.verify {
  position: relative;
  height: 52px;
  width: 448px;
  overflow: hidden;
}
.form-verify {
  position: absolute;
  left: 30;
  width: 280px;
    // background-color: #2e50e1;
  }
  .r-ver {
    position: absolute;
    right: 0;
    height: 52px;
  }
</style>
