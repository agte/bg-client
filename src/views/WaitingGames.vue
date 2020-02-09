<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Партии</h1>
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
        <waiting-game v-for="game in games" :key="game.id" :game="game"></waiting-game>
      </tbody>
    </v-simple-table>
    <new-game-button v-if="canCreateGame" :kind="gameKind"></new-game-button>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref, computed } from '@vue/composition-api';
import NewGameButton from '../components/NewGameButton.vue';
import WaitingGame from '../components/WaitingGame.vue';

export default {
  components: {
    NewGameButton,
    WaitingGame,
  },

  setup(props, context) {
    const { gameKind } = context.root.$route.params;

    const params = ref({
      qid: 'waitingGames',
      query: {
        kind: gameKind,
        status: 'gathering',
        $limit: 50,
        $skip: 0,
        $sort: { createdAt: -1 },
      },
    });
    const { items } = useFind({
      model: context.root.$FeathersVuex.api.Game,
      params,
    });

    return {
      games: items,
      gameKind,
      canCreateGame: computed(() => context.root.$store.getters.authenticated),
    };
  },
};
</script>
