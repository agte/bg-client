<style>
.logo-link {
  text-decoration: none;
}
.toolbar-title {
  text-transform: uppercase;
}
</style>

<template>
  <v-app>
    <v-app-bar app dark color="secondary">
      <router-link to="/" class="logo-link d-flex align-center mr-5">
        <v-icon large>mdi-bee</v-icon>
        <v-toolbar-title class="font-weight-regular title white--text toolbar-title">
          Мухожук
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn v-if="authenticated" :to="{ name: 'Home' }" exact text>Начать играть</v-btn>
      <v-btn v-if="authenticated" :to="{ name: 'MyGames' }" text>Мои игры</v-btn>
      <v-btn v-if="authenticated" :to="{ name: 'LaunchedGames' }" text>Идут сейчас</v-btn>

      <v-spacer></v-spacer>

      <v-btn v-if="!authenticated" :to="{ name: 'Login' }" text>
        <span class="mr-1">Войти</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn v-if="authenticated" @click="logout()" text>
        <span class="mr-1">Выйти</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  setup(props, context) {
    const { $store } = context.root;
    return {
      logout: () => $store.dispatch('auth/logout').then(() => window.location.reload()),
      authenticated: computed(() => $store.getters.authenticated),
    };
  },
};
</script>
