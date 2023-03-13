import Vue from 'vue';
import App from './App';
import router from './router/index';
import store from './store';
import JSONUtil from '@/common/JSONUtil';
import './permission'; // 全局路由过滤器
import 'babel-polyfill';
import './utils/dateExtend';
// 注册自定义指令
import * as directives from './direactive';
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]));
import {
  MixinsResEntity
} from './utils/ResEntity';

MixinsResEntity();


Vue.prototype.AgJSON = JSONUtil;

// global css
import '@/styles/index.scss';

// element-ui
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// import myPlugin from './plugin/myPlugin'
// import plugin from './plugin';
// Vue.use(plugin);


// 设置共有属性
// Vue.prototype.nameMap = nameMap;

// 设置语言
// locale.use(lang)
// global.css
Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.config.devtools = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = process.env.NODE_ENV !== 'production';

/* eslint-disable no-new */
new Vue({
  el: '#appTmp',
  router,
  store,
  render: h => h(App)
});

if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { // detect it's IE11
  window.addEventListener('hashchange', function (event) {
    let currentPath = window.location.hash.slice(1);
    if (store.state.route.path !== currentPath) {
      router.push(currentPath);
    }
  }, false);
}
