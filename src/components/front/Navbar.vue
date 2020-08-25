<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">LAnimal</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup" aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/index" href="#"
          class="nav-item nav-link">首頁</router-link>
        <router-link to="/about" href="#"
          class="nav-item nav-link">關於我們</router-link>
        <router-link to="/animalsponsorship" href="#"
          class="nav-item nav-link">助養我們</router-link>
        <router-link to="/products" href="#"
          class="nav-item nav-link">寵物周邊</router-link>
        <router-link to="/cart" href="#"
          class="nav-item nav-link">購物車</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>

</style>
