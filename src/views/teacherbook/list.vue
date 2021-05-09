<template>
    <div class="app-container">
         <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.teachername" placeholder="教师名称"/>
      </el-form-item>
      <el-form-item label="所在院系">
        <el-select v-model="teacherQuery.college" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="信息科学与工程学院"/>
          <el-option :value="2" label="外语学院"/>
          <el-option :value="3" label="马克思主义学院"/>
          <el-option :value="4" label="管理学院"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getTeacherList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
       <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="姓名" width="80" />
      <el-table-column prop="classroom" label="班级" width="160"/>
       <el-table-column label="学院" width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.college==1">信息科学与工程学院</span>
          <span v-if="scope.row.college==2">外语学院</span>
          <span v-if="scope.row.college==3">马克思主义学院</span>
          <span v-if="scope.row.college==4">管理学院</span>
        </template>
      </el-table-column>
       <el-table-column prop="username" label="账号" width="160"/>
       <el-table-column prop="password" label="密码" width="80"/>
       <el-table-column>
        <template slot-scope="scope">
          <router-link :to="'/teacherbook/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteid(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getTeacherList"
    />
    </div>
</template>

<script>
import teacher from '@/api/teacherbook.js'
export default {

    data(){
        return {
            list:null,
            total : 0,
            page:1,
            limit : 8,
            teacherQuery:{}

        }
    },
    created(){
        this.getTeacherList()
    },
    methods:{
        getTeacherList(page=1){
            this.page=page,
            teacher.getPageList(this.page,this.limit,this.teacherQuery)
            .then(response=>{
                console.log(response.data.rows)
                this.list=response.data.rows,
                this.total = response.data.total
            })
            .catch(error=>{
                console.log(error)
            })
            
        },
        //删除一个讲师
        deleteid(id){
          this.$confirm('此操作将永久删除该讲师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          teacher.deleteid(id)
                 .then(response=>{
                   this.$message({
                  type: 'success',
                 message: '删除成功!'
                  });
               this.getTeacherList()
                 })
                 .catch(error=>{
                   alert("删除失败")
                 }) 
          
        })


        },

        resetData(){
          this.teacher={}
          this.getTeacherList()
        }
    }

}
</script>

<style>

</style>