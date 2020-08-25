<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">LAnimal</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/admin/createProducts" href="#"
          class="nav-item nav-link">產品列表</router-link>
        <router-link to="/admin/createCoupons" href="#"
          class="nav-item nav-link">優惠券列表</router-link>
        <router-link to="/admin/orderLists" href="#"
          class="nav-item nav-link">訂單列表</router-link>
        <router-link to="/admin/storageList" href="#"
          class="nav-item nav-link">圖片儲存列表</router-link>
      </div>
      <a href="#" class="ml-auto text-decoration-none text-light" @click.prevent="signOut">登出</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {};
  },
  methods: {
    signOut() {
      document.cookie = 'token=;expires=;';
      this.$router.push('/login');
    },
  },
};
</script>

<style>

</style>
