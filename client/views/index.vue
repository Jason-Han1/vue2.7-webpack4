<template>
  <div class="wrap" v-waterMarker="{ text: 'JasonHan版权所有', textColor: 'rgba(180, 180, 180, 0.4)' }">
    <div class="test">
      <h1>test count: <span class="count">{{ count }}</span></h1>
      <h2>count * 2 = <span class="doubleCount">{{ doubleCount }}</span></h2>
      <!-- <div>state from vuex {{ a }}</div> -->
      <button @click="add">+</button> &nbsp;
      <button @click="cut">-</button>
      <br>
      <!-- <button @click="update">update a</button> -->
      <br>
      <!-- <em>token: {{token}}</em> -->
    </div>
  </div>
</template>

<script setup>

import {
  ref,
  computed,
  watch,
  getCurrentInstance,
  onMounted
} from 'vue'

// export default {
//   name: 'App',
//   setup(props, { attrs, slots, parent, root, emit, refs }) {
const count = ref(0)x
// const { ctx } = getCurrentInstance()
// console.log(ctx.$router.currentRoute.value)

const add = () => {
  count.value++
}

const cut = () => {
  count.value--
}

// const update = () => {
//   ctx.$store.commit('setTestA', count.value)
// }

// const a = computed(() => ctx.$store.state.test.a)
const doubleCount = computed(() => count.value * 2)
// const token = computed(() => {
//   return {...mapState(['token'])}
//   })
// const token = computed(() => ctx.$store.state.token)
watch(() => count.value, val => {
  console.log('count is change, value is ' + val)
})

onMounted(function () {
  // console.log(ctx)
  //   $http({
  //     url: '/api/auth/login',
  //     method: 'POST',
  //     data: {
  //       account: "123qwe",
  //       password: "123123"
  //       }
  //   }).then(response => {
  //     console.log(response)
  //   }, err => {
  //     console.log(err)
  //   })
  // ctx.$store.dispatch('getToken', ()=> {

  // })
})

  //   return {
  //     count,
  //     add,
  //     cut,
  //     doubleCount,
  //     // a,
  //     // update,
  //     // token
  //   }
  // }
// }
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.count {
  color: red;
}

.doubleCount {
  color: greenyellow;
}
</style>