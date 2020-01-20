<style scoped>
.sign-in {
  max-width: 480px;
  margin: 0 auto;
}
</style>

<template>
  <v-container class="sign-in" fluid>
    <v-form class="pt-5" @submit.prevent="login">
      <v-text-field
        v-model="email"
        name="email"
        type="email"
        label="Email"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="password"
        name="password"
        label="Пароль"
        outlined
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
  </v-container>
</template>

<script>
import client from '@/feathers.js';

export default {
  name: 'SignIn',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login() {
      client
        .authenticate({
          strategy: 'local',
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push('/');
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
};
</script>
