<template>
    <div class="app-container">
         <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="bookInfoQuery.isbn" placeholder="ISBN"/>
      </el-form-item>
       <el-form-item>
        <el-input v-model="bookInfoQuery.bookName" placeholder="教材名称"/>
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
      <el-table-column prop="bookName" label="教材名称" />
      <el-table-column prop="price" label="单价" />
      <el-table-column prop="count" label="出库数量" />
      <el-table-column prop="totalCost" label="出库价" />
      <el-table-column prop="supplierId" label="学生编号" />
      <el-table-column prop="supplier" label="学生名称" />
      <el-table-column prop="entryTime" label="出库时间" />
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
import book from '@/api/book.js'
export default {

    data(){
        return {
            list:[
              {
                bookName: '数据结构与算法',
                price: '60',
                count: '30',
                totalCost: '1800',
                supplierId: 'gysbh1',
                supplier: 'xxxxxx供应商',
                entryTime: '2020-9-1'
              }
            ],
            total : 0,
            page:1,
            limit : 8,
            bookInfoQuery:{},
        }
    },
    created(){
        this.getList()
    },
    methods:{
        getList(page=1){
            this.page=page,
            book.getPageList(this.page,this.limit,this.bookInfoQuery)
            .then(response=>{
                console.log(response.data.rows)
                this.list=response.data.rows,
                this.total = response.data.total
            })
            .catch(error=>{
                console.log(error)
            })
            
        },
        resetData(){
          this.bookInfoQuery={}
          this.getList()
        }
    }

}
</script>