<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5">Матчи</h1>
    <matches :game="game.id"></matches>
  </v-container>
</template>

<script>
import Matches from '../components/Matches.vue';

export default {
  components: { Matches },
  setup(props, context) {
    const gameId = context.root.$route.params.game;
    return {
      game: { id: gameId },
    };
  },
};
</script>
