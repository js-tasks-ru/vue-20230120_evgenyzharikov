<template>
  <UiToastList @remove="removeToast($event)" :toasts="Array.from(toasts.values())" />
</template>

<script>
import UiToastList from './UiToastList.vue';
const defaultTtlMs = 5000;
export default {
  name: 'TheToaster',
  components: {
    UiToastList,
  },
  data: function() {
    return {
      toasts: new Map(),
    };
  },
  lastId: 0,
  methods: {
    error: function(message) {
      this.pushToast('error', message);
    },
    success: function(message) {
      this.pushToast('success', message);
    },
    pushToast: function(kind, message, ttl=defaultTtlMs) {
      const id = this.$options.lastId++;
      const toast = {
        id,
        kind,
        message,
        ttl,
      };
      this.toasts.set(id, toast);
      setTimeout(() => {
        this.removeToast(id);
      }, ttl);
    },
    removeToast: function(id) {
      this.toasts.delete(id);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
