<template>
  <tr>
    <td>{{ game.name }}</td>
    <td>{{ status }}</td>
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

      <v-btn v-if="game.user.canPlay" @click="play()"
        color="primary" icon title="Открыть игровое поле"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <v-btn
        v-if="game.status === 'finished'" @click="play()"
        color="grey" icon title="Посмотреть игровое поле"
      >
        <v-icon>mdi-eye</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';
import { prettyDatetime } from '../utils';

const statuses = {
  draft: 'Черновик',
  gathering: 'Поиск игроков',
  pending: 'Подготовка к запуску',
  running: 'Запущена',
  finished: 'Завершена',
  aborted: 'Прервана',
};

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const { game } = props;
    const { $router, $store } = context.root;
    return {
      createdAt: prettyDatetime(game.createdAt),
      join: () => $store.dispatch('game/join', game.id),
      leave: () => $store.dispatch('game/leave', game.id),
      play: () => $router.push({ name: game.kind, params: { id: game.id } }),
      players: computed(() => game.players.map((player) => player.name).join(', ')),
      run: () => $store.dispatch('game/run', game.id),
      status: computed(() => statuses[game.status]),
    };
  },
};
</script>
