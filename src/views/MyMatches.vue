<template>
  <v-container fluid>
    <h1 class="display-1 my-5 text-center">Мои партии</h1>
    <user-matches :owner="user.id"></user-matches>
  </v-container>
</template>

<script>
import UserMatches from '../components/UserMatches.vue';

export default {
  components: {
    UserMatches,
  },

  setup(props, context) {
    const { user } = context.root.$store.state.auth;
    return {
      user,
    };
  },
};
</script>
