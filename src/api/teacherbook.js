import request from '@/utils/request'

export default {

      getPageList(page,limit,teacher) {
        return request({
          url: `/bookservice/teacher/limit/${page}/${limit}`,
          method: 'post',
          data: teacher
        })
      },
      deleteid(id){
        return request({
          url: `/bookservice/teacher/deleteTeacher/${id}`,
          method: 'delete',

        })

      },
      seveTeacher(teacher){
        return request({
          url: `/bookservice/teacher/addTeacher`,
          method: 'post',
          data:teacher

        })
      },

      queryteacher(id){
        return request({
          url: `/bookservice/teacher/selectTeacherById/${id}`,
          method: 'get',
         
        })
      },

      updateteacher(id,teacher){
        return request({
          url: `/bookservice/teacher/updateTeacher/${id}`,
          method: 'post',
          data:teacher   
        })

      }
    }