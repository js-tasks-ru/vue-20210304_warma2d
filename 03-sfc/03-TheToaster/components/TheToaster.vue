<template>
  <div class="toasts">
    <div v-for="toast in toastQueue"
         :key="toast.message"
         :class="{toast_success: toast.type === 'OK', toast_error: toast.type === 'ERR'}"
         class="toast"
    >
      <app-icon :icon="toast.icon"></app-icon>
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000
const TOAST_TYPE_OK = 'OK'
const TOAST_TYPE_ERR = 'ERR'

export default {
  name: 'TheToaster',

  components: { AppIcon },

  data() {
    return {
      toastQueue: [],
      toastIncrement: 0,
    };
  },

  methods: {
    error(message) {
      this.createToast(message, TOAST_TYPE_ERR)
    },

    success(message) {
      this.createToast(message, TOAST_TYPE_OK)
    },

    createToast(message, type) {
      this.toastIncrement++;

      let toast = {}
      toast.type = type === TOAST_TYPE_OK ? TOAST_TYPE_OK : TOAST_TYPE_ERR
      toast.icon = type === TOAST_TYPE_OK ? 'check-circle' : 'alert-circle'
      toast.message = message
      toast.key = this.toastIncrement

      this.toastQueue.push(toast)

      setTimeout(this.deleteToast, DELAY, this.toastIncrement);
    },

    deleteToast(toastKey) {
      let itemIndex = 0
      for (let toast of this.toastQueue) {
        if (toast.key === toastKey) {
          break
        }
        itemIndex++
      }
      this.toastQueue.splice(itemIndex,1)
    }
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

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
