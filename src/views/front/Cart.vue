<template>
  <div class="container mt-5">
      <loading :active.sync="isLoading"></loading>
      <div v-if="carts.length">
        <div class="cart p-5 mt-5">
          <h3 class="h3 text-center mb-3">購物車</h3>
          <table class="table table-light">
            <thead>
              <tr>
                <th scope="col" width="30"></th>
                <th scope="col" width="90">圖片</th>
                <th scope="col">商品</th>
                <th scope="col" class="text-center" width="120">數量</th>
                <th scope="col" width="110">售價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.id">
                <td class="align-middle">
                  <a href="#" class="text-decoration-none text-danger align-self-center mx-2"
                    @click.prevent="delCart(item.product.id)">
                    <i class="fa fa-trash fa-2x"></i>
                  </a>
                </td>
                <td class="align-middle">
                  <div class="bg-cover"
                  :style="{backgroundImage: `url(${item.product.imageUrl[0]})`}">
                  </div>
                </td>
                <td class="align-middle">{{item.product.title}}</td>
                <td class="align-middle">
                  <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-outline-secondary rounded-0 btn-sm"
                      :disabled="item.quantity===1"
                      @click="updateQty(item.product.id, item.quantity - 1)">
                      -
                    </button>
                    <input type="text" disabled v-model="item.quantity"
                      class="text-center" style="width: 90px;">
                    <button type="button" class="btn btn-outline-secondary rounded-0 btn-sm"
                      @click="updateQty(item.product.id, item.quantity + 1)">+</button>
                  </div>
                </td>
                <td class="align-middle">{{item.quantity*item.product.price}}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <span class="align-self-center mr-2">總金額</span>
            <span class="text-danger h4 mr-2">{{totalPrice}}</span>
          </div>
        </div>
      </div>
      <div v-else class="cart p-5 mt-5 nothing text-center
        d-flex flex-column justify-content-center">
        <p>尚有商品在購物車，趕快去購買吧！</p>
        <a href="#" class="btn btn-info w-25 mx-auto" @click.prevent="goProducts">前往商品區</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      carts: [],
      totalPrice: 0,
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/shopping`)
        .then((res) => {
          vm.carts = res.data.data;
          vm.isLoading = false;
          console.log(res);
          vm.getTotalPrice();
        });
    },
    getTotalPrice() {
      const vm = this;
      vm.totalPrice = 0;
      vm.carts.forEach((item) => {
        vm.totalPrice += item.product.price * item.quantity;
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
    goProducts() {
      this.$router.push({ path: '/products' });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style style="scss" scoped>
  .cart{
    background-color: rgba(207, 207, 207, 0.575);
  }
  .nothing{
    height: 300px;
  }
  .bg-cover{
    background-position: center center;
    background-size: cover;
    height: 50px;
    width: 50px;
    /* width: 300px; */
  }
</style>
