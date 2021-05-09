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
      <el-button type="success" icon="el-icon-plus" @click="onShowDialog('entry')">入库</el-button>
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
       <el-table-column prop="editor" label="主编" />
        <el-table-column prop="Press" label="出版社" />
         <el-table-column prop="price" label="单价" />
           <el-table-column prop="inventory" label="库存" />
       <el-table-column label="操作" align="center">
            <template v-slot="book">
              <el-button type="primary" size="mini" @click="onShowDialog('out', book.row)">出库</el-button>
            </template>
      </el-table-column>
    </el-table>

    <el-dialog title="填写入库信息" :visible.sync="dialogOneVisible">
      <el-form ref="entryForm" :rules="rulesOne" :model="tempOne" label-position="right" label-width="70px">
        <el-form-item label="教材" prop="book">
          <el-input v-model="tempOne.book"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="tempOne.supplier"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="tempOne.count"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="markup">
          <el-input v-model="tempOne.markup" type="text-area"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOneVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="onConfirmEntry">
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="填写出库信息" :visible.sync="dialogTwoVisible">
      <el-form ref="outForm" :rules="rulesTwo" :model="tempTwo" label-position="right" label-width="70px">
        <el-form-item label="取货人" prop="reciver">
          <el-input v-model="tempTwo.reciver"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="count">
          <el-input v-model="tempTwo.count"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="markup">
          <el-input v-model="tempTwo.markup" type="text-area"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTwoVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="onConfirmOut">
          确认
        </el-button>
      </div>
    </el-dialog>

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
                id: 'shujujigou',
                bookName: '数据结构与算法',
                editor: '张三',
                Press: '人民邮电出版社',
                price: '66',
                inventory: 100,
              }
            ],
            total : 0,
            page:1,
            limit : 8,
            bookInfoQuery:{},
            rulesOne: {
              book: [{ required: true, message: '请填写教材名', trigger: 'blur' }],
              supplier: [{ required: true, message: '请选择供应商', trigger: 'blur' }],
              count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
            },
            rulesTwo: {
              reciver: [{ required: true, message: '请输入取货人', trigger: 'blur' }],
              count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
            },
            tempOne: {
              book: '',
              supplier: '',
              count: '',
              markup: ''
            },
            tempTwo: {
              reciver: '',
              count: '',
              markup: ''
            },
            dialogOneVisible: false,
            dialogTwoVisible: false,
            outBook: null,
        }
    },
    created(){
        this.getList()
    },
    methods:{
        onShowDialog(status, book) {
          if (status === 'entry') {
            this.tempOne = {
              book: '',
              supplier: '',
              count: '',
              markup: ''
            };
            this.dialogOneVisible = true;
            this.$nextTick(() => {
              this.$refs['entryForm'].clearValidate()
            })
          } else {
            this.tempTwo = {
              reciver: '',
              count: '',
              markup: ''
            };
            this.outBook = book;
            this.dialogTwoVisible = true;
            console.log(book);
            this.$nextTick(() => {
              this.$refs['outForm'].clearValidate()
            })
          }
        },
        onConfirmEntry() {
          this.$refs.entryForm.validate(valid => {
            if (valid) {
              this.list.unshift(
                {
                  id: 'book' + Date.now(),
                  bookName: this.tempOne.book,
                  editor: '李四',
                  Press: '北京大学出版社',
                  price: '77',
                  inventory: this.tempOne.count,
                }
              );
              this.dialogOneVisible = false;
              this.$message({
                message: '入库成功！',
                type: 'success'
              });
            }
          })
        },
        onConfirmOut() {
          this.$refs.outForm.validate(valid => {
            if (valid) {
              const count = this.tempTwo.count * 1;
              if (count <= this.outBook.inventory) {
                this.dialogTwoVisible = false;
                this.$set(this.outBook, 'inventory', this.outBook.inventory - count);
                this.$message({
                  message: '出库成功！',
                  type: 'success'
                });
              } else {
                this.$message.error('输入数量有误！');
              }
            }
          })
        },
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

<style>

</style>