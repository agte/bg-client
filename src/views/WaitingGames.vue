<template>
  <v-container class="mx-auto" style="width: 600px" v-if="gameKind">
    <h1 class="display-1 my-5 text-center">{{ gameKind.name }}</h1>
    <v-simple-table>
      <thead>
        <tr>
          <th>Дата создания</th>
          <th>Игроки</th>
          <th>Операции</th>
        </tr>
      </thead>
      <tbody>
        <waiting-game v-for="game in games" :key="game.id" :game="game"></waiting-game>
      </tbody>
    </v-simple-table>
    <new-game-button :kind="gameKind.id"></new-game-button>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref, isRef } from '@vue/composition-api';
import NewGameButton from '../components/NewGameButton.vue';
import WaitingGame from '../components/WaitingGame.vue';

export default {
  components: {
    NewGameButton,
    WaitingGame,
  },

  setup(props, context) {
    const { $store } = context.root;
    const gameKindId = context.root.$route.params.gameKind;
    const gameKind = ref(null);
    const searchQuery = ref({
      qid: 'waitingGames',
      query: {
        kind: gameKindId,
        status: 'gathering',
        $limit: 50,
        $skip: 0,
        $sort: { createdAt: -1 },
      },
    });

    $store.dispatch('gameKind/getFast', gameKindId)
      .then((resource) => {
        gameKind.value = isRef(resource) ? resource.value : resource;
      });

    const { items } = useFind({
      model: context.root.$FeathersVuex.api.Game,
      params: searchQuery,
    });

    return {
      games: items,
      gameKind,
    };
  },
};
</script>
