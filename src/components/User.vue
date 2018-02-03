<template>
  <div><!--style="height: 200px;"-->
    <el-table
      :data="users"
      stripe border height="500"
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
    <div class="dialog">
      <!--dialog-->
      <el-dialog
        title="用户信息"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'User',
    methods: {
      showHandle (row) {
        this.dialogVisible = true
      },
      editHandle (row) {
        this.dialogVisible = true
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
      },
      handleClose () {
        console.log('handleClose')
        this.dialogVisible = false
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
        users: [],
        // dialog
        dialogVisible: false,
        // form
        form: {
          name: '',
          region: ''
        },
        formLabelWidth: '80px'
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
    margin-top: 10px;
  }
</style>
