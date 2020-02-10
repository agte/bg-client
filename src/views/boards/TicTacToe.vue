<template>
  <div v-if="ready">
    <h1>{{ game.kindInstance.name }}</h1>
  </div>
</template>

<script>
import { ref, isRef } from '@vue/composition-api';

export default {
  setup(props, context) {
    const { $store } = context.root;

    const ready = ref(false);
    const game = ref(null);
    const gameplay = ref(null);

    const gameId = context.root.$route.params.id;
    $store.dispatch('game/getFast', gameId)
      .then((result) => {
        game.value = isRef(result) ? result.value : result;
        return $store.dispatch('gameplayState/load', gameId);
      })
      .then((result) => {
        gameplay.value = result;
        ready.value = true;
      });

    return {
      ready,
      game,
    };
  },
};
</script>
