import Vue from 'vue';
import Router from 'vue-router';
const appRoot = process.env.moudles.app.root;

Vue.use(Router);

/* Layout */
import Layout from '@/views/index.vue';

// 所有角色都能看到的路由
const constantRouterMap = [
  // {
  //   name: 'refresh',
  //   path: `${appRoot}/refresh`,
  //   component: () => import('@/views/errPage/refresh')
  // },
  // {
  //   name: 'login',
  //   path: '/login',
  //   component: () => import('@/views/account/Login')
  // },
  // {
  //   name: '404',
  //   path: '/404',
  //   component: () => import('@/views/errPage/404')
  // },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    hidden: false,
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('@/views/index.vue'),
        meta: {
          title: '首页',
          isRefresh: true,
          role: ['admin', 'sub']
        }
      }
    ]
  }
];

// 需要根据角色，动态注册的路由
const asyncRouterMap = [
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '404',
      role: ['admin, sub, other']
    }
  }
];

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
