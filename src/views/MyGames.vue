<template>
  <v-container fluid>
    <h1 class="display-1 my-5 text-center">Мои партии</h1>
    <user-games :owner="user.id"></user-games>
  </v-container>
</template>

<script>
import UserGames from '../components/UserGames.vue';

export default {
  components: {
    UserGames,
  },

  setup(props, context) {
    const { user } = context.root.$store.state.auth;
    return {
      user,
    };
  },
};
</script>
