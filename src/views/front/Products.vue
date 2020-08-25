<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>
    <div class="bg bg-cover"></div>
    <div calss="container-fluid">
      <div class="row m-0 px-5 justify-content-center">
        <div class="col-md-3 col-7 fixed-md-top" style="margin-top: 70px;">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action"
              :class="{active:category===''}" @click.prevent="targetcategory('')">
              全部
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              :class="{active:category==='寵物用品'}" @click.prevent="targetcategory('寵物用品')">寵物用品</a>
            <a href="#" class="list-group-item list-group-item-action"
              :class="{active:category==='寵物食品'}" @click.prevent="targetcategory('寵物食品')">寵物食品</a>
            <a href="#" class="list-group-item list-group-item-action"
              :class="{active:category==='寵物玩具'}" @click.prevent="targetcategory('寵物玩具')">寵物玩具</a>
          </div>
          <div class="cart mt-3 border border-secondary border-top-0 ">
            <h3 class="h3 bg-dark text-light py-2 text-center">加入購物車</h3>
            <div v-if="carts.length">
              <div class="px-2 d-flex py-2 border-bottom" v-for="item in carts" :key="item.id">
                <a href="#" class="text-decoration-none text-danger align-self-center mx-2"
                  @click.prevent="delCart(item.product.id)">
                  <i class="fa fa-trash fa-2x"></i>
                </a>
                <div class="ml-3 m-auto text-center">
                  <span class="h6">{{item.product.title}}</span>
                  <div class="d-flex mt-3 justify-content-center">
                    <button type="button" class="btn btn-outline-secondary rounded-0 btn-sm"
                      :disabled="item.quantity===1"
                      @click="updateQty(item.product.id, item.quantity - 1)">-</button>
                    <input type="text" disabled v-model="item.quantity" class="text-center"
                      style="width: 90px;">
                    <button type="button" class="btn btn-outline-secondary rounded-0 btn-sm"
                      @click="updateQty(item.product.id, item.quantity + 1)">+</button>
                  </div>
                </div>
              </div>
              <a href="#" class="btn btn-secondary m-2 d-block" @click.prevent="goCart">前往結帳</a>
            </div>
            <div class="my-5 text-center" v-else>尚未有商品在購物車</div>
          </div>
        </div>
        <div class="col-md-9 ml-auto mt-5 col-12">
          <div class="row">
            <div class="col-xl-4 p-0 mb-4 col-md-6 col-12 " v-for="item in products" :key="item.id">
              <div class="card products-list rounded-0 h-auto">
                <div class="bg-cover card-img"
                  :style="{backgroundImage: `url(${item.imageUrl[0]})`}"
                  @click="goCurrentTarget(item.id)"></div>
                <div class="card-body">
                  <div class="card-title d-flex">
                    <h3>{{item.title}}</h3>
                    <span class="text-muted ml-auto mr-2 align-self-center"
                      style="font-size: 16px">{{item.category}}</span>
                  </div>
                  <p>{{item.content}}</p>
                  <div class="btn-type d-flex mt-2 align-self-end">
                    <span class="price">{{item.price}}</span>
                    <span class="originPrice text-muted">{{item.origin_price}}</span>
                    <a href="#" class="text-decoration-none ml-auto text-secondary mr-2"
                      @click.prevent="addCart(item)">
                      <i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <pagination :page="pagination" @emit-page="getProducts"></pagination> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
      category: '',
      carts: [],
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/products`;
      vm.$http.get(url)
        .then((res) => {
          if (res.status === 200) {
            if (vm.category === '') {
              const filterthings = res.data.data.filter((item) => item.category !== '助養動物');
              vm.products = filterthings;
            } else {
              const filterProducts = res.data.data.filter((item) => vm.category === item.category);
              // console.log()
              vm.products = filterProducts;
            }
            // vm.pagination=res.data.meta.pagination;
            vm.isLoading = false;
          }
        });
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then((res) => {
          vm.carts = res.data.data;
          vm.isLoading = false;
        });
    },
    targetcategory(item) {
      switch (item) {
        case '':
          this.category = '';
          break;
        case '寵物用品':
          this.category = '寵物用品';
          break;
        case '寵物食品':
          this.category = '寵物食品';
          break;
        case '寵物玩具':
          this.category = '寵物玩具';
          break;
        default:
          break;
      }
      this.getProducts();
    },
    goCurrentTarget(id) {
      this.$router.push({ path: `/singlepage/${id}` });
    },
    addCart(item, quantity = 1) {
      const vm = this;
      const data = {
        product: item.id,
        quantity,
      };
      vm.isLoading = true;
      vm.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`, data)
        .then(() => {
          vm.getCart();
          vm.isLoading = false;
        }).catch((error) => {
          // this.status.loadingItem = '';
          console.log(error.response.data.errors);
          vm.isLoading = false;
        });
    },
    delCart(id) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`)
        .then(() => {
          vm.getCart();
          vm.isLoading = false;
        });
    },
    updateQty(id, qty) {
      const vm = this;
      vm.isLoading = true;
      const data = {
        product: id,
        quantity: qty,
      };
      vm.$http.patch(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`, data)
        .then(() => {
          vm.getCart();
          vm.isLoading = false;
        }).catch((error) => {
          console.log(error.response.data.errors);
          vm.isLoading = false;
        });
    },
    goCart() {
      this.$router.push({ path: '/cart' });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
  .bg{
      background-image: url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
      height: 500px;
  };
  .bg-cover{
    background-position: center center;
    background-size: cover;
    margin: 0;
  }
  .products-list{
    margin:10px;
    box-shadow:2px 2px 4px rgb(185, 185, 185);
  }
  .card-img{
    position: relative;
    height: 200px;
  }
  .card-img::before{
    content:'';
    position: absolute;
    top: 100%;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 9999;
    transition:top .8s;
  }
  .products-list:hover .card-img::before{
    content: '查看更多';
    text-align: center;
    line-height: 200px;
    top: 0;
    color:honeydew;
    cursor: pointer;
  }
  .products-list .price{
    font-size: 20px;
    color: red;
    align-self: center;
  }
  .products-list .originPrice{
    font-style: oblique;
    text-decoration: line-through;
    align-self: center;
    margin-left: 5px;
  }
  .cart{
    overflow-y: auto;
    max-height: 450px;
  }
  .list-group-item.active{
    background-color: gray;
    border-color:gray;
  }
  .page-item.active .page-link{
    background-color: rgb(65, 64, 64);
    border-color:rgb(65, 64, 64);
  }
  .page-item.active .page-link:focus{
    box-shadow: 0 0 0 0.2rem rgba(191, 193, 194, 0.25);
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(196, 195, 195);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(151, 151, 151);
  }

</style>
