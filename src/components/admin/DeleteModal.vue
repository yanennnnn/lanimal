<template>
  <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger text-light">
          <h5 class="modal-title">刪除{{temp.title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p>確定是否刪除<b>{{temp.title}}</b>?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-danger" @click="del">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'deleteModal',
  props: ['temp'],
  data() {
    return {

    };
  },
  methods: {
    del() {
      const vm = this;
      vm.$emit('delete', vm.temp);
      // vm.axios.delete(api)
      //   .then(() => {
      //     vm.$emit('update', true);
      //     $('#delModal').modal('hide');
      //   }).catch(() => {
      //     vm.$emit('update', false);
      //   });
    },
  },
};
</script>

<style>

</style>
