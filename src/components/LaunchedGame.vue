<template>
  <tr>
    <td>{{ gameKind.name }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn
        v-if="canPlay"
        @click="play()"
        color="primary"
        icon
        title="Открыть"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { ref, isRef } from '@vue/composition-api';
import useGame from '../mixins/useGame';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const { $store } = context.root;
    const gameKind = ref({ name: 'Unknown' });
    $store.dispatch('gameKind/getFast', props.game.kind)
      .then((resource) => {
        gameKind.value = isRef(resource) ? resource.value : resource;
      });

    return {
      ...useGame(props.game, context.root.$store),
      gameKind,
    };
  },
};
</script>
