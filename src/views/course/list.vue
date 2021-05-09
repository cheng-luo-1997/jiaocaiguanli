<template>
    <div class="app-container">
         <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker
          v-model="courseQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="courseQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getCourseList()">查询</el-button>
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
      <el-table-column prop="title" label="课程名称" width="100" />
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status==="Normal"?'已发布':'未发布' }}
        </template>
      </el-table-column>
     <el-table-column label="课程浏览数量" prop="viewCount" width="120"/>
     <el-table-column label="课程购买数量" prop="buyCount" width="120"/>
 
      <el-table-column prop="price" label="价格" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>
           <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑大纲信息</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteid(scope.row.id)">删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getCourseList"
    />
    </div>
</template>

<script>
import course from '@/api/course.js'
export default {

    data(){
        return {
            list:null,
            total : 0,
            page:1,
            limit : 8,
            courseQuery:{}

        }
    },
    created(){
        this.getCourseList()
    },
    methods:{
        getCourseList(page=1){
            this.page=page,
            course.getCourseList(this.page,this.limit,this.courseQuery)
            .then(response=>{
                console.log(response.data.rows)
                this.list=response.data.rows,
                this.total = response.data.total
            })
            .catch(error=>{
                console.log(error)
            })
            
        },
        deleteid(id){
          this.$confirm('此操作将永久删除该讲师信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          course.deleteCourse(id)
                 .then(response=>{
                   this.$message({
                  type: 'success',
                 message: '删除成功!'
                  });
               this.getCourseList()
                 })
                 .catch(error=>{
                   alert("删除失败")
                 }) 
          
        })

        },
        

        resetData(){
          this.courseQuery={}
         
        }
    }

}
</script>

<style>

</style>