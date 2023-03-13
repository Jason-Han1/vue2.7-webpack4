<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { openConfirmModal } from '@/jsxUtils/modal';
export default {
  name: 'app',
  data() {
    return {
      timer: null,
      isSingle: true,
    };
  },
  created() {
    window.addEventListener('storage', (e) => {
      if (!this.isSingle || this.$route.path === '/login') return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isSingle = false;
        this.refreshHandler();
      }, 1000);
    });
  },
  methods: {
    refreshHandler() {
      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = '执行中...';
          window.location.reload();
        } else {
          done();
        }
      };
      openConfirmModal(this, {
        title: '页面已更新！',
        txt: '确认刷新页面',
        beforeClose: beforeClose
      }).then(action => {
      }).catch(err => {
        console.log(err);
      }).finally(() => {
      });
    },
  }
};
</script>
