<template>
  <v-container fluid>
    <h1 class="display-1 my-5 text-center">Начатые игры</h1>
    <launched-games></launched-games>
  </v-container>
</template>

<script>
import LaunchedGames from '../components/LaunchedGames.vue';

export default {
  components: {
    LaunchedGames,
  },
};
</script>
