<template>
  <div>
    <router-link :to="{path:'/wp'}">wp</router-link>
    <router-link :to="{path:'/39yst_3'}">39yst_3</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    created () {
      this.who()
    },
    methods: {
      who () {
        console.log(`i am index`)
      }
    }
  }
</script>
