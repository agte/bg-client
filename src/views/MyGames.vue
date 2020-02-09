<template>
  <v-container fluid>
    <h1 class="display-1 my-5 text-center">Мои партии</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th>Игра</th>
          <th>Статус</th>
          <th>Время создания</th>
          <th>Игроки</th>
          <th>Операции</th>
        </tr>
      </thead>
      <tbody>
        <user-game v-for="game in games" :key="game.id" :game="game"></user-game>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import UserGame from '../components/UserGame.vue';

export default {
  components: {
    UserGame,
  },

  setup(props, context) {
    const { Game } = context.root.$FeathersVuex.api;
    const params = ref({
      qid: 'myGames',
      query: {
        owner: context.root.$store.getters.userId,
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
