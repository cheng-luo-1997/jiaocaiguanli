<template>
    <el-form label-width="120px">
      <el-form-item label="教师名称">
        <el-input v-model="teacher.teacherName"/>
      </el-form-item>
      <el-form-item label="教师id">
        <el-input v-model="teacher.teacherId"/>
      </el-form-item>
       <el-form-item label="院系">
        <el-select v-model="teacher.college" clearable placeholder="请选择">
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
        <el-form-item label="班级">
        <el-input v-model="teacher.classroom"/>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="teacher.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="teacher.password"/>
      </el-form-item>
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item>
        <el-button  type="primary" @click="saveandupdateteacher">保存</el-button>
      </el-form-item>
    </el-form>
</template>

<script>
import teacher from '@/api/teacherbook'

export default {
  
    data(){
        return{
           
            teacher:{},
         

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
          this.teacher={}
        }
        },
        getrecord(id) {
            console.log(id)
             teacher.queryteacher(id).then(response => {
             this.teacher = response.data.record
    }).catch((response) => {
        this.$message({
            type: 'error',
            message: '获取数据失败'
        })
    })
        },
        saveTeacher(){
          teacher.seveTeacher(this.teacher)
                 .then(response=>{
                      this.$message({
                      type: 'success',
                      message: '增加成功!'
                  });
                  this.$router.push('/teacherbook/table')
                 })
        },

        saveandupdateteacher(){
            if(this.$route.params.id){
            const id = this.$route.params.id
                console.log(teacher)
                teacher.updateteacher(id,this.teacher)
                       .then(response=>{
                           this.$message({
                           type: 'success',
                           message: '修改成功!'
                           });
                           this.$router.push('/teacherbook/table')
                       }).catch(error=>{
                           this.$message({
                           type: 'success',
                           message: '修改失败，请检查信息!'
                           });
                       })
                
            }else{
                this.saveTeacher()
            }

        }
    }

}
</script>

<style>

</style>