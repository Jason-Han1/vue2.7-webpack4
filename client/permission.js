import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式

NProgress.configure({
  showSpinner: false,
});

// progres 滚动条配置
NProgress.configure({});

// 未登录状态下，页面访问白名单
const whiteList = ['/login', '/404', '/401', '/500', '/refresh'];

router.beforeEach(async (to, from, next) => {
//   const fromIsHome = from.name === 'home';
//   const toHome = (to.name === 'home' && from.name != null);
//   const isNextHref = fromIsHome || toHome;
//   const isOhterPage = to.name === 'home';
//   const isNull = from.name == null;
//   // alert(2)
//   if (isNextHref) {
//     location.href = to.path;
//     return false;
//   }

//   if (!isNull) {
//     NProgress.start();
//   }

//   if (!getToken()) {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//       NProgress.done();
//     } else {
//       location.href = '/login';
//     }

//     return;
//   }


//   // 有token用户
//   try {
//     const routerInfo = await initInfo(store, to.meta.isRefresh);
//     if (!routerInfo.ROUTERS_IS_MOUNTED && !isOhterPage) {
//       // alert(11)
//       router.addRoutes(store.getters.addRouters);
//       // hack方法 确保addRoutes已完成
//       next({
//         ...to,
//         replace: true
//       });
//     } else {
//       to.matched.length === 0 ? next('/404') : next();
//       NProgress.done();
//     }

//   } catch (err) {

//     await store.dispatch('FedLogOut');
//     next('/login');
//     NProgress.done();
//   }
next();
});

router.afterEach((to, from) => {
  // store.commit('SET_TITLE', to.meta.title);
  // store.commit('SET_IS_BACK', to.meta.isBack);
  // setSideBarTitle(to.fullPath);
  NProgress.done(); // 结束Progress
});

// 初始化用户信息和路由信息
async function initInfo(store, isRefresh) {
  try {
    const userInfo = await store.dispatch('getUserInfo', !!isRefresh);
    const addRouters = store.getters.addRouters;
    const isVisitor = store.getters.isVisitor;
    const roles = store.getters.roles;
    const type = userInfo.type;
    const type_status = userInfo.type_status;
    // 路由已添加时返回路由已经添加
    if (addRouters && addRouters.length > 0) {
      return Promise.resolve({
        ROUTERS_IS_MOUNTED: true
      });
    }

    // 有权限访问所有异步路由页面的用户
    if (type === 2 || (type === 1 && type_status == 3) || !!isVisitor) {
      const newAddRouters = await store.dispatch('GenerateRoutes', {
        roles
      });
      return Promise.resolve({
        ROUTERS_IS_MOUNTED: false,
        addRouters: newAddRouters
      });
    } else {
      return Promise.resolve({
        ROUTERS_IS_MOUNTED: true
      });
    }
  } catch (err) {
    return Promise.reject(err);
  }

}

/**
 * 设置sidebar title
 */
function setSideBarTitle(fullPath) {
  const sidebar_title = fullPath.split('/')[1];
  store.commit('SET_SIDE_BAR_TITLE', sidebar_title);
}
