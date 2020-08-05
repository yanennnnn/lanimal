<template>
  <div>
    <div class="mt-5">
      <h5 class="h2" id="productModalLabel">{{tempProduct.title}}</h5>
    </div>
    <div class="">
      <img :src="tempProduct.imageUrl[0]" class="img-fluid mx-auto d-block"
        alt="" style="width:150px; height:150px">
      <p>{{tempProduct.description}}</p>
      <span>{{tempProduct.price}}</span>
      <select class="custom-select" v-model="tempProduct.num">
        <option v-for="num in 10" :key="num" :value="num">
          選購 {{ num }} {{ tempProduct.unit }}
        </option>
      </select>
    </div>
    <div class="">
      <button type="button" class="btn btn-secondary"
        @click="addCart(tempProduct.id,tempProduct.num)">加入購物車</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleProduct',
  data() {
    return {
      tempProduct: {
        imageUrl: [],
        num: 0,
      },
      isLoading: false,
      productId: '',
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/ec/product/${vm.productId}`)
        .then((res) => {
          vm.tempProduct = res.data.data;
          vm.$set(vm.tempProduct, 'num', 1);
          vm.isLoading = false;
        });
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProduct();
  },
};
</script>

<style>

</style>
