import request from '@/utils/request'

export default {

      getPageList(page,limit,teacherQuery) {
        return request({
          url: `/eduservice/edu-teacher/limit/${page}/${limit}`,
          method: 'post',
          data: teacherQuery
        })
      },
      deleteid(id){
        return request({
          url: `/eduservice/edu-teacher/delete/${id}`,
          method: 'delete',

        })

      },
      seveTeacher(teacher){
        return request({
          url: `/eduservice/edu-teacher/add`,
          method: 'post',
          data:teacher

        })
      },

      queryteacher(id){
        return request({
          url: `/eduservice/edu-teacher/selectById/${id}`,
          method: 'get',
         
        })
      },

      updateteacher(id,teacher){
        return request({
          url: `/eduservice/edu-teacher/update/${id}`,
          method: 'post',
          data:teacher
         
        })

      }
    }