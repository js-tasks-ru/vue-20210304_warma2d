<template>
  <form class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model.trim="email"  type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model.trim="fio" type="text"  class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="repeat_password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"><input v-model="isAgree" type="checkbox" /> Я согласен с условиями <span></span></label>
    </div>
    <div class="form__buttons">
      <button @click.prevent="auth" type="submit" class="button button_primary">Зарегистрироваться</button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',

  data() {
    return {
      email: null,
      fio: null,
      password: null,
      repeat_password: null,
      isAgree: false,
    }
  },

  methods: {
    auth() {
      if (!this.email) {
        alert('Требуется ввести Email')
        return
      }

      if (!this.fio) {
        alert('Требуется ввести полное имя')
        return
      }

      if (!this.password) {
        alert('Требуется ввести пароль')
        return
      }

      if (this.password !== this.repeat_password) {
        alert('Пароли не совпадают')
        return
      }

      if (!this.isAgree) {
        alert('Требуется согласиться с условиями')
        return
      }

      let promise = register(this.email, this.fio, this.password)

      promise.then(res => {
        if (res.id !== undefined) {
          alert(res.id)
          this.$router.push('login')
        } else {
          alert(res.message)
        }
      })
    },
  },
};
</script>

<style></style>
