<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="wrap">
      <div class="bg fade banner">
        <div class="banner__inner">
          <div class="banner__inner__bg"></div>
          <div class="banner__inner__text">
            <div class="d-flex flex-column align-items-center
               border border-light mr-3 border-left-0 rounded-right"
               style="padding-top:150px;padding-bottom:150px;">
              <p>為愛發聲</p>
              <p>幫助牠們擁有溫暖的家</p>
              <p>你助我養</p>
              <router-link href="#" to='/about' class="btn btn-secondary btn-lg">
                了解我們
                <span class="text-light">
                  <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                </span>
              </router-link>
            </div>
          </div>
        </div>
        <div class="banner__dog1"></div>
        <div class="banner__dog2"></div>
        <div class="banner__cloud"></div>
        <div class="banner__down">
          <a href="#" @click.prevent="target('introduction')">
            <ul class="list-unstyled">
              <li class="banner__down--circle"></li>
              <li class="banner__down--circle"></li>
              <li class="banner__down--circle"></li>
              <li><i class="fa fa-arrow-down" aria-hidden="true"></i></li>
            </ul>
          </a>
        </div>
      </div>
      <div id="introduction" class="container introduction">
        <div class="mt-5 introduction__plan">
          <div class="plan--qus">
            <h2 class="text-center mb-5">動物助養計畫</h2>
            <div class="box-shadow">
              <div class="p-4 rounded">
                <p>在我們不知道的地方，依然存在著許多浪浪，而這些浪浪深陷痛苦的弱小生命。牠們承受著生理上的疼痛、心靈上的折磨，等待的就是你我的一雙手、一份「希望」。
                LAnimal 提供助養服務，我們把動物救援回來，並希望用愛讓牠們願意再次相信人類。讓因為家裡反對、無閒照顧的朋友們也能屬於自己的寶貝，
                竭盡所能幫助毛孩們走出苦難的陰影，此時，您的捐款與關心將是給毛孩最溫暖的禮物，更是我們最堅實的後盾。
                不再流浪，能夠擁有一個安心、安穩的家</p>
                <p>現今社會因為很多不肖業者為了獲利而刻意繁殖更多動物來販賣，對動物本身造成了很多健康上的問題，而領養的好處其實很多，
                可以免除動物的撲殺及虐待，也能讓牠們擁有安心安穩的家，不再到處流浪，牠們的天真無邪及忠心的陪伴，能讓生活增添更多趣事，
                領養前也請考慮周全，領養代替購買，終養不棄養。</p>
                <p>勵志給家中寵物最好的、最舒適的產品，最棒的生活品質，每個寵物都是自己家人，
                LAnimal 也為了大家最愛的寵物，準備了各式各樣商品，嚴格把關，食用安心、使用放心，
                讓您的寵物快樂成長 每一天，歡樂每一天。</p>
              </div>
            </div>
          </div>
          <div class="plan--ans">
            <h2 class="text-center mb-5">因此我們保證</h2>
              <div class="row justify-content-center">
                <div class="col-md-4 col-9 mb-md-0 mb-3">
                  <div class="card box-shadow h-100">
                    <div class="bg-cover"
                      style="height:200px;
                      background-image: url('https://images.unsplash.com/photo-1586282023692-6bfbd629e85d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');"
                      >
                    </div>
                    <div class="card-body">
                      <h5 class="card-title font-weight-bold text-center">費用透明化</h5>
                      <p class="card-text">我們將用於動物醫療、食品、用品、清潔費用，每月都會公開給助養者
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-9 mb-md-0 mb-3">
                  <div class="card box-shadow h-100">
                    <div class="bg-cover"
                      style="height:200px;
                      background-image: url('https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1090&q=80');"
                      >
                    </div>
                    <div class="card-body">
                      <h5 class="card-title font-weight-bold text-center">提供近況</h5>
                      <p class="card-text">每個月助養者 Email 將會收到助養動物的照片以及影片，以及近況消息
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-9 mb-md-0 mb-3">
                  <div class="card box-shadow h-100">
                    <div class="bg-cover"
                      style="height:200px;
                      background-image: url('https://images.unsplash.com/photo-1571151596869-2663a84c1e41?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=855&q=80');"
                      >
                    </div>
                    <div class="card-body">
                      <h5 class="card-title font-weight-bold text-center">商品公益</h5>
                      <p class="card-text">購買商品的價格將會抽出20%金額提供給全體動物以及環境清潔
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="introduction__animal">
        <h2 class="text-center mt-3">等待被愛的浪浪</h2>
        <ul class="list-unstyled">
          <li v-for="item in newAnimal" :key="item.id"
            :style="{backgroundImage: `url(${item.imageUrl[0]})`}"
            class="introduction__animal__size">
            <div class="hoverbg" @click="goCurrentTarget(item.id)">
              <span href="#" class="text-light text-decoration-none">
                  點擊了解更多{{item.title}}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="subscription container-fluid bg-secondary">
        <div class="row">
          <div class="col-6">
            <input type="text" placeholder="輸入你的信箱"><button>訂閱</button>
          </div>
          <div class="col-6">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* global $ */

export default {
  data() {
    return {
      show: false,
      isLoading: true,
      animal: [],
      newAnimal: [],
    };
  },
  methods: {
    getAnimal() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          if (res.status === 200) {
            const filterthings = res.data.data.filter((item) => item.category === '助養動物');
            vm.animal = filterthings;
            vm.isLoading = false;
            vm.randomAnimal();
          }
        });
    },
    randomAnimal() {
      const vm = this;
      const animal = [...vm.animal];
      const newAnimal = [];
      for (let i = 0; i < 5; i += 1) {
        const randomNum = Math.floor(Math.random() * animal.length);
        if (newAnimal.indexOf(animal[randomNum]) === -1) {
          newAnimal.push(animal[randomNum]);
        } else {
          i -= 1;
        }
      }
      vm.newAnimal = newAnimal;
    },
    goCurrentTarget(id) {
      this.$router.push({ path: `/singlepage/${id}` });
    },
    target(item) {
      const gettop = $(`#${item}`).offset().top - 90;
      if (item) {
        $('html,body').animate({ scrollTop: gettop }, 1000);
      }
      // const goTarget = document.querySelector(`#${item}`).offsetTop - 90;
      // // const scrollTop = item.scrollTop();
      // // window.scroll(0, goTarget);
      // $(`#${item}`).animate({ scrollTop: goTarget }, '1000');
    },
  },
  created() {
    this.getAnimal();
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
      // console.log(window.pageYOffset);
      if (window.pageYOffset >= 0) {
        setTimeout(() => {
          document.querySelector('.banner').classList.add('show');
        }, 700);
      }
      $(window).scroll(() => {
        const scrollPos = $(window).scrollTop();
        const windowHeight = $(window).height();
        $('.introduction__plan .plan--qus').each(function e() {
          const thisPos = $(this).offset().top;
          if (windowHeight + scrollPos >= thisPos + 90) {
            // $('.farm_text').removeClass('inner-hide');
            $('.introduction__plan .plan--qus').addClass('inner-show');
            $('.plan--qus div').addClass('border-p');
          }
        });
        $('.introduction__plan .plan--ans').each(function e() {
          const thisPos = $(this).offset().top;
          if (windowHeight + scrollPos >= thisPos + 90) {
            // $('.farm_text').removeClass('inner-hide');
            $('.introduction__plan .plan--ans').addClass('inner-show');
          }
        });
      });
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
