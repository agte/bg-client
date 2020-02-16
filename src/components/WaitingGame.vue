<template>
  <tr>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn v-if="game.user.canJoin" @click="join()" title="Присоединиться" color="primary" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-if="game.user.canLeave" @click="leave()" title="Покинуть" color="primary" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn v-if="game.user.canRun" @click="run()" title="Запустить" color="primary" icon>
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';
import { prettyDatetime } from '../utils';

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
    return {
      createdAt: prettyDatetime(game.createdAt),
      join: () => $store.dispatch('game/join', game.id),
      leave: () => $store.dispatch('game/leave', game.id),
      players: computed(() => game.players.map((player) => player.name).join(', ')),
      run: () => $store.dispatch('game/run', game.id),
    };
  },
};
</script>
