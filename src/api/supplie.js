import request from '@/utils/request'

export default {

      getPageList(page,limit,teacher) {
        return request({
          url: `/bookservice/supplie/limit/${page}/${limit}`,
          method: 'post',
          data: teacher
        })
      },
      deleteid(id){
        return request({
          url: `/bookservice/supplie/deleteSupplieById/${id}`,
          method: 'delete',

        })

      },
      seveSupplieInfo(supplie){
        return request({
          url: `/bookservice/supplie/addSupplieInfo`,
          method: 'post',
          data:supplie

        })
      },

      queryteacher(id){
        return request({
          url: `/bookservice/supplie/selectSupplieById/${id}`,
          method: 'get',
         
        })
      },

      updateSuppplieInfo(id,supplie){
        return request({
          url: `/bookservice/supplie/updateSupplieInfo/${id}`,
          method: 'post',
          data:supplie   
        })

      }
    }