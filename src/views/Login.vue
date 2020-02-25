<template>
  <v-container class="mx-auto" style="width: 480px">
    <v-form @submit.prevent="login(email, password)">
      <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
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
import { ref } from '@vue/composition-api';

export default {
  /* eslint-disable no-shadow */
  setup(props, context) {
    const { $store, $router } = context.root;

    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const error = ref(null);

    const login = async (email, password) => {
      try {
        await $store.dispatch('auth/authenticate', { strategy: 'local', email, password });
        $router.push({ name: 'Home' });
      } catch (e) {
        error.value = {
          message: e.className === 'not-authenticated'
            ? 'Неправильный email или пароль.'
            : 'Возникла непредвиденная ошибка. Обратитесь к администратору сайта.',
        };
      }
    };

    return {
      email,
      password,
      showPassword,
      error,
      login,
    };
  },
  /* eslint-enable no-shadow */
};
</script>
