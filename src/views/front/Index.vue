<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
      <div class="bg-cover bg fade banner">
        <div class="bg-cover banner__dog1"></div>
        <div class="bg-cover banner__dog2"></div>
        <div class="banner__cloud"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      isLoading: true,
    };
  },
  mounted() {
    const vm = this;
    function delay() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(vm.isLoading = false);
        }, 1000);
      });
    }
    delay().then(() => {
      console.log(window.pageYOffset);
      if (window.pageYOffset >= 0) {
        setTimeout(() => {
          document.querySelector('.banner').classList.add('show');
        }, 700);
        // document.querySelector('.banner__cloud').style.animation = 'shadow 3s ease-in-out';
      }
    });
  },
};

</script>

<style lang="scss" scoped>
  .bg{
      background-image: url('https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
      height: 100vh;
  };
  .banner{
    overflow-y: hidden;
    position: relative;
    &__cloud{
      height: 100vh;
      // position: relative;
      animation:shadow 3s ease-in-out forwards;
      &::before{
        content: '';
        position: absolute;
        // z-index: 2;
        height: 100px;
        width: 100px;
        bottom: 0px;
        // transform: translateY(0%);
        left: -20px;
        background-color: #fff;
        border-radius: 50% 50% 0 0;
        box-shadow: 120px 40px 0 50px #fff,
        290px 40px 0 90px #fff,
        420px 70px 0 70px #fff,
        590px 30px 0 70px #fff,
        750px 30px 0 130px #fff,
        980px 40px 0 100px #fff,
        1120px 50px 0 70px #fff,
        1300px 40px 0 100px #fff,
        1420px 30px 0 70px #fff;
      }
    }
    &__dog1{
      // height: 100vh;
      position: absolute;
      animation:shadow 1s 3.5s forwards;
      background-image: url('../../assets/dogs-5457759_1280-2.png');
      background-size: cover;
      width: 85px;
      height: 140px;
      bottom: 100px;
      transform: translateY(170%);
      right: 1%;
    }
    &__dog2{
      // height: 100vh;
      position: absolute;
      animation:shadow 1s 3s forwards;
      background-image: url('../../assets/dogs-5457759_12801.png');
      background-size: cover;
      width: 85px;
      height: 170px;
      bottom: 100px;
      transform: translateY(170%);
      right: 7%;
    }
  }
  @keyframes shadow2 {
    from{
      transform: translateY(170%);
    }
    to{
      transform: translateY(0%);
    }
  }
  @keyframes shadow{
   from{
    // left:54px;
    // width:40px;
    // background:#eaeaea;
    transform: translateY(170%);
    // // opacity: 0;
    // bottom: -100px;
    // z-index: 2;
  }
  to{
    // opacity: 1;
    transform: translateY(0%);
    // bottom: 0;
    // z-index: 2;
  }
}
  .bg-cover{
      background-size: cover;
      background-position: center center;
  };
</style>
