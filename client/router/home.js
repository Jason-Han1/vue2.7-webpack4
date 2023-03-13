import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/index.vue';
Vue.use(Router);

// 所有角色都能看到的路由
const constantRouterMap = [
  {
    path: '',
    component: Layout,
    // redirect: '/home',
    hidden: false,
    // children: [{
    //     name: 'home',
    //     path: '/home',
    //     component: () => import('@/views/home/index'),
    //     meta: {
    //       title: '首页',
    //       isRefresh: true,
    //       role: ['admin', 'sub']
    //     }
    //   }
    // ]
  },
  // {
  //   name: '404',
  //   path: '/404',
  //   component: () => import('@/views/errPage/404')
  // },
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '404',
      role: ['admin, sub, other']
    }
  }
];
const asyncRouterMap = [];
export {
  asyncRouterMap,
  constantRouterMap
};

// 输出路由对象
export default new Router({
  mode: 'history', // 后端支持可开 hash history
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});
