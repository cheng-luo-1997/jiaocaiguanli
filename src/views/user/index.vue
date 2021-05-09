<template>
  <div class="dashboard-container">
    <div class="filter-container">
      <el-select size="small" v-model="listQuery.sort" style="width: 100px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-input size="small" v-model="listQuery.keyord" placeholder="输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button size="small" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查找
      </el-button>
      <el-button size="small" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95" type="index">
        <!-- <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template> -->
      </el-table-column>
      <el-table-column label="登录名">
        <template slot-scope="scope">
          {{ scope.row.course }}
        </template>
      </el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          {{ scope.row.publiser }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="180" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-text="启用"
            inactive-text="禁用"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left:50px;">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="temp.loginName" />
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input v-model="temp.password1" />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="temp.password2" />
        </el-form-item>
        <el-form-item label="权限" prop="authentic">
          <el-select v-model="temp.authentic" class="filter-item" placeholder="选择权限">
            <el-option label="教师" value="1" />
            <el-option label="教务管理员" value="2" />
            <el-option label="教材科管理员" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getApplyList, createApply } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      dialogFormVisible: false,
      listQuery: {
        page: 1,
        keyword: '',
        sort: '2',
      },
      sortOptions: [
        { key: '0', label: '已启用' },
        { key: '1', label: '未启用' },
        { key: '2', label: '全部' },
      ],
      temp: {
        loginName: '',
        password1: '',
        password2: '',
        authentic: ''
      },
      rules: {
        loginName: [{ required: true, message: '请填写登录名', trigger: 'blur' }],
        password1: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [{ required: true, message: '请确认密码', trigger: 'blur' }],
        authentic: [{ required: true, message: '请选择权限', trigger: 'change' }]
      },
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        book: '',
        publiser: '',
        author: '',
        course: '',
        status: 'draft'
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createApply(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    fetchData() {
      this.listLoading = true
      getApplyList().then(response => {
        this.list = response.data.items;
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
