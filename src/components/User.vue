<template>
  <div style="height: 200px;">
    <el-table
      :data="users"
      stripe border height="620"
      style="width: 100%;">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>

      <el-table-column
        prop="username"
        label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="password" label="密码" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
      <el-table-column prop="email" label="Email" width="150"></el-table-column>
      <el-table-column prop="created" label="创建时间" width="200" :formatter="dateFormatter"></el-table-column>
      <el-table-column prop="updated" label="更新时间" width="200" :formatter="dateFormatter"></el-table-column>

      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showHandle(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editHandle(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        background
        layout="jumper, prev, pager, next, sizes, total"
        :total="total"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 100, 200]"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    methods: {
      showHandle (row) {
      },
      editHandle (row) {
        alert(row)
      },
      dateFormatter (row, column, cellValue) {
        return this.$moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
      },
      currentChange (currentPage) {
        var self = this
        self.currentPage = currentPage
        self.loadTable()
      },
      sizeChange (size) {
        var self = this
        self.pageSize = size
        self.loadTable()
      },
      loadTable () {
        var self = this
        self.$ajax({
          method: 'get',
          url: 'user/list',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          params: {
            page: self.currentPage,
            limit: self.pageSize
          }
        }).then(function (res) {
          self.users = res.data.data
          self.total = res.data.count
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    data () {
      return {
        // 分页总数
        total: 0,
        // 当前页码
        currentPage: 1,
        // 分页大小
        pageSize: 10,
        users: []
      }
    },
    created: function () {
      var self = this
      self.loadTable()
    },
    mounted: function () {

    }
  }
</script>

<style>
  .pagination {
    text-align: center;
  }
</style>
