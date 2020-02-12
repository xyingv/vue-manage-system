<template>
<div>
    <div class="crumbs">
        <el-breadcrumb>
            <el-breadcrumb-item><i class="el-icon-document-checked"></i>tab选项卡</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-tabs v-model="message">
            <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                <el-table :show-header="false" :data="unread"  style="width: 100%">
                    <el-table-column>
                        <template slot-scope="scope">
                            <span class="message-title">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="date" width="150"></el-table-column>
                    <el-table-column  width="120">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle-row">
                    <el-button  type="primary" @click="handleAllRead">全部标记为已读</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                <el-table :show-header="false" :data="read" style="width: 100%">
                    <el-table-column>
                        <template slot-scope="scope">
                            <span class="message-title">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="date" width="180">
                    </el-table-column>
                     <el-table-column width="150">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" @click="handleDel(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle-row">
                    <el-button type="danger" @click="handleAllDel">全部删除</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                <el-table :data="recycle" :show-header="false" style="width: 100%">
                    <el-table-column>
                        <template slot-scope="scope">
                            <span class="message-title">{{scope.row.title}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="150">
                        <template slot-scope="scope">
                            <span>{{scope.row.date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120">
                        <template slot-scope="scope">
                            <el-button size="small" @click="handleRec(scope.$index)">还原</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="handle-row">
                    <el-button type="danger" @click="handleAllRec">清空回收站</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</div>
</template>

<script>
import bus from '../common/bus'
export default {
  name: 'Tabs',
  data () {
    return {
      message: 'first',
      unread: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }, {
        date: '2018-04-19 21:00:00',
        title: '今晚12点整发大红包，先到先得'
      }],
      read: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      },
      {
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }],
      recycle: [{
        date: '2018-04-19 20:00:00',
        title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
      }]
    }
  },
  methods: {
    handleRead (index) {
      this.read.splice(0, 0, this.unread[index])
      this.unread.splice(index, 1)
      bus.$emit('unread', this.unread)
    },
    handleAllRead () {
      this.read = this.read.concat(this.unread)
      this.unread = []
    },
    handleDel (index) {
      this.recycle.splice(0, 0, this.read[index])
      this.read.splice(index, 1)
    },
    handleAllDel () {
      this.recycle = this.recycle.concat(this.read)
      this.read = []
    },
    handleRec (index) {
      this.read.splice(0, 0, this.recycle[index])
      this.recycle.splice(index, 1)
    },
    handleAllRec () {
      this.recycle = []
    }
  }
}
</script>

<style scoped>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>
