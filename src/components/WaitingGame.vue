<template>
  <tr>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn v-if="!isIn" @click="join()" title="Присоединиться" color="primary" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-if="isIn" @click="leave()" title="Покинуть" color="primary" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn v-if="isOwner" @click="launch()" title="Запустить" color="primary" icon>
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  setup({ game }, context) {
    const { $store } = context.root;
    const { userId } = $store.getters;
    return {
      createdAt: computed(() => (new Date(game.createdAt)).toLocaleTimeString()),
      isIn: computed(() => game.players.some((player) => player.user === userId)),
      isOwner: computed(() => game.owner === userId),
      players: computed(() => game.players.map((player) => player.name).join(',')),
      join: async () => $store.dispatch('game/join', { game }),
      launch: async () => $store.dispatch('game/launch', { game }),
      leave: async () => $store.dispatch('game/leave', { game }),
    };
  },
};
</script>
