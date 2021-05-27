<template>
  <form class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model.trim="email" type="email" placeholder="demo@email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" placeholder="password" class="form-control" />
      </div>
    </div>
    <div class="form__buttons">
      <button @click.prevent="auth" type="submit" class="button button_primary button_block">Войти</button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',

  data() {
    return {
      email: null,
      password: null,
    }
  },

  methods: {
    auth() {
      if (!this.email) {
        alert('Требуется ввести Email')
        return
      }

      if (!this.password) {
        alert('Требуется ввести пароль')
        return
      }

      let promise = login(this.email, this.password)
      promise.then(res => {
        if (res.id !== undefined) {
          alert(res.fullname)
          let to = '/'
          if (this.$route.query.from !== undefined) {
            to = this.$route.query.from.substr(1)
          }
          this.$router.push(to)
        } else {
          alert(res.message)
        }
      })
    },
  },
};
</script>

<style></style>
