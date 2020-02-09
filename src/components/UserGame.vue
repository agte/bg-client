<template>
  <tr>
    <td>{{ gameKind.name }}</td>
    <td>{{ status }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn v-if="canJoin" @click="join()" title="Присоединиться" color="primary" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-if="canLeave" @click="leave()" title="Покинуть" color="primary" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn v-if="canLaunch" @click="launch()" title="Запустить" color="primary" icon>
        <v-icon>mdi-play</v-icon>
      </v-btn>

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
    kind: {
      type: String,
      required: false,
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
