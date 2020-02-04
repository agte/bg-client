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

      <v-btn
        v-if="isOwner"
        @click="launch()"
        color="primary"
        icon
        title="Запустить"
      >
        <v-icon>mdi-play</v-icon>
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

    const isOwner = computed(() => {
      const userId = $store.state.auth.user.id;
      return userId === game.owner;
    });

    const join = async () => $store.dispatch('game/join', { game });
    const leave = async () => $store.dispatch('game/leave', { game });

    const launch = async () => {
      try {
        await client
          .service(`game/${game.id}/status`)
          .update(null, { value: 'launched' });
      } catch (e) {
        console.log(e);
      }
    };

    return {
      createdAt,
      isIn,
      isOwner,
      join,
      leave,
      launch,
    };
  },
};
</script>
