import request from '@/utils/request'

export default {

    addVideo(video){
        return request({
          url: `/eduservice/video/addVideo`,
          method: 'post',
          data:video
          
        })
      },
      getVideoInfo(id){
        return request({
          url: `/eduservice/video/getVideoInfo/${id}`,
          method: 'get'
          
        })
  
      },
      updateVideo(video){
        return request({
          url: `/eduservice/video/updateVideo`,
          method: 'post',
          data:video
          
        })
      },
      deleteVideoInfo(id){
        return request({
          url: `/eduservice/video/deleteVideoInfo/${id}`,
          method: 'delete'
          
        })
  
      },

      deleteAliVideo(videoId){
        return request({
          url: `/vodservice/deleteVideo/${videoId}`,
          method: 'delete'
          
        })

      }
}