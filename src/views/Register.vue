<style scoped>
.register {
  max-width: 480px;
  margin: 0 auto;
}
</style>

<template>
  <v-container class="register" fluid>
    <v-form @submit.prevent="register">
      <v-alert v-if="error.message" type="error">{{ error.message }}</v-alert>
      <v-text-field
        v-model="name"
        name="name"
        type="text"
        label="Имя"
        outlined
        autofocus
      ></v-text-field>
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
      >Зарегистрироваться</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    showPassword: false,
    error: {},
  }),
  methods: {
    async register() {
      const { User } = this.$FeathersVuex.api;
      try {
        const user = new User({
          name: this.name,
          email: this.email,
          password: this.password,
        });
        await user.save();
        this.$store.dispatch('auth/authenticate', {
          strategy: 'local',
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: 'Home' });
      } catch (e) {
        this.error = {
          message: e.message,
        };
      }
    },
  },
};
</script>
