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
      <router-link
        to="/"
        class="logo-link d-flex align-center mr-5"
      >
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title
          class="font-weight-regular title white--text toolbar-title"
        >
          Мухожук
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        v-if="user"
        :to="{ name: 'MyGames' }"
        text
      >
        Мои партии
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        v-if="!user"
        :to="{ name: 'Login' }"
        text
      >
        <span class="mr-1">Войти</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn
        v-if="user"
        text
        @click="logout()"
      >
        <span class="mr-1">Выйти</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view v-if="ready"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';

export default {
  setup(props, context) {
    const { $store } = context.root;

    const ready = ref(false);

    const logout = () => $store.dispatch('auth/logout');

    const user = computed(() => $store.state.auth.user);

    onMounted(async () => {
      try {
        await $store.dispatch('auth/authenticate');
      } catch (e) {
        if (e.code !== 401) {
          console.error(e);
        }
      } finally {
        ready.value = true;
      }
    });

    return {
      ready,
      logout,
      user,
    };
  },
};
</script>
