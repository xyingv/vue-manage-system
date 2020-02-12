<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">后台管理系统</div>
    <div class="header-right">
      <!-- 全屏显示 -->
      <div class="header-right-icon">
        <div class="btn-fullscreen" @click="handelFullScreen">
          <el-tooltip :content="fullscreen?`取消全屏`:`全屏`" effect="dark" placement="bottom">
              <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="el-content">
          <el-tooltip
            effect="dark"
            :content="message?`有${message}条未读消息`:`消息中心`"
            placement="bottom">
              <router-link to="/tabs">
                <i class="el-icon-bell"></i>
              </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 头像 -->
        <div>
          <el-avatar><img src="../../assets/img/img.jpg" /></el-avatar>
        </div>
        <!-- 下拉选择菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" >
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../common/bus'
export default {
  name: 'Header',
  data () {
    return {
      collapse: false,
      fullscreen: false,
      name: 'linxin',
      message: 2
    }
  },
  computed: {
    username () {
      let username = localStorage.getItem('ms_username')// 获取账号数据
      return username || this.name
    }
  },
  created () {
    bus.$on('unread', msg => {
      this.message = msg.length
    })
  },
  methods: {
    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    handleCommand (command) { // 退出登录
      if (command === 'loginout') {
        localStorage.removeItem('ms_username')// 删除已有的账号数据
        this.$router.push('/login')// 跳转到登录页面
      }
    },
    handelFullScreen () {
      let element = document.documentElement
      if (this.fullscreen) { // 退出全屏
        if (document.exitFullscreen) { // W3C
          document.exitFullscreen()
        } else if (document.webkitCancelFullScreen) { // FireFox
          document.webkitCancelFullScreen()
        } else if (document.mozCancelFullScreen) { // Chrome
          document.mozCancelFullScreen()
        } else if (document.esExitFullscreen) { // IE11
          document.mozCancelFullScreen()
        }
      } else { // 进入全屏
        if (element.requestFullscreen) { // W3C
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) { // Chrome等
          element.mozRequestFullScreen()
        } else if (element.msRequestFullScreen) { // IE11
          element.msRequestFullScreen()
        } else if (element.webkitRequestFullScreen) { // FireFox
          element.webkitRequestFullScreen()
        }
      }
      this.fullscreen = !this.fullscreen
    },
    mouted () {
      if (document.body.clientWidth < 1500) {
        this.collapseChage()
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  color: #fff
}
.collapse-btn {
  float: left;
  cursor: pointer;
  padding: 0 21px;
  line-height: 70px;
}
.header .logo {
  float: left;
  line-height: 70px;
}
.header-right {
  float: right;
  padding: 0 21px;
}
.header-right-icon {
  display: flex;
  align-items: center;
  height: 70px;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
  position: relative;
}
.el-content{
  position: relative;
  margin-right: 10px;
  padding: 4px;
}
.el-icon-bell {
  position: relative;
  color: #fff;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
}
.user-name {
  color: #fff;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
.user-name {
  margin-left: 10px;
}

a{text-decoration:none}
</style>
