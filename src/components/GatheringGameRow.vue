<template>
  <tr>
    <td>{{ game.name }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ game.players.length }}</td>
    <td>
      <v-btn
        v-if="!isIn"
        @click="join()"
        color="primary"
        icon
        title="Присоединиться"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="isIn"
        @click="leave()"
        color="primary"
        icon
        title="Покинуть"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';
import client from '../feathers';

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

    const createdAt = computed(() => (new Date(game.createdAt)).toLocaleTimeString());

    const isIn = computed(() => {
      const userId = $store.state.auth.user.id;
      return game.players.some((player) => player.user === userId);
    });

    const join = async () => {
      try {
        await client
          .service(`game/${game.id}/players`)
          .create({});
      } catch (e) {
        console.log(e);
      }
    };

    const leave = async () => {
      const userId = $store.state.auth.user.id;
      const player = game.players.find((p) => p.user === userId);
      if (!player) return;
      try {
        await client
          .service(`game/${game.id}/players`)
          .remove(player.id);
      } catch (e) {
        console.log(e);
      }
    };

    return {
      createdAt,
      isIn,
      join,
      leave,
    };
  },
};
</script>
