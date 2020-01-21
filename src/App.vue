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
    <v-app-bar app dark>
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
        >Мухожук</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn
        v-if="$route.path != '/sign-in'"
        to="/sign-in"
        text
      >
        <span class="mr-1">Войти</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
