<template>
    <el-form label-width="120px">
      <el-form-item label="供应商id">
        <el-input v-model="supplieInfo.supplierId"/>
      </el-form-item>
      <el-form-item label="供应商名称">
        <el-input v-model="supplieInfo.supplierName"/>
      </el-form-item>
      <el-form-item label="供应商电话">
        <el-input v-model="supplieInfo.tel"/>
      </el-form-item>
     <el-form-item>
        <el-button  type="primary" @click="saveandupdatesupplie">保存</el-button>
      </el-form-item>
      </el-form>
</template>

<script>
import suppile from '@/api/supplie'

export default {
  
    data(){
        return{
           
            supplieInfo:{},
         

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
          this.supplieInfo={}
        }
        },
        getrecord(id) {
            console.log(id)
             suppile.queryteacher(id).then(response => {
             this.supplieInfo = response.data.record
    }).catch((response) => {
        this.$message({
            type: 'error',
            message: '获取数据失败'
        })
    })
        },
        saveSupplieInfo(){
          suppile.seveSupplieInfo(this.supplieInfo)
                 .then(response=>{
                      this.$message({
                      type: 'success',
                      message: '增加成功!'
                  });
                  this.$router.push('/supplieInfo/table')
                 })
        },

        saveandupdatesupplie(){
            if(this.$route.params.id){
            const id = this.$route.params.id
                suppile.updateSuppplieInfo(id,this.supplieInfo)
                       .then(response=>{
                           this.$message({
                           type: 'success',
                           message: '修改成功!'
                           });
                           this.$router.push('/supplieInfo/table')
                       }).catch(error=>{
                           this.$message({
                           type: 'success',
                           message: '修改失败，请检查信息!'
                           });
                       })
                
            }else{
                this.saveSupplieInfo()
            }

        }
    }

}
</script>

<style>

</style>