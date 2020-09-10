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
            <th scope="col">名稱</th>
            <th scope="col">優惠碼</th>
            <th scope="col" width="200">到期日</th>
            <th scope="col" width="100">折扣</th>
            <th scope="col" width="100">是否啟用</th>
            <th scope="col" width="130"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in coupons" :key="item.id">
            <th class="align-middle">{{item.title}}</th>
            <td class="align-middle">{{item.code}}</td>
            <td class="align-middle">{{item.deadline.datetime}}</td>
            <td class="align-middle">{{item.percent}} % </td>
            <td>
              <span v-if="item.enabled" class="text-success align-middle">啟用</span>
              <span v-else class="align-middle">不啟用</span>
            </td>
            <td class="d-flex">
              <button type="button" class="btn btn-sm btn-outline-primary mr-1"
                data-toggle="modal" @click="openModal('edit',item)">編輯</button>
              <button type="button" class="btn btn-sm btn-outline-danger mr-1"
                data-toggle="modal" @click="openModal('del',item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade " id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="couponModalLabel" aria-hidden="true" data-backdrop="false">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-light" id="couponModalLabel">建立優惠劵</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" id="title" v-model="tempCoupon.title"
                      class="form-control" placeholder="請輸入優惠劵標題">
                </div>
                <div class="form-group">
                  <label for="code">優惠碼</label>
                  <input type="text" id="code" class="form-control"
                    v-model="tempCoupon.code" placeholder="請輸入優惠碼">
                </div>
                <div class="form-group">
                  <div class="form-row">
                    <div class="col">
                      <label for="due_date">到期日期</label>
                      <input type="date" id="due_date" class="form-control"
                          :min="mindate"
                          v-model="due_date" placeholder="請輸入到期日期">
                    </div>
                    <div class="col">
                      <label for="due_time">到期時間</label>
                      <input type="time" id="due_time" step="1"
                          class="form-control"
                          v-model="due_time" placeholder="請輸入到期時間">
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="percent">折扣</label>
                  <input type="number" id="percent" class="form-control"
                      v-model="tempCoupon.percent" placeholder="請輸入折扣">
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="enabled"
                      v-model="tempCoupon.enabled">
                  <label class="form-check-label" for="enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
          </div>
        </div>
      </div>
    </div>
    <del-modal :temp="tempCoupon" @delete="delCoupon"></del-modal>
  </div>
</template>

<script>
/* global $ */
import delModal from '../../components/admin/DeleteModal.vue';

export default {
  name: 'CreateCoupons',
  components: {
    delModal,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      due_time: '',
      due_date: '',
      mindate: this.getMinDate(),
      isNew: true,
      isLoading: false,
    };
  },
  methods: {
    getCoupons() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          vm.coupons = res.data.data;
          vm.isLoading = false;
        });
    },
    openModal(isNew, item) {
      const vm = this;
      switch (isNew) {
        case 'new':
          vm.tempCoupon = {};
          vm.due_time = '';
          vm.due_date = '';
          $('#couponModal').modal('show');
          $('#couponModal .modal-title').text('建立優惠碼');
          vm.isNew = true;
          break;
        case 'edit': {
          vm.tempCoupon = { ...item };
          $('#couponModal').modal('show');
          $('#couponModal .modal-title').text('編輯優惠碼');
          const dedlineAt = vm.tempCoupon.deadline.datetime.split(' ');
          [vm.due_date, vm.due_time] = dedlineAt;
          vm.isNew = false;
          break;
        }
        case 'del':
          vm.tempCoupon = { ...item };
          $('#delModal').modal('show');
          break;
        default:
          break;
      }
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = 'post';
      let messageStatus = '新增成功，你棒棒//';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'patch';
        messageStatus = '更新成功，你棒棒//';
      }
      vm.isLoading = true;
      vm.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      vm.$http[httpMethod](api, vm.tempCoupon)
        .then(() => {
          vm.isLoading = false;
          $('#couponModal').modal('hide');
          vm.$bus.$emit('messagePush', messageStatus, 'success');
          vm.getCoupons();
        }).catch(() => {
          vm.$bus.$emit('messagePush', 'Oops，有錯誤哦', 'danger');
          vm.isLoading = false;
          $('#couponModal').modal('hide');
        });
    },
    delCoupon(item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${item.id}`;
      vm.isLoading = true;
      vm.$http.delete(api)
        .then(() => {
          vm.getCoupons();
          vm.isLoading = false;
          vm.$bus.$emit('messagePush', '刪除成功囉棒棒//', 'success');
          $('#delModal').modal('hide');
        }).catch(() => {
          vm.isLoading = false;
          vm.$bus.$emit('messagePush', '刪除失敗，請重新再試', 'danger');
          $('#delModal').modal('hide');
        });
    },
    getMinDate() {
      const dtToday = new Date();
      let month = dtToday.getMonth() + 1;
      let day = dtToday.getDate();
      const year = dtToday.getFullYear();
      if (month < 10) month = `0${month.toString()}`;
      if (day < 10) day = `0${day.toString()}`;
      return `${year}-${month}-${day}`;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style>

</style>
