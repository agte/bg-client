<template>
  <v-container class="mx-auto" style="max-width: 1000px">
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
import { reactive } from '@vue/composition-api';
import UserGame from '../components/UserGame.vue';

export default {
  components: {
    UserGame,
  },

  setup(props, context) {
    const searchQuery = reactive({
      qid: 'myGames',
      query: {
        'players.user': context.root.$store.getters.userId,
        $limit: 50,
        $skip: 0,
        $sort: { createdAt: -1 },
      },
    });
    const { items: games } = useFind({
      model: context.root.$FeathersVuex.api.Game,
      params: searchQuery,
    });
    return { games };
  },
};
</script>
