<template>
  <div id="app">
    <Toast />
    <router-view/>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  name: 'App',
  components: {
    Toast,
  },
  data() {
    return {
    };
  },
};
</script>
<style lang="scss">
@import "./assets/all";
#app {
  font-family: '微軟正黑體', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
