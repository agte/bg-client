<template>
  <v-container fluid>
    <h1 class="display-1 my-5 text-center">Начатые игры</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th>Игра</th>
          <th>Дата создания</th>
          <th>Игроки</th>
          <th>Операции</th>
        </tr>
      </thead>
      <tbody>
        <launched-game v-for="game in games" :key="game.id" :game="game"></launched-game>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import LaunchedGame from '../components/LaunchedGame.vue';

export default {
  components: {
    LaunchedGame,
  },

  setup(props, context) {
    const { Game } = context.root.$FeathersVuex.api;
    const params = ref({
      qid: 'launchedGames',
      query: {
        status: 'launched',
        $limit: 50,
        $skip: 0,
        $sort: { createdAt: -1 },
      },
    });
    const { items: games } = useFind({ model: Game, params });

    return { games };
  },
};
</script>
