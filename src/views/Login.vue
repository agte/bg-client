<style scoped>
.login {
  max-width: 480px;
  margin: 0 auto;
}
</style>

<template>
  <v-container class="login" fluid>
    <v-form @submit.prevent="login">
      <v-alert v-if="error.message" type="error">{{ error.message }}</v-alert>
      <v-text-field
        v-model="email"
        name="email"
        type="email"
        label="Email"
        outlined
        autofocus
        clearable
      ></v-text-field>
      <v-text-field
        v-model="password"
        name="password"
        label="Пароль"
        outlined
        clearable
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        block
        large
      >Войти</v-btn>
    </v-form>

    <v-divider class="my-5"></v-divider>

    <div class="pb-1 text-center">
      Впервые на сайте?
    </div>
    <v-btn block large color="secondary" :to="{ name: 'Register' }">Зарегистрируйтесь</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    error: {},
  }),
  methods: {
    login() {
      this.$store
        .dispatch('auth/authenticate', {
          strategy: 'local',
          email: this.email,
          password: this.password,
        })
        .then(
          () => this.$router.push({ name: 'Home' }),
          (e) => {
            this.error = {
              message: e.className === 'not-authenticated'
                ? 'Неправильный email или пароль.'
                : 'Возникла непредвиденная ошибка. Обратитесь к администратору сайта.',
            };
          },
        );
    },
  },
};
</script>
