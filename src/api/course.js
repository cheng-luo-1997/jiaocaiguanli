import request from '@/utils/request'

export default {

      getAllteacher() {
        return request({
          url: `/eduservice/edu-teacher/list`,
          method: 'get',
          
        })
      },

      addCourse(courseInfo) {
        return request({
          url: `/eduservice/edu-course/addCourse`,
          method: 'post',
          data: courseInfo
        })
      },
      getCourseInfo(courseId) {
        return request({
          url: `/eduservice/edu-course/getCourseInfo/${courseId}`,
          method: 'get',
        })
      },
      updateCourseInfo(courseInfoForm) {
        return request({
          url: `/eduservice/edu-course/updateCourseInfo`,
          method: 'post',
          data:courseInfoForm
        })
      },
      getCoursePublishVoById(id) {
        return request({
          url: `/eduservice/edu-course/getCoursePublishVoById/${id}`,
          method: 'get',
          
        })
      },
      publishVoById(id) {
        return request({
          url: `/eduservice/edu-course/publishCourse/${id}`,
          method: 'post',
          
        })
      },
      getCourseList(page,limit,courseQuery){
        return request({
          url: `/eduservice/edu-course/getCourseList/${page}/${limit}`,
          method: 'post',
          data:courseQuery
          
        })

      },
        deleteCourse(id){
        return request({
          url: `/eduservice/edu-course/deleteCourse/${id}`,
          method: 'delete',
        })

      }


     
    }