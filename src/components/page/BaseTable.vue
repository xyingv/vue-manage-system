<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i>基础表格</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button
         type="primary"
         icon="el-icon-delete"
         class="handle-del mr10"
         @click="delAllSelection">批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" value="广东省" label="广东省"></el-option>
          <el-option key="2" value="湖南省" label="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        border
        :data="tableData"
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        header-cell-class-name="table-header">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" align="center" label="ID" width="55"></el-table-column>
        <el-table-column prop="name" label="用户名" width="180"></el-table-column>
        <el-table-column label="账户余额">
          <template slot-scope="scope">￥{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column align="center" label="头像(查看大图)">
          <template slot-scope="scope">
            <el-image
            class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')">{{scope.row.state}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handlePageChange"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          layout="total, prev, pager, next"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="收货地址" :visible.sync="editVisible">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index'
export default {
  name: 'BaseForm',
  data () {
    return {
      query: {
        address: '',
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },

      list: [],
      tableData: [],
      multipleSelection: [],
      ids: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData () {
      fetchData(this.query).then(res => {
        this.list = res.list
        this.tableData = this.list
        this.pageTotal = res.pageTotal || 50
      })
    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index
      this.form = row
      this.editVisible = true
    },
    // 保存编辑
    saveEdit () {
      this.editVisible = false
      this.$set(this.tableData, this.idx, this.form)
    },
    // 删除
    handleDelete () {
      // 二次确认删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((index, row) => {
          this.$message.success('删除成功')
          this.tableData.splice(index, 1)
        })
        .catch(() => {})
    },
    // 多选
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 删除多选提示
    delAllSelection () {
      const length = this.multipleSelection.length
      let str = ''
      const delList = []
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
        delList.push(this.multipleSelection[i].name)
      }
      this.$message.error(`删除了${str}`)
      this.multipleSelection = []
      this.tableData = this.tableData.filter(item => !(delList.includes(item.name)))
    },
    getSearch () {
      const result = []
      this.list.forEach((value) => {
        if (value.name.indexOf(this.query.name) > -1 && value.address.indexOf(this.query.address) > -1) {
          result.push(value)
        }
      })
      this.tableData = result
    },
    // 触发搜索按钮
    handleSearch (val) {
      this.$set(this.query, 'pageIndex', 1)
      this.getSearch()
    },
    // 分页导航
    handlePageChange (val) {
      this.$set(this.query, 'pageIndex', val)
      this.getData()
    }
  }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
