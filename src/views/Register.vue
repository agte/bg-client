<template>
  <v-container class="mx-auto" style="width: 480px">
    <v-form @submit.prevent="register(email, password, name)">
      <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
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
import { ref } from '@vue/composition-api';

export default {
  /* eslint-disable no-shadow */
  setup(props, context) {
    const { $store, $router } = context.root;

    const email = ref('');
    const password = ref('');
    const name = ref('');
    const showPassword = ref(false);
    const error = ref(null);

    const register = async (email, password, name) => {
      try {
        await $store.dispatch('user/register', { email, password, name: name || email });
        await $store.dispatch('auth/authenticate', { strategy: 'local', email, password });
        $router.push({ name: 'Home' });
      } catch (e) {
        error.value = { message: e.message };
      }
    };

    return {
      name,
      email,
      password,
      showPassword,
      error,
      register,
    };
  },
  /* eslint-enable no-shadow */
};
</script>
