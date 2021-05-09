import request from '@/utils/request'
export function getAllSubject() {
  return request({
    url: '/eduservice/edu-subject/getAllSubject',
    method: 'get',
  })
}