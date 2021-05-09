<template>
    <div class="app-container">
         <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="supplieInfoQuery.supplierName" placeholder="供应商名称"/>
      </el-form-item>
     
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
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
      <el-table-column prop="supplierId" label="供应商id" width="80" />
      <el-table-column prop="supplierName" label="供应商名称" width="160"/>
       <el-table-column prop="tel" label="供应商电话" width="160"/>
       <el-table-column>
        <template slot-scope="scope">
          <router-link :to="'/supplieInfo/edit/'+scope.row.id">
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
      @current-change="getList"
    />
    </div>
</template>

<script>
import supplie from '@/api/supplie.js'
export default {

    data(){
        return {
            list:null,
            total : 0,
            page:1,
            limit : 8,
            supplieInfoQuery:{}

        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
            this.page=page,
            supplie.getPageList(this.page,this.limit,this.supplieInfoQuery)
            .then(response=>{
                console.log(response.data.rows)
                this.list=response.data.rows,
                this.total = response.data.total
            })
            .catch(error=>{
                console.log(error)
            })
            
        },
        //删除一个供应商
        deleteid(id){
          this.$confirm('此操作将永久删除该供应商信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          supplie.deleteid(id)
                 .then(response=>{
                   this.$message({
                  type: 'success',
                 message: '删除成功!'
                  });
               this.getList()
                 })
                 .catch(error=>{
                   alert("删除失败")
                 }) 
          
        })


        },

        resetData(){
          this.teacherQuery={}
          this.getList()
        }
    }

}
</script>

<style>

</style>