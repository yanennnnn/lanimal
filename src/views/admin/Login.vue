<template>
  <div class="">
    <loading :active.sync="isLoading"></loading>
    <div class="login d-flex justify-content-center align-items-center">
      <div class="container">
        <div class="row box-shadow">
          <div class="d-flex flex-column p-5 col-md-6 col-12 sign">
            <p class="h2 text-center mb-5">登入</p>
            <input type="text" placeholder="請輸入帳號" class="mb-4 pb-2" v-model="user.email">
            <input type="password" placeholder="請輸入密碼" class="mb-4 pb-2" v-model="user.password">
            <button type="button" class="btn btn-outline-secondary" @click="signIn">確認登入</button>
          </div>
          <div class="col-md-6 d-md-block d-none bg">
            <p class="text-light" style="position: absolute; bottom: 0;">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nisi harum omnis
              repudiandae autem, odit commodi doloribus eos?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      isLoading: false,
    };
  },
  methods: {
    signIn() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/auth/login`;
      vm.isLoading = true;
      vm.$http.post(api, vm.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          vm.isLoading = false;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `token=${token};expires=${new Date(expired * 1000)};`;
          vm.$router.push({ path: 'admin/createProducts' });
        }).catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
};
</script>

<style style="scss" scoped>
  .login{
      background-image: url(https://images.unsplash.com/photo-1489769002049-ccd828976a6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1828&q=80);
      background-size: cover;
      height: 100vh;
      width: 100%;
      background-position: center center;
  }
  .box-shadow{
      box-shadow:5px 5px 4px rgb(185, 185, 185);
  }
  .sign{
      background-color: white;
  }
  .sign p{
      position: relative;
  }
  .sign p::before{
      content: '';
      position: absolute;
      /* width: 50px; */
      height:2px;
      background-color: rgba(201, 201, 201, 0.801);
      left: 0;
      right: 0;
      top: 50px;
  }
  .sign input{
      border:none;
      background-color: transparent;
      border-bottom: 1.5px solid #3A6701;
      color:#3A6701
  }
  .sign input:focus,.sign button{
      outline: none;
  }
  .bg{
      background-image: url(https://images.unsplash.com/photo-1461418126083-a84e9ca935de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80);
      background-size: cover;
      background-position: center right;
  }
</style>
