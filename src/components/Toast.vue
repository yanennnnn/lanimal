<template>
  <div style="position: fixed; top: 56px; right: 0px; min-width: 300px; z-index: 11000;">
    <div class="toast fade show"
      v-for="item in messages" :key="item.timestamp">
      <div class="toast-header">
        <div
          class="inline-block rounded mr-2"
          style="width: 20px; height: 20px"
          :class="`bg-${ item.status }`"
        />
        <strong class="mr-auto">訊息通知</strong>
        <small>現在</small>
        <button type="button" class="ml-2 mb-1 close" @click="closeToast(`toast-${i}`)"
          data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{item.message}}
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const vm = this;
      const timestamp = Math.floor(new Date() / 1000);
      vm.messages.push({
        message,
        status,
        timestamp,
      });
      vm.removeMessageWithTiming(timestamp);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    closeToast(elemt) {
      $(`#${elemt}`).toast('hide');
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('messagePush', (message, status = 'danger') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style>

</style>
