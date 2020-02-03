<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Партии</h1>
    <gathering-games :kind="gameKind.id"></gathering-games>
    <new-game-button :kind="gameKind.id"></new-game-button>
  </v-container>
</template>

<script>
import GatheringGames from '../components/GatheringGames.vue';
import NewGameButton from '../components/NewGameButton.vue';

export default {
  components: {
    GatheringGames,
    NewGameButton,
  },

  setup(props, context) {
    return {
      gameKind: { id: context.root.$route.params.gameKind },
    };
  },
};
</script>
