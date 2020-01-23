<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Партии</h1>
    <gathering-matches :game="game.id"></gathering-matches>
    <new-match-button :game="game.id"></new-match-button>
  </v-container>
</template>

<script>
import GatheringMatches from '../components/GatheringMatches.vue';
import NewMatchButton from '../components/NewMatchButton.vue';

export default {
  components: {
    GatheringMatches,
    NewMatchButton,
  },

  setup(props, context) {
    const gameId = context.root.$route.params.game;
    return {
      game: { id: gameId },
    };
  },
};
</script>
