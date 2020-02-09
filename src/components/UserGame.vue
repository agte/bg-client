<template>
  <tr>
    <td>{{ game.name }}</td>
    <td>{{ status }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ game.players.length }}</td>
    <td>
      <v-btn
        v-if="game.status === 'draft'"
        @click="startGathering()"
        color="primary"
        icon
        title="Найти игроков"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        v-if="game.status === 'gathering'"
        @click="stopGathering()"
        color="secondary"
        icon
        title="Отменить поиск игроков"
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
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
        v-if="game.status === 'draft'"
        @click="remove()"
        color="accent"
        icon
        title="Удалить"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';
import client from '../feathers';

const statuses = {
  draft: 'Черновик',
  gathering: 'Поиск игроков',
  pending: 'Подготовка к запуску',
  launched: 'Запущена',
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
    const { $store } = context.root;

    const createdAt = computed(() => {
      const date = new Date(game.createdAt);
      return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
    });

    const status = computed(() => statuses[game.status]);

    const remove = async () => {
      try {
        await game.remove();
      } catch (e) {
        console.log(e);
      }
    };

    const startGathering = async () => {
      try {
        await client
          .service(`game/${game.id}/status`)
          .update(null, { value: 'gathering' });
      } catch (e) {
        console.log(e);
      }
    };

    const stopGathering = async () => {
      try {
        await client
          .service(`game/${game.id}/status`)
          .update(null, { value: 'draft' });
      } catch (e) {
        console.log(e);
      }
    };

    const isIn = computed(() => {
      const userId = $store.state.auth.user.id;
      return game.players.some((player) => player.user === userId);
    });

    const join = async () => $store.dispatch('game/join', game.id);
    const leave = async () => $store.dispatch('game/leave', game.id);

    return {
      createdAt,
      status,
      remove,
      startGathering,
      stopGathering,
      isIn,
      join,
      leave,
    };
  },
};
</script>
