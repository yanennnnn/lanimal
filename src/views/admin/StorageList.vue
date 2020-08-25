<template>
  <div class="container mt-5">
    <loading :active.sync="isLoading"></loading>
    <div class="mt-3 mx-auto">
      <table class="table">
        <thead>
          <tr>
            <th width="150">圖片縮圖</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="storages.length">
          <tr v-for="item in storages" :key="item.id">
            <th class="align-middle">
              <img
                :src="item.path"
                width="100px"
                class="img-fluid"
              >
            </th>
            <td class="align-middle text-right">
              <button type="button" class="btn btn-sm btn-outline-danger mr-1 inline-block"
                data-toggle="modal" @click="openModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
     </div>
    <pagination :page="pagination" @emit-page="getStorages"></pagination>
    <del-modal :temp="temStorages" @delete="delStorages"></del-modal>
  </div>
</template>

<script>
import pagination from '../../components/Pagination.vue';
import delModal from '../../components/admin/DeleteModal.vue';
/* global $ */

export default {
  name: 'StorageList',
  components: {
    pagination,
    delModal,
  },
  data() {
    return {
      storages: [],
      temStorages: {},
      pagination: {},
      status: {
        fileUploading: false,
      },
      isLoading: false,
    };
  },
  methods: {
    getStorages(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          vm.storages = res.data.data;
          vm.pagination = res.data.meta.pagination;
          vm.isLoading = false;
        });
    },
    openModal(item) {
      this.temStorages = { ...item };
      $('#delModal').modal('show');
    },
    delStorages(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/storage/${item.id}`;
      vm.isLoading = true;
      vm.$http.delete(api)
        .then(() => {
          vm.getStorages();
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
    this.getStorages();
  },
};
</script>

<style>

</style>
