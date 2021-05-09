import request from '@/utils/request'

export default {

      getPageList(page,limit,bookinfo) {
        return request({
          url: `/bookservice/bookinfo/limit/${page}/${limit}`,
          method: 'post',
          data: bookinfo
        })
      },
      deleteid(id){
        return request({
          url: `/bookservice/bookinfo/deleteBookInfoById/${id}`,
          method: 'delete',

        })

      },
      saveBookInfo(bookinfo){
        return request({
          url: `/bookservice/bookinfo/addBookInfo`,
          method: 'post',
          data:bookinfo

        })
      },

      queryBookInfo(id){
        return request({
          url: `/bookservice/bookinfo/selectBookInfoById/${id}`,
          method: 'get',
         
        })
      },

      updateBookInfo(id,bookinfo){
        return request({
          url: `/bookservice/bookinfo/updateBookInfo/${id}`,
          method: 'post',
          data:bookinfo   
        })

      }
    }