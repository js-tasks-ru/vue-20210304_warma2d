<template>
  <auth-layout title="Вход">
    <form class="form">
      <div class="form-group">
        <label class="form-label">Email</label>
        <div class="input-group">
          <input type="email" placeholder="demo@email" class="form-control" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Пароль</label>
        <div class="input-group">
          <input type="password" placeholder="password" class="form-control" />
        </div>
      </div>
      <div class="form__buttons">
        <button type="submit" class="button button_primary button_block">Войти</button>
      </div>
      <div class="form__append">Нет аккаунта? <a href="register.html" class="link">Зарегистрируйтесь</a></div>
    </form>
  </auth-layout>
</template>

<script>
import AuthLayout from '../components/AuthLayout';
export default {
  name: 'LoginPage',
  components: { AuthLayout },
};
</script>

<style scoped></style>
