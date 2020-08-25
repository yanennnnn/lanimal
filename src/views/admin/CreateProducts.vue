<template>
  <div class="mt-5 container">
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-5">
      <button type="button" class="btn btn-primary" data-toggle="modal"
        @click="openModal('new')">建立新的產品
      </button>
    </div>
    <div class="mt-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="120">分類</th>
            <th scope="col">產品名稱</th>
            <th scope="col" class="text-center" width="70">原價</th>
            <th scope="col" class="text-center" width="70">售價</th>
            <th scope="col" class="text-center" width="100">是否啟用</th>
            <th scope="col" class="text-center" width="130">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <th scope="row" class="align-middle">{{item.category}}</th>
            <td class="align-middle">{{item.title}}</td>
            <td class="align-middle">{{item.origin_price|currency}}</td>
            <td class="text-danger align-middle">
              <span v-if="item.price===item.origin_price">{{item.price|currency}}</span>
              <span v-else class="text-danger">{{item.price|currency}}</span>
            </td>
            <td class="text-center align-middle">
              <span v-if="item.enabled" class="text-success">啟用</span>
              <span v-else>不啟用</span>
            </td>
            <td>
              <button type="button" class="btn btn-sm btn-outline-primary mr-1"
                data-toggle="modal" @click="openModal('edit',item)">編輯</button>
              <button type="button" class="btn btn-sm btn-outline-danger mr-1 inline-block"
                data-toggle="modal" @click="openModal('del',item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- pagination  -->
     <pagination :page="pagination" @emit-page="getProducts"></pagination>
    <!-- prosuctModal -->
    <div class="modal fade " id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="productModalLabel" aria-hidden="true" data-backdrop="false">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="productModalLabel">建立產品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div v-for="i in 5" :key="i + 'img'" class="form-group">
                  <label :for="'img' + i">輸入圖片網址</label>
                  <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]"
                    type="text" class="form-control"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i v-if="status.fileUploading" class="fa fa-spinner fa-spin"></i>
                  </label>
                  <input id="customFile" ref="file" type="file" class="form-control"
                      @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" id="title" v-model="tempProduct.title"
                      class="form-control" placeholder="請輸入產品標題">
                </div>
                <div class="form-row">
                  <div class="col">
                    <label for="originPrice">原價</label>
                    <input type="number" id="originPrice" class="form-control"
                      v-model="tempProduct.origin_price" placeholder="請輸入原價">
                  </div>
                  <div class="col">
                    <label for="price">售價</label>
                    <input type="number" id="price" class="form-control"
                        v-model="tempProduct.price" placeholder="請輸入售價">
                  </div>
                </div>
                <div class="form-row">
                  <div class="col">
                    <label for="category">分類</label>
                    <input type="text" id="category" class="form-control"
                        v-model="tempProduct.category" placeholder="請輸入分類">
                  </div>
                  <div class="col">
                    <label for="unit">單位</label>
                    <input type="text" id="unit" class="form-control"
                        v-model="tempProduct.unit" placeholder="請輸入單位">
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label for="description">產品描述</label>
                  <textarea name="" class="form-control" id="description" rows="5"
                      v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group mt-3">
                  <label for="content">說明內容</label>
                  <textarea name="" class="form-control" id="content"
                      v-model="tempProduct.content" placeholder="請輸入說明內容"></textarea>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="enabled"
                      v-model="tempProduct.enabled">
                  <label class="form-check-label" for="enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <del-modal :temp="tempProduct" @delete="delProduct"></del-modal>
  </div>
</template>

<script>
/* global $ */
import delModal from '../../components/admin/DeleteModal.vue';
import pagination from '../../components/Pagination.vue';

export default {
  name: 'CreateProducts',
  props: ['token'],
  components: {
    delModal,
    pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {
        imageUrl: [],
      },
      pagination: {},
      tempOptions: {},
      status: {
        fileUploading: false,
      },
      isNew: true,
      isLoading: false,
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          vm.products = res.data.data;
          vm.pagination = res.data.meta.pagination;
          vm.isLoading = false;
        });
    },
    getTargetProduct(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${id}`;
      vm.$http.get(api)
        .then((res) => {
          vm.tempProduct = res.data.data;
          $('#productModal').modal('show');
          vm.isLoading = false;
        });
    },
    openModal(isNew, item) {
      const vm = this;
      switch (isNew) {
        case 'new':
          vm.tempProduct = {
            imageUrl: [],
          };
          vm.isNew = true;
          $('#productModal').modal('show');
          $('#productModal .modal-title').text('建立產品');
          break;
        case 'edit':
          vm.getTargetProduct(item.id);
          vm.isNew = false;
          break;
        case 'del':
          vm.tempProduct = { ...item };
          $('#delModal').modal('show');
          $('#productModal .modal-title').text('編輯產品');
          break;
        default:
          break;
      }
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product`;
      vm.isLoading = true;
      let httpMethod = 'post';
      let messageStatus = '新增成功，你棒棒//';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${vm.tempProduct.id}`;
        httpMethod = 'patch';
        messageStatus = '更新成功，你棒棒//';
      }
      vm.$http[httpMethod](api, vm.tempProduct)
        .then(() => {
          vm.getProducts();
          $('#productModal').modal('hide');
          vm.$bus.$emit('messagePush', messageStatus, 'success');
          vm.isLoading = false;
        }).catch(() => {
          vm.$bus.$emit('messagePush', 'Oops，有錯誤哦', 'danger');
          vm.isLoading = false;
        });
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = vm.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      vm.status.fileUploading = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage`;
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((res) => {
        vm.status.fileUploading = false;
        if (res.status === 200) {
        // vm.$set(vm.tempProduct, 'imageUrl', res.data.data.path);//強制雙向綁定
          vm.tempProduct.imageUrl.push(res.data.data.path);
        }
      }).catch(() => {
        vm.$bus.$emit('messagePush', '上傳不可超過 2 MB', 'danger');
        vm.status.fileUploading = false;
      });
    },
    delProduct(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
      vm.isLoading = true;
      vm.$http.delete(api)
        .then(() => {
          vm.getProducts();
          vm.isLoading = false;
          vm.$bus.$emit('messagePush', '刪除成功囉棒棒//', 'success');
          $('#delModal').modal('hide');
        }).catch(() => {
          vm.isLoading = false;
          vm.$bus.$emit('messagePush', '刪除失敗，請重新再試', 'danger');
          $('#delModal').modal('hide');
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>

</style>
