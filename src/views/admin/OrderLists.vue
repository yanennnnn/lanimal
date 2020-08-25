<template>
  <div class="container mt-5">
    <div class="input-group w-25 ml-auto">
      <select class="custom-select" id="change" @change="changePaid($event)">
        <option selected value="all">全部</option>
        <option value="true" >已付款</option>
        <option value="false" >未付款</option>
      </select>
    </div>
     <loading :active.sync="isLoading"></loading>
     <div class="mt-3">
      <table class="table">
        <thead>
          <tr>
            <th scope="col" width="200">下單時間</th>
            <th scope="col">購買款項</th>
            <th scope="col" width="120">付款方式</th>
            <th scope="col" width="100">應付金額</th>
            <th scope="col" width="130">是否付款</th>
            <th scope="col" width="130"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <th class="align-middle">{{item.created.datetime}}</th>
            <th class="align-middle">
              <ul class="list-unstyled">
                <li
                  v-for="(product, i) in item.products" :key="i"
                >
                  {{ product.product.title }} 數量：{{ product.quantity }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </th>
            <td class="align-middle">{{item.payment}}</td>
            <td class="align-middle">{{item.amount|currency}}</td>
            <td class="align-middle">
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" v-model="item.paid"
                  :id="item.id" @change="setOrderPaid(item)">
                <label class="custom-control-label" :for="item.id">
                  <span v-if="item.paid" class="text-success">已付款</span>
                  <span v-else class="text-danger">未付款</span>
                </label>
              </div>
            </td>
            <td class="align-middle">
              <button type="button" class="btn btn-sm btn-outline-primary mr-1"
                data-toggle="modal" @click="openModal('check', item)">查看</button>
              <button type="button" class="btn btn-sm btn-outline-success mr-1 inline-block"
                data-toggle="modal" @click="openModal('edit', item)">編輯</button>
            </td>
          </tr>
        </tbody>
      </table>
     </div>
    <pagination :page="pagination" @emit-page="getOrders"></pagination>
    <!-- 查看 -->
    <div class="modal fade" id="checkModal" tabindex="-1" role="dialog"
        aria-labelledby="checkModlTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="checkModalLongTitle">個人訂單列表</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="tempOrder.user">
            <div class="mt-1">
              <span>訂單時間： </span>
              <span>{{ tempOrder.created.datetime}}</span>
            </div>
            <div class="mt-1">
              <span>收件人姓名： </span>
              <span>{{ tempOrder.user.name }}</span>
            </div>
            <div class="mt-1">
              <span>電話： </span>
              <span>{{ tempOrder.user.tel }}</span>
            </div>
            <div class="mt-1">
              <span>信箱： </span>
              <span>{{ tempOrder.user.email }}</span>
            </div>
            <div class="mt-1">
              <span>地址： </span>
              <span>{{ tempOrder.user.address }}</span>
            </div>
            <div class="mt-1">
              <span>總金額： </span>
              <span>{{ tempOrder.amount | currency }}</span>
            </div>
             <div class="mt-1">
              <span>付款方式： </span>
              <span>{{ tempOrder.payment}}</span>
            </div>
            <div class="mt-1">
              <span>是否付款： </span>
              <span v-if="tempOrder.paid" class="text-primary">已付款</span>
              <span v-else class="text-danger">未付款</span>
            </div>
            <div class="mt-1">
              <span>備註： </span>
              <span>{{ tempOrder.message }}</span>
            </div>
            <div class="mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">商品名稱</th>
                    <th scope="col">數量</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(product,i) in tempOrder.products" :key="i">
                    <td>{{ product.product.title }}</td>
                    <td>{{ product.quantity }} / {{ product.product.unit }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- updateModal -->
    <div class="modal fade" id="updateModal" tabindex="-1" role="dialog"
        aria-labelledby="updateModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-middle-green-yellow ">
            <h5 class="modal-title" id="updateModalLongTitle">編輯訂單資料</h5>
            <button type="button" class="close " data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" v-if="tempOrder.user">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="name">收件人姓名</label>
                <input type="text" class="form-control" id="name"
                  placeholder="請輸入收件人姓名" v-model="tempOrder.user.name">
              </div>
              <div class="form-group col-md-6">
                <label for="tel">電話</label>
                <input type="number" onkeyup="value=value.replace(/[^0-9]/g,'')"
                  class="form-control" id="tel"
                  placeholder="請輸入電話" v-model="tempOrder.user.tel">
              </div>
            </div>
            <div class="form-group">
              <label for="email">信箱</label>
              <input type="text" class="form-control" id="email"
                placeholder="請輸入信箱" v-model="tempOrder.user.email">
            </div>
            <div class="form-group">
              <label for="address">地址</label>
              <input type="text" class="form-control" id="address"
                placeholder="請輸入地址" v-model="tempOrder.user.address">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-muted"
              data-dismiss="modal">
                  取消
            </button>
            <button type="button" class="btn btn-primary"
              @click="updateOrder">
                  確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../../components/Pagination.vue';
/* global $ */

export default {
  name: 'OrderLists',
  components: {
    pagination,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrders(page = 1, isPaid = 'all') {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          if (isPaid === 'all') {
            vm.orders = res.data.data;
          } else {
            const filterOrders = res.data.data.filter((item) => item.paid === isPaid);
            vm.orders = filterOrders;
          }
          vm.pagination = res.data.meta.pagination;
          vm.isLoading = false;
        });
    },
    changePaid(event) {
      let isPaid;
      switch (event.target.value) {
        case 'all':
          isPaid = 'all';
          break;
        case 'true':
          isPaid = true;
          break;
        case 'false':
          isPaid = false;
          break;
        default:
          break;
      }
      this.getOrders(1, isPaid);
    },
    openModal(status, item) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`;
      vm.isLoading = true;
      vm.$http.get(api)
        .then((res) => {
          vm.tempOrder = res.data.data;
          vm.isLoading = false;
          if (status === 'check') {
            $('#checkModal').modal('show');
          } else if (status === 'edit') {
            $('#updateModal').modal('show');
          }
        });
    },
    setOrderPaid(item) {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
      if (!item.paid) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
      }
      vm.$http.patch(api, item.id)
        .then(() => {
          vm.$bus.$emit('messagePush', '付款狀態更改成功~', 'success');
          vm.getOrders();
        }).catch(() => {
          vm.$bus.$emit('messagePush', 'Oops,付款狀態更改失敗', 'danger');
        });
    },
    updateOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_UUID}/admin/ec/orders/${vm.tempOrder.id}`;
      vm.isLoading = true;
      vm.$http.patch(api, vm.tempOrder.id)
        .then(() => {
          $('#updateModal').modal('hide');
          vm.$bus.$emit('messagePush', '更新成功棒棒//', 'success');
          vm.getOrders();
          vm.isLoading = false;
        }).catch(() => {
          vm.$bus.$emit('messagePush', 'Oops,更新失敗', 'danger');
          vm.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style>

</style>
