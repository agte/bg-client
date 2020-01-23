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
        class="logo-link d-flex align-center"
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
        v-if="$route.name != 'Login' && !$store.state.auth.user"
        :to="{ name: 'Login' }"
        text
      >
        <span class="mr-1">Войти</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn
        v-if="$store.state.auth.user"
        text
        @click="logout()"
      >
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
import { onMounted } from '@vue/composition-api';

export default {
  setup(props, context) {
    const { $store } = context.root;

    const logout = () => $store.dispatch('auth/logout');

    onMounted(() => {
      $store.dispatch('auth/authenticate')
        .catch((e) => {
          if (!e.message.includes('Could not find stored JWT')) {
            console.error(e);
          }
        });
    });

    return {
      logout,
    };
  },
};
</script>
