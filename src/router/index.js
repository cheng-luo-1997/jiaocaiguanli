import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
    }]
  },
  {
    path: '/teacherbook',
    component: Layout,
    redirect: '/teacherbook/table',
    name: 'teacher',
    meta: { title: '教师管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'teacherList',
        component: () => import('@/views/teacherbook/list'),
        meta: { title: '教师列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'addTeacher',
        component: () => import('@/views/teacherbook/add'),
        meta: { title: '添加教师', icon: 'tree' }
      },
      // {
      //   path: 'edit/:id',
      //   name: 'editTeacher',
      //   component: () => import('@/views/teacherbook/add'),
      //   meta: { title: '编辑讲师', icon: 'tree' },
      //   props:true,
      //   hidden:true
      // }
    ]
  },
  {
    path: '/supplieInfo',
    component: Layout,
    redirect: '/supplieInfo/table',
    name: 'supplier',
    meta: { title: '供应商管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'supplierList',
        component: () => import('@/views/supplieInfo/list'),
        meta: { title: '供应商列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'addSupplier',
        component: () => import('@/views/supplieInfo/add'),
        meta: { title: '添加供应商信息', icon: 'tree' }
      },
      // {
      //   path: 'edit/:id',
      //   name: 'Tree',
      //   component: () => import('@/views/supplieInfo/add'),
      //   meta: { title: '编辑供应商信息', icon: 'tree' },
      //   props:true,
      //   hidden:true
      // }
    ]
  },
  {
    path: '/bookInfo',
    component: Layout,
    redirect: '/bookInfo/table',
    name: 'bookInfo',
    meta: { title: '教材管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'bookList',
        component: () => import('@/views/bookInfo/list'),
        meta: { title: '教材信息列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'addBook',
        component: () => import('@/views/bookInfo/add'),
        meta: { title: '添加教材信息', icon: 'tree' }
      },
      // {
      //   path: 'edit/:id',
      //   name: 'Tree',
      //   component: () => import('@/views/bookInfo/add'),
      //   meta: { title: '编辑教材信息', icon: 'tree' },
      //   props:true,
      //   hidden:true
      // }
    ]
  },
  {
    path: '/subscribeInfo',
    component: Layout,
    redirect: '/subscribeInfo/table',
    name: 'subscribeManage',
    meta: { title: '征订管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'subscribeInfo',
        component: () => import('@/views/subscribeInfo/subscribeInfo'),
        meta: { title: '教材征订信息', icon: 'table' }
      },
      {
        path: 'list',
        name: 'inventoryList',
        component: () => import('@/views/subscribeInfo/list'),
        meta: { title: '教材库存信息', icon: 'table' }
      },
      // {
      //   path: 'subscribe/:id',
      //   name: 'Tree',
      //   hidden:true ,
      //   component: () => import('@/views/subscribeInfo/subscribe'),
      //   meta: { title: '添加征订信息', icon: 'tree' }
      // },
      // {
      //   path: 'edit/:id',
      //   name: 'Tree',
      //   component: () => import('@/views/subscribeInfo/add'),
      //   meta: { title: '编辑征订信息', icon: 'tree' },
      //   props:true,
      //   hidden:true
      // }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    redirect: '/inventory/table',
    name: 'inventory',
    meta: { title: '库存管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'graintInfo',
        component: () => import('@/views/inventory/subscribeInfo'),
        meta: { title: '出入库记录', icon: 'table' }
      },
      {
        path: 'list',
        name: 'inventoryInfo',
        component: () => import('@/views/inventory/list'),
        meta: { title: '出入库管理', icon: 'table' }
      },
      // {
      //   path: 'subscribe/:id',
      //   name: 'Tree',
      //   hidden:true ,
      //   component: () => import('@/views/subscribeInfo/subscribe'),
      //   meta: { title: '添加征订信息', icon: 'tree' }
      // },
      // {
      //   path: 'edit/:id',
      //   name: 'Tree',
      //   component: () => import('@/views/subscribeInfo/add'),
      //   meta: { title: '编辑征订信息', icon: 'tree' },
      //   props:true,
      //   hidden:true
      // }
    ]
  },
  // {
  //   path: '/teacher',
  //   component: Layout,
  //   redirect: '/teacher/table',
  //   name: 'teacher',
  //   hidden:true ,
  //   meta: { title: '讲师管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/teacher/list'),
  //       meta: { title: '讲师列表', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/teacher/add'),
  //       meta: { title: '添加讲师', icon: 'tree' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: 'Tree',
  //       component: () => import('@/views/teacher/add'),
  //       meta: { title: '编辑讲师', icon: 'tree' },
  //       hidden:true ,
  //       props:true
  //     }
  //   ]
  // },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: 'subject',
    meta: { title: '课程l类别管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'subjectList',
        component: () => import('@/views/subject/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'addSubject',
        component: () => import('@/views/subject/add'),
        meta: { title: '添加课程类别', icon: 'tree' }
      },
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'course',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'courseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'addCourse',
        component: () => import('@/views/course/add'),
        meta: { title: '添加课程类别', icon: 'tree' }
      },
      // {
      //   path: 'add/:id',
      //   name: 'EduCourseInfoEdit',
      //   component: () => import('@/views/course/add'),
      //   meta: { title: '编辑课程基本信息', noCache: true },
      //   hidden: true
      // },
      // {
      //   path: 'chapter/:id',
      //   name: 'EduCourseChapterEdit',
      //   component: () => import('@/views/course/chapter'),
      //   meta: { title: '编辑课程大纲', noCache: true },
      //   hidden: true
      // },
      // {
      //   path: 'publish/:id',
      //   name: 'EduCoursePublishEdit',
      //   component: () => import('@/views/course/publish'),
      //   meta: { title: '发布课程', noCache: true },
      //   hidden: true
      // }
    ]
  },
  {
    path: '/cost',
    component: Layout,
    redirect: '/cost/entrycost',
    name: 'cost',
    meta: { title: '费用管理', icon: 'example' },
    children: [
      {
        path: 'entrycost',
        name: 'entryCost',
        component: () => import('@/views/cost/subscribeInfo'),
        meta: { title: '出库费用', icon: 'table' }
      },
      {
        path: 'outcost',
        name: 'outCost',
        component: () => import('@/views/cost/list'),
        meta: { title: '入库费用', icon: 'table' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
