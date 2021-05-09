<template>
    <div class="app-container">
         <el-form :inline="true" class="demo-form-inline">
           <el-form-item>
             <el-select v-model="subscribeinfoQuery.type" placeholder="选择类型" @change="onChangeType">
               <el-option label="出库" value="0"></el-option>
               <el-option label="入库" value="1"></el-option>
             </el-select>
           </el-form-item>
       <el-form-item>
        <el-input v-model="subscribeinfoQuery.bookName" placeholder="输入关键字"/>
      </el-form-item>
       <el-form-item>
        <el-date-picker
          v-model="subscribeinfoQuery.subscribeTime"
          type="datetime"
          placeholder="选择时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
     
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
       <el-table
          v-if="subscribeinfoQuery.type === '0'"
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
          <el-table-column prop="bookName" label="书籍名称" />
          <el-table-column prop="editor" label="主编" />
          <el-table-column prop="Press" label="出版社" />
          <el-table-column prop="price" label="单价" />
          <el-table-column prop="count" label="出库数量" />
          <el-table-column prop="time" label="出库时间" />
          <el-table-column prop="reciver" label="取货人" />
          <el-table-column prop="markup" label="备注" />
        </el-table>
        <el-table
          v-else
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
          <el-table-column prop="bookName" label="书籍名称" />
          <el-table-column prop="editor" label="主编" />
          <el-table-column prop="Press" label="出版社" />
          <el-table-column prop="price" label="单价" />
          <el-table-column prop="count" label="入库数量" />
          <el-table-column prop="time" label="入库时间" />
          <el-table-column prop="reciver" label="供应商" />
          <el-table-column prop="markup" label="备注" />
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
import subscribe from '@/api/subscribe.js'
export default {

    data(){
        return {
            list:[
              {
                bookName: '数据结构与算法',
              editor: '张三',
              Press: '人民邮电出版社',
              price: '66',
              count: '32',
              time: '2020-9-1 15:00',
              reciver: '李四',
              markup: '教材领取'
              }
            ],
            total : 0,
            page:1,
            limit : 8,
            subscribeinfoQuery:{
              type: '0'
            }

        }
    },
    created(){
        // this.getList()
    },
    methods:{
      onChangeType() {
        // console.log(this.subscribeinfoQuery.type);
      },
        getList(page=1){
            this.page=page,
            subscribe.getPageList(this.page,this.limit,this.subscribeinfoQuery)
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
          this.$confirm('此操作将永久删除该教材信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          book.deleteid(id)
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
          this.bookInfoQuery={}
          this.getList()
        }
    }

}
</script>

<style>

</style>