<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
   </el-steps>
   <el-button type="text" @click="init">添加章节</el-button>
    <el-dialog :visible.sync="dialogChapterFormVisible" :title="title">
    <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
            <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
</el-dialog>
<el-dialog :visible.sync="dialogVideoFormVisible" :title="title1">
  <el-form :model="video" label-width="120px">
    <el-form-item label="课时标题">
      <el-input v-model="video.title"/>
    </el-form-item>
    <el-form-item label="课时排序">
      <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
    </el-form-item>
    <el-form-item label="是否免费">
      <el-radio-group v-model="video.free">
        <el-radio :label="true">免费</el-radio>
        <el-radio :label="false">默认</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="上传视频">
        <el-upload
              :on-success="handleVodUploadSuccess"
              :on-remove="handleVodRemove"
              :before-remove="beforeVodRemove"
              :on-exceed="handleUploadExceed"
              :file-list="fileList"
              :action="BASE_API+'/vodservice/uploadVideo'"
              :limit="1"
              class="upload-demo">
        <el-button size="small" type="primary">上传视频</el-button>
        <el-tooltip placement="right-end">
            <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
            <i class="el-icon-question"/>
        </el-tooltip>
        </el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
    <el-button  type="primary" @click="saveOrUpdateVideo">确 定</el-button>
  </div>
</el-dialog>
<ul class="chanpterList">
    <li
        v-for="chapter in allchaperVideoList"
        :key="chapter.id">

          <p>
            {{ chapter.title }}
         </p>
         <el-button type="text" @click="init1(chapter.id)">添加课时</el-button>
         <el-button type="text"  @click="getChapterInfo(chapter.id)">编辑</el-button>
         <el-button type="text"  @click="deleteChapter(chapter.id)">删除</el-button>
          
        <!-- 视频 -->
        <ul class="chanpterList videoList">
            <li
                v-for="video in chapter.children"
                :key="video.id">
                <p>{{ video.title }}
                </p>
                 <el-button type="text"  @click="getVideoInfo(video.id)">编辑</el-button>
                  <el-button type="text"  @click="deleteVideoInfo(video.id)">删除</el-button>
            </li>
        </ul>
    </li>
</ul>
    <el-form label-width="120px">
       <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import chapter from '@/api/chapter'
import video from '@/api/video'
export default {
  data() {
    return {
    
      saveBtnDisabled: false, // 保存按钮是否禁用
      dialogVideoFormVisible:false,
      allchaperVideoList:[],
      fileList: [],//上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
      courseId:'',
      chapterId:'',
      chapter:{
        title:'',
        sort:''
    },
    title1:'',
     video:{
       title: '',
       sort: 0,
       free: 0,
       videoSourceId: '',
       videoOriginalName:'',
       free:''
     },
      dialogChapterFormVisible:false,
      title:''
    }
  },
  created() {
    console.log('info created')
    if(this.$route.params.id){
       console.log(this.$route.params.id)
       this.courseId=this.$route.params.id
       this.getAllChapter(this.courseId)
    }
  },
  methods: {

    handleVodUploadSuccess(response,file,fileList){
      this.video.videoSourceId = response.data.vodId,
      this.video.videoOriginalName=file.name

    },
    beforeVodRemove(file){
      return this.$confirm(`确定移除 ${ file.name }？`);

    },
    handleVodRemove(){
      video.deleteAliVideo(this.video.videoSourceId)
           .then(response=>{
             this.$message({
                type: 'success',
                message: '删除小结成功!'
                }),
              this.video.videoSourceId = '',
              this.video.videoOriginalName='',
              this.fileList=[]  

           }) 

    },
    
    handleUploadExceed(files, fileList) {
  this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    init(){
      this.title='添加章节',
      this.dialogChapterFormVisible = true,
      this.chapter.title = '',
      this.chapter.sort = ''
    },
    init1(id){
      this.chapterId=id
       this.title1='添加课时',
      this.dialogVideoForm = true,
      this.video={
       title: '',
       sort: 0,
       free: 0,
       videoSourceId: '',
       free:''
     
      },
      this.fileList=[]
     
     console.log(this.chapter.id)

    },
    addVideo(){
      this.video.courseId = this.courseId,
      this.video.chapterId=this.chapterId
       video.addVideo(this.video)
            .then(response=>{
              this.dialogVideoFormVisible=false
                this.$message({
                type: 'success',
                message: '添加课时成功!'
                })
                this.getAllChapter(this.$route.params.id)

            })
    },
    getVideoInfo(id){
      this.title1='修改课时',
      this.dialogVideoFormVisible=true
      video.getVideoInfo(id)
           .then(response=>{
             this.video = response.data.video
           })
    },
    updateVideoInfo(){
      video.updateVideo(this.video)
           .then(response=>{
             this.dialogVideoFormVisible=false
                this.$message({
                type: 'success',
                message: '修改课时成功!'
                })
                this.getAllChapter(this.$route.params.id)

           })
    },
    saveOrUpdateVideo(){
         if(!this.video.id){
        this.addVideo()
        }else{
          this.updateVideoInfo()
        }
    },
    deleteVideoInfo(id){
      video.deleteVideoInfo(id)
           .then(response=>{
                this.$message({
                type: 'success',
                message: '删除课时成功!'
                })
                this.getAllChapter(this.$route.params.id)
           })
    },
    //章节管理
    deleteChapter(id){
      chapter.deleteChapterInfo(id)
            .then(response=>{
              this.dialogChapterFormVisible=false
                this.$message({
                type: 'success',
                message: '删除章节成功!'
                })
                this.getAllChapter(this.$route.params.id)
            })

    },
    getChapterInfo(id){
      this.title='修改章节',
      this.dialogChapterFormVisible = true,
      chapter.getChapterInfo(id)
             .then(response=>{
               this.chapter=response.data.chapter
             })
    },
    add(){
      this.chapter.courseId=this.courseId
      console.log("**"+this.chapter.courseId)
      chapter.addChapter(this.chapter)
             .then(response=>{
                this.dialogChapterFormVisible=false
                this.$message({
                type: 'success',
                message: '保存章节成功!'
                })
                this.getAllChapter(this.$route.params.id)

             })
    },
    update(){
     chapter.updateChapter(this.chapter)
            .then(response=>{
              this.dialogChapterFormVisible=false
                this.$message({
                type: 'success',
                message: '修改章节成功!'
                })
                this.getAllChapter(this.$route.params.id)
            })
    },
    saveOrUpdate(){
        if(!this.chapter.id){
          console.log(this.video.id)
        this.add()
        }else{
          console.log(this.chapter.id)
          this.update()
        }
    },

    getAllChapter(courseId){
      chapter.getAllChapter(courseId)
             .then(response=>{
               this.allchaperVideoList=response.data.list
             })
            
    },

    previous(){
      this.$router.push({ path: '/course/add/'+this.$route.params.id})
    },
    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.$route.params.id })
    }
  }
}
</script>
<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}
.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}
</style>