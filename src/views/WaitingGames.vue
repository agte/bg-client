<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Партии</h1>
    <gathering-games :kind="gameKind"></gathering-games>
    <new-game-button v-if="authenticated" :kind="gameKind"></new-game-button>
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
      gameKind: context.root.$route.params.gameKind,
      authenticated: !!context.root.$store.state.auth.user,
    };
  },
};
</script>
