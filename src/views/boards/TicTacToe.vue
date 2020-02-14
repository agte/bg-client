<template>
  <div v-if="ready">
    <h1 class="display-1 mt-4 text-center">
      {{ game.kindInstance.name }}
    </h1>
    <tic-tac-toe-gameplay :game="game" :gameplay="gameplay"></tic-tac-toe-gameplay>
  </div>
</template>

<script>
import { ref, isRef } from '@vue/composition-api';
import TicTacToeGameplay from '../../components/gameplays/TicTacToe.vue';

export default {
  components: {
    TicTacToeGameplay,
  },

  setup(props, context) {
    const { $store } = context.root;

    const ready = ref(false);
    const game = ref(null);
    const gameplay = ref(null);

    const gameId = context.root.$route.params.id;
    $store.dispatch('game/getFast', gameId)
      .then((result) => {
        game.value = isRef(result) ? result.value : result;
        return $store.dispatch('gameplay/load', gameId);
      })
      .then((result) => {
        gameplay.value = result;
        ready.value = true;
      });

    return {
      ready,
      game,
      gameplay,
    };
  },
};
</script>
