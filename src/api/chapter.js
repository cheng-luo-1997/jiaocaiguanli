import request from '@/utils/request'

export default {

    getAllChapter(couresId) {
        return request({
          url: `/eduservice/chapter/getAllChapter/${couresId}`,
          method: 'get'
          
        })
      },
    addChapter(chapter){
      return request({
        url: `/eduservice/chapter/addChapter`,
        method: 'post',
        data:chapter
        
      })
    },
    getChapterInfo(id){
      return request({
        url: `/eduservice/chapter/getChapterInfo/${id}`,
        method: 'get'
        
      })

    },
    updateChapter(chapter){
      return request({
        url: `/eduservice/chapter/updateChapter`,
        method: 'post',
        data:chapter
        
      })
    },
    deleteChapterInfo(id){
      return request({
        url: `/eduservice/chapter/delete/${id}`,
        method: 'delete'
        
      })

    },
    

    }