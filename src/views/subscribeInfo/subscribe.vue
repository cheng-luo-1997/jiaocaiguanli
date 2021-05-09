<template>
    <el-form label-width="120px">
      <el-form-item label="ISBN">
        <el-input v-model="bookInfo.isbn"/>
      </el-form-item>
      <el-form-item label="教材名称">
        <el-input v-model="bookInfo.bookName"/>
      </el-form-item>
      <el-form-item label="主编">
        <el-input v-model="bookInfo.editor"/>
      </el-form-item>
       <el-form-item label="出版社">
        <el-input v-model="bookInfo.press"/>
      </el-form-item>
       <el-form-item label="单价">
        <el-input v-model="bookInfo.price"/>
      </el-form-item>
       <el-form-item label="库存">
        <el-input v-model="bookInfo.inventory"/>
      </el-form-item>
       <el-form-item label="征订数量">
        <el-input v-model="subScribeAndBook.acount"/>
      </el-form-item>
       
     <el-form-item>
        <el-button  type="primary" @click="saveSubScribeInfo">保存</el-button>
      </el-form-item>
      </el-form>
</template>

<script>
import subscribe from '@/api/subscribe.js'
import book from '@/api/book.js'

export default {
  
    data(){
        return{
           
            bookInfo:{},
            subScribeAndBook:{}
         

        }
    },
    created(){
        this.init()

    },
    watch:{
        $route(to,from){
          this.init()
        }
    },
    methods:{
    

        init(){
           if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
            this.getrecord(id)
        }else{
          this.bookInfo={}
        }
        },
        getrecord(id) {
            console.log(id)
             book.queryBookInfo(id).then(response => {
             this.bookInfo = response.data.record
    }).catch((response) => {
        this.$message({
            type: 'error',
            message: '获取数据失败'
        })
    })
        },
        saveSubScribeInfo(){
          this.subScribeAndBook.id=this.$route.params.id
          subscribe.subScribe(this.subScribeAndBook)
                 .then(response=>{
                      this.$message({
                      type: 'success',
                      message: '增加成功!'
                  });
                  this.$router.push('/bookInfo/table')
                 })
        },

        saveAndUpdateBookInfo(){
            if(this.$route.params && this.$route.params.id){
            const id = this.$route.params.id
                book.updateBookInfo(id,this.bookInfo)
                       .then(response=>{
                           this.$message({
                           type: 'success',
                           message: '修改成功!'
                           });
                           this.$router.push('/bookInfo/table')
                       }).catch(error=>{
                           this.$message({
                           type: 'success',
                           message: '修改失败，请检查信息!'
                           });
                       })
                
            }else{
                this.saveBookInfo()
            }

        }
    }

}
</script>

<style>

</style>