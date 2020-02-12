<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover">
                    <div class="D-admin">
                        <div class="D-left">
                            <el-avatar :size="120"><img src="../../assets/img/img.jpg" /></el-avatar>
                        </div>
                        <div class="D-right">
                            <div>admin</div>
                            <div class="D-right-admin">超级管理员</div>
                        </div>
                    </div>
                    <div class="border-bottom"></div>
                    <div class="D-time">
                        <div class="D-time-left">上次登录时间:</div>
                        <div class="D-time-right">2019-11-01</div>
                    </div>
                    <div class="D-time">
                        <div class="D-time-left">上次登录地点:</div>
                        <div class="D-time-right">东莞</div>
                    </div>
                </el-card>
                <el-card shadow="hover"  style="height:250px;">
                    <div class="lang">语言详情</div>
                    Vue
                    <el-progress :percentage="71"></el-progress>
                    Javascript
                    <el-progress :percentage="75" color="#f56c6c"></el-progress>
                    CSS
                    <el-progress :percentage="75" color="#e6a23c"></el-progress>
                    HTML
                    <el-progress :percentage="70" color="green"></el-progress>
                </el-card>
            </el-col>
        <el-col :span="16">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid grid-1">
                            <i class="el-icon-user grid-img"></i>
                            <div class="grid-info">
                                <div class="grid-number">1234</div>
                                <div class="grid-text">用户访问量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid grid-2">
                            <i class="el-icon-bell grid-img"></i>
                            <div class="grid-info">
                                <div class="grid-number ">535</div>
                                <div class="grid-text">系统消息</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover" :body-style="{padding: '0px'}">
                        <div class="grid grid-3">
                            <i class="el-icon-user grid-img"></i>
                            <div class="grid-info">
                                <div class="grid-number">4543</div>
                                <div class="grid-text">数量</div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-card shadow="hover" style="height:403px;">
                <div slot="header" class="clearfix">
                    <span>待办事项</span>
                    <el-button style="float:right; padding-right: 20px" type="text">添加</el-button>
                </div>
                <el-table :data="todoList" :show-header="false" style="width: 100%">
                    <el-table-column width="40">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.status"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot-scope="scope">
                            <div class="todo-item" :class="{'todo-item-del':scope.row.status}">
                                {{scope.row.title}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="60">
                        <i class="el-icon-edit"></i>
                        <i class="el-icon-delete"></i>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart class="schart" canvasId="bar" :options="options" />
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart class="schart" canvasId="line" :options="options2" />
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script>
import Schart from 'vue-schart'
export default {
  name: 'Dashboard',
  components: {
    Schart
  },
  data () {
    return {
      todoList: [
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: false
        },
        {
          title: '今天要修复100个bug',
          status: true
        },
        {
          title: '今天要写100行代码加几个bug吧',
          status: true
        }
      ],
      options: {
        type: 'bar',
        title: {
          text: '最近一周各品类销售图'
        },
        labels: ['周一', '周二', '周三', '周四', '周五'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 190, 135, 160]
          },
          {
            label: '食品',
            data: [144, 198, 150, 235, 120]
          }
        ]
      },
      options2: {
        type: 'line',
        title: {
          text: '最近几个月各品类销售趋势图'
        },
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            label: '家电',
            data: [234, 278, 270, 190, 230]
          },
          {
            label: '百货',
            data: [164, 178, 150, 135, 160]
          },
          {
            label: '食品',
            data: [74, 118, 200, 235, 90]
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.el-card {
    margin-bottom: 20px;
}
.D-admin {
    display: flex;
    width:79%;
    margin-bottom:.7em;
}
.lang {
    padding-bottom: 10px;
    border-bottom: .5px solid #ccc;
    margin-bottom: 5px;
}
.D-left {
    width: 130px;
}
.D-right {
    flex: 1;
    text-align: center;
    padding-top: 30px;
    font-size: 1.5em;
}
.D-right-admin {
    font-size: .47em;
    color: #aaa;
}
.border-bottom {
    height: .1em;
    background: #ccc;
    margin-bottom: 1em;
}
.D-time {
    height: 25px;
}
.D-time-left {
    width: 130px;
    font-size: .7em;
    color: #aaa;
}
.D-time-right {
    position: relative;
    top: -1.2em;
    left: 47%;
    font-size: .7em;
    color: #aaa;
}
.grid {
    display: flex;
}
.grid-1 {
    background: rgb(65, 128, 243);
}
.grid-2 {
    background: rgb(115, 207, 115);
}
.grid-3 {
    background: orangered;
}
.grid-3 .grid-number {
    color: orangered;
}
.grid-img {
    width: 100px;
    height: 100px;
    font-size: 50px;
    line-height: 100px;
    text-align: center;
    color: #fff;
}
.grid-info {
    flex: 1;
    text-align: center;
    padding-top: 20px;
    background: #fff;
}
.grid-number {
    font-size: 1.5em;
    font-weight: 600;
    color: rgb(65, 128, 243);
}
.grid-text {
    font-size: .7em;
    color: #ccc

}
.todo-items{
    font-size: 14px;
}
.todo-item-del {
    text-decoration: line-through;
    color: #aaa;
}
.schart {
    width: 100%;
    height: 300px;
}
</style>
