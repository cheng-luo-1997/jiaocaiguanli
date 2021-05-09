// const Mock = require('mockjs')

// const data = Mock.mock({
//   'items|10': [{
//     id: '@id',
//     title: '@sentence(3)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: '@sentence(1)',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })

const applyList = [
  {
    course: '数据结构与算法设计',
    book: '数据结构与算法分析',
    publiser: '人民邮电出版社',
    author: 'Mark Allen Weiss',
    status: 'published',
    date: new Date().toLocaleDateString()
  }
];

const approveList = [
  {
    course: '数据结构与算法设计',
    book: '数据结构与算法分析',
    publiser: '人民邮电出版社',
    author: 'Mark Allen Weiss',
    status: 0,
    applier: '教师1'
  }
];

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = applyList;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/createApply',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/getApprove',
    type: 'get',
    response: config => {
      const items = approveList;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/submitApprove',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
