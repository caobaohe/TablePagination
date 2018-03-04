<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-gray-light">
          <el-button type="primary" @click="onSearch" icon="el-icon-search" size="small">查询</el-button>
          <el-button type="primary" @click="onCreate" icon="el-icon-plus" size="small">新增</el-button>
        </div>
      </el-col>
    </el-row>
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
      <el-table-column prop="created" label="创建时间" width="180" :formatter="dateFormatter"></el-table-column>
      <el-table-column prop="updated" label="更新时间" width="180" :formatter="dateFormatter"></el-table-column>

      <el-table-column
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button @click="showHandle(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="editHandle(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="delHandle(scope.row)" type="text" size="small">删除</el-button>
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
    <!--dialog-->
    <el-dialog
      title="用户信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose" :modal-append-to-body="false">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="region">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="男" value="0"></el-option>
            <el-option label="女" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="showDialogFooter">
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: 'User',
    methods: {
      onSearch () {
        this.$message({
          type: 'error',
          message: '错误',
          showClose: true
        })
      },
      onCreate () {
        this.showDialogFooter = true
        this.dialogVisible = true
      },
      showHandle (row) {
        this.showDialogFooter = false
        this.dialogVisible = true
      },
      editHandle (row) {
        this.showDialogFooter = true
        this.dialogVisible = true
        this.form = row
      },
      delHandle (row) {
        console.log(row)
        var self = this
        self.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$ajax({
            method: 'get',
            url: 'user/delete/' + row.id
          }).then(function (res) {
            if (res.data.code === '200') {
              self.$message({
                message: '删除成功',
                type: 'success',
                showClose: true
              })
              self.loadTable()
            } else {
              self.$message({
                message: '删除出错了',
                type: 'error',
                showClose: true
              })
            }
          }).catch(function (err) {
            console.log(err)
            self.$message({
              message: '网络错误！',
              type: 'error',
              showClose: true
            })
          })
        }).catch(() => {
//          self.$message({
//            type: 'info',
//            message: '已取消删除'
//          })
        })
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
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!')
            var self = this
            self.$ajax({
              method: 'post',
              url: 'user/add',
              headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
              params: self.form
            }).then(function (res) {
              console.log(res)
              if (res.data.code === '200') {
                self.$message({
                  message: '保存成功',
                  type: 'success',
                  showClose: true
                })
                self.dialogVisible = false
                self.loadTable()
              } else {
                self.$message({
                  message: '错误了',
                  type: 'error',
                  showClose: true
                })
              }
            }).catch(function (err) {
              console.log(err)
              self.$message({
                message: '网络错误！',
                type: 'error',
                showClose: true
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
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
        showDialogFooter: true,
        // form
        form: {
          username: '',
          region: '',
          phone: '',
          email: ''
        },
        formLabelWidth: '80px',
        rules: {
          username: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择性别'}
          ],
          phone: [
            {required: true, message: '请输入手机号'}
          ],
          email: [
            {required: true, message: '请输入邮箱'}
          ]
        }
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

<style lang="scss">
  .pagination {
    text-align: center;
    margin-top: 10px;
  }

  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-gray-dark {
    background: #ebeef5;
  }

  .bg-gray-light {
    /*background: #f2f2f2;*/
    background: #FAFAFA;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
