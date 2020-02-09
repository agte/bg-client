<template>
  <tr>
    <td>{{ game.name }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn
        v-if="isIn"
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
import { computed } from '@vue/composition-api';
// import client from '../feathers';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const { game } = props;
    const { $store } = context.root;

    const createdAt = computed(() => {
      const date = new Date(game.createdAt);
      return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
    });

    const players = computed(() => game.players.map((player) => player.name).join(', '));

    const isIn = computed(() => {
      const userId = $store.state.auth.user.id;
      return game.players.some((player) => player.user === userId);
    });

    const play = () => {
      console.log('Should open a game window');
    };

    return {
      createdAt,
      players,
      isIn,
      play,
    };
  },
};
</script>
