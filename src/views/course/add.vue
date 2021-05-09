<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
    <el-form label-width="120px">

  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
  </el-form-item>
  <!-- 所属分类 TODO -->
<!-- 所属分类：级联下拉列表 -->
<!-- 一级分类 -->
<el-form-item label="课程类别">
  <el-select
    v-model="courseInfo.subjectParentId"
    placeholder="请选择"   @change="subjectLevelOneChanged">
    <el-option
      v-for="subject in subjectNestedList"
      :key="subject.id"
      :label="subject.title"
      :value="subject.id"/>
  </el-select>
  <el-select v-model="courseInfo.subjectId" placeholder="请选择" >
  <el-option
    v-for="subject in subSubjectList"
    :key="subject.value"
    :label="subject.title"
    :value="subject.id"/>
</el-select>
</el-form-item>
  <!-- 课程讲师 TODO -->
  <el-form-item label="课程讲师">
  <el-select
    v-model="courseInfo.teacherId"
    placeholder="请选择">
    <el-option
      v-for="teacher in teacherList"
      :key="teacher.id"
      :label="teacher.name"
      :value="teacher.id"/>
  </el-select>
</el-form-item>
  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
  </el-form-item>

  <!-- 课程简介 TODO -->
 <el-form-item label="讲师简介">
        <el-input v-model="courseInfo.description" :rows="10" type="textarea"/>
      </el-form-item>
  <!-- 课程封面 TODO -->
 <el-form-item label="视频封面">
    <!-- 头衔缩略图 -->
    <pan-thumb :image="courseInfo.cover"/>
    <!-- 文件上传按钮 -->
    <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">保存封面
    </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
    <image-cropper
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/ossservice/upload'"
                   field="file"
                   @close="close"
                   @crop-upload-success="cropSuccess"/>
</el-form-item>

  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
  </el-form-item>
  <el-form-item>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
  </el-form-item>
</el-form>
  </div>
</template>


<script>
import PanThumb from '@/components/PanThumb'
import ImageCropper from '@/components/ImageCropper'
import course from '@/api/course'
import * as subject from '@/api/subject'
export default {
  components:{
      ImageCropper, PanThumb
    },
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      imagecropperShow:false,
      imagecropperKey:'0',
      courseInfo:{
        title: '',
        subjectId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0,
        subjectId:'',
        subjectParentId:''
      },
      teacherList:{},
      subjectNestedList: [],//一级分类列表
      subSubjectList: [],//二级分类列表
      BASE_API:process.env.BASE_API,
      courseId:''
    }
  },
  created() {
    if(this.$route.params.id){
       this.courseId = this.$route.params.id
       this.getCourseInfo(this.courseId)
    }else{
       this.getTeacher(),
       this.getSubjectOne()
    }
  
  },
  methods: {

      getCourseInfo(courseId){
       course.getCourseInfo(courseId)
             .then(response=>{
               this.courseInfo=response.data.courseInfo,
               subject.getAllSubject()
                      .then(responsesubject=>{
                        this.subjectNestedList=responsesubject.data.list
                        for (let i = 0; i < this.subjectNestedList.length; i++) {
                        if (this.subjectNestedList[i].id === this.courseInfo.subjectParentId) {
                            this.subSubjectList = this.subjectNestedList[i].children
        }
    }
                      })
                        this.getTeacher()
             })

             

      },

      close(){
          this.imagecropperShow=false,
          this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data){
        this.imagecropperShow=false,
        this.courseInfo.cover=data.url,
        this.imagecropperKey = this.imagecropperKey + 1
        },
   subjectLevelOneChanged(value){
      console.log(value)
    for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === value) {
            this.subSubjectList = this.subjectNestedList[i].children
            this.courseInfo.subjectId = ''
        }
    }

   },
    getSubjectOne(){
     subject.getAllSubject()
            .then(response=>{
              this.subjectNestedList=response.data.list
            })
    },

    getTeacher(){
      course.getAllteacher()
            .then(response=>{
              this.teacherList=response.data.list
            })
    },
    addCourse(){
      course.addCourse(this.courseInfo)
            .then(response=>{  
                this.$message({
                type: 'success',
                message: '保存成功!'
        }),
             this.$router.push({ path: '/course/chapter/'+response.data.id})
            })

    },
    update(){
      course.updateCourseInfo(this.courseInfo)
            .then(response=>{
                this.$message({
                type: 'success',
                message: '修改成功!'
        }),
             this.$router.push({ path: '/course/chapter/'+this.courseId})
            })
    },
    next() {
      if(!this.courseId){
        this.addCourse()
      }else{
        this.update()
      }
       
    }
  }
}
</script>