<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Navbar />
    <router-view :token="token" v-if="checkSuccess"/>
  </div>
</template>

<script>
import Navbar from '../../components/admin/Navbar.vue';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
  },
  data() {
    return {
      token: '',
      checkSuccess: false,
      isLoading: false,
    };
  },
  methods: {
    checkIn() {
      const vm = this;
      vm.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 預設帶入 token
      vm.$http.defaults.headers.common.Authorization = `Bearer ${vm.token}`;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/check`;
      vm.isLoading = true;
      vm.$http.post(api, {
        api_token: vm.token,
      })
        .then(() => {
          vm.checkSuccess = true;
          vm.isLoading = false;
        })
        .catch(() => {
          console.log('尚未驗證');
          vm.isLoading = false;
          this.$router.push('/login');
        });
    },
  },
  created() {
    this.checkIn();
  },
};
</script>

<style>

</style>
