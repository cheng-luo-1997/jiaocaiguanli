import request from '@/utils/request'

export default {

      getPageList(page,limit,subscribeinfo) {
        return request({
          url: `/bookservice/subscribeinfo/limit/${page}/${limit}`,
          method: 'post',
          data: subscribeinfo
        })
      },
      selectSupplieById(id){
        return request({
          url: `/bookservice/subscribeinfo/selectSupplieById/${id}`,
          method: 'get',
         
        })
      },
      deleteid(id){
        return request({
          url: `/bookservice/bookinfo/deleteBookInfoById/${id}`,
          method: 'delete',

        })

      },
      subScribe(subScribeAndBook){
        return request({
          url: `/bookservice/subscribeinfo/subScribe`,
          method: 'post',
          data:subScribeAndBook

        })
      },

      queryBookInfo(id){
        return request({
          url: `/bookservice/bookinfo/selectBookInfoById/${id}`,
          method: 'get',
         
        })
      },

      updateSupplieById(id,subScribeAndBook){
        return request({
          url: `/bookservice/subscribeinfo/updateSupplieById/${id}`,
          method: 'post',
          data:subScribeAndBook   
        })

      },
      
    }