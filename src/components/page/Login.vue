<template>
<div class="login">
    <div class="ms-login">
        <div class="ms-litle">后台管理系统</div>
        <el-form ref="form" :model="form" :rules="rules" label-width="0px"  class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="form.username" placeholder="username">
                    <el-button slot="prepend" icon="el-icon-user"></el-button>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="password">
                    <el-button slot="prepend" icon="el-icon-goods"></el-button>
                </el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm()" class="login-btn">登录</el-button>
            <p class="login-tips">Tips : 用户名和密码随便填。</p>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '12345'
      },
      rules: {
        username: [
          {required: true, message: 'username', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'password', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success('登录成功')
          localStorage.setItem('ms_username', this.form.username)
          this.$router.push('/')
        } else {
          this.$message.error('请输入账号和密码')
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
    text-align: center;
    color: #fff;

}
.ms-login {
    position: absolute;
    top:50%;
    left: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    background-color: rgba(255,255,255,0.3);
    overflow: hidden;
}
.ms-litle {
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.2);
}
.demo-ruleForm {
    padding: 30px;
}
.login-btn {
    width: 100%;
}
.login-tips {
    font-size: 15px;
    text-align: left;
    margin-top: 10px;
}
</style>
