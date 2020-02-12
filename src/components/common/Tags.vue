<template>
  <div class="tags" v-if="showTags">
    <ul>
      <li class="tags-li" v-for="(item,index) of tagsList" :key="index" :class="{'active':isActive(item.path)}">
        <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
        <span class="tags-li-icon" @click="handleTag(index)"><i class="el-icon-close"></i></span>
      </li>
    </ul>
    <div  class="tags-close-box">
      <el-dropdown @command="handleClose">
        <el-button size="mini" type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      tagsList: []
    }
  },
  methods: {

    // 获取每一个li的样式
    isActive (path) {
      return path === this.$route.fullPath
    },

    // 创建标签——1存入数据 2超出8个剔除 3有相同的数据就直接返回不存
    setTags (route) {
      const isExit = this.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExit) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
    },

    // 判断按钮——执行对应函数
    handleClose (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    handleTag (index) {
      // 关闭单个函数
      this.tagsList.splice(index, 1)
      if (this.tagsList.length === 0) {
        this.$router.push('/')
      }
    },
    // 关闭其他函数
    closeOther () {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 关闭所有函数
    closeAll () {
      this.tagsList = []
      this.$router.push('/')
    }
  },
  computed: {
    // li里的数据 > 1
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    // 监听route有变化立即显示最新的
    $route (newValue, oldValue) {
      this.setTags(newValue)
    }
  },
  created () {
    // 加载完成后给创建标签函数充入数据
    this.setTags(this.$route)
  }
}
</script>

<style scoped>
.tags {
  position: relative;
  background: #fff;
  box-shadow: 0 5px 10px #ddd;
  overflow: hidden;
}
.tags-li {
  display: inline-block;
  margin: 5px;
  border: .5px solid #ccc;
  font-size: .5em;
  padding: 3px 15px;
  line-height: 15px;
  border-radius: 3px;
  cursor: pointer;
}
.tags-li:not(.active):hover {
  background: #f8f8f8;
}
.tags-li-title{
  max-width: 80px;
  color: rgb(99, 94, 94);
}
.tags-li.active .tags-li-title {
    color: #fff;
}
.tags-close-box {
  position: absolute;
  top: 1px;
  right: 5px;
  background: #fff;
}
.tags-li-icon {
  color: rgb(99, 94, 94);
  text-align: center;
  margin-left: 5px;
}
.tags-li.active .tags-li-icon {
    color: #fff;
}
</style>
