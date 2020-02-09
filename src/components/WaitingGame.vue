<template>
  <tr>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn v-if="canJoin" @click="join()" title="Присоединиться" color="primary" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-if="canLeave" @click="leave()" title="Покинуть" color="primary" icon>
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
      canJoin: computed(() => game.players.length < game.maxPlayers),
      canLeave: computed(() => game.players.some((player) => player.user === userId)),
      isOwner: computed(() => game.owner === userId),
      players: computed(() => game.players.map((player) => player.name).join(', ')),
      join: async () => $store.dispatch('game/join', game.id),
      launch: async () => $store.dispatch('game/launch', game.id),
      leave: async () => {
        await $store.dispatch('game/leave', game.id);
        if (game.players.length === 0) {
          await $store.dispatch('game/stopGathering', game.id);
          await $store.dispatch('game/remove', game.id);
        }
      },
    };
  },
};
</script>
