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

    <v-row justify="center" class="mt-2">
      <v-col cols="6" class="text-right">
        <v-btn v-if="!isFirstPage" @click="toPrevPage()" color="secondary" class="pl-2">
          Назад
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="6" class="text-left">
        <v-btn v-if="!isLastPage" @click="toNextPage()" color="secondary" class="pr-2">
          Далее
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref, computed } from '@vue/composition-api';
import UserGame from '../components/UserGame.vue';

export default {
  components: {
    UserGame,
  },

  setup(props, context) {
    const PAGE_SIZE = 10;

    const skip = ref(0);

    const searchQuery = computed(() => ({
      qid: 'myGames',
      query: {
        'players.user': context.root.$store.getters.userId,
        $limit: PAGE_SIZE,
        $skip: skip.value,
        $sort: { createdAt: -1 },
      },
    }));

    const { items: games, latestQuery } = useFind({
      model: context.root.$FeathersVuex.api.Game,
      params: searchQuery,
    });

    const isFirstPage = computed(() => skip.value === 0);
    const isLastPage = computed(() => {
      if (!latestQuery.value) {
        return false;
      }
      const { total, skip: offset, limit } = latestQuery.value.response;
      return total <= offset + limit;
    });

    const toNextPage = () => {
      if (isLastPage.value) {
        return;
      }
      skip.value += PAGE_SIZE;
    };

    const toPrevPage = () => {
      if (isFirstPage.value) {
        return;
      }
      if (skip.value > PAGE_SIZE) {
        skip.value -= PAGE_SIZE;
      } else {
        skip.value = 0;
      }
    };

    return {
      games,
      isFirstPage,
      isLastPage,
      toNextPage,
      toPrevPage,
    };
  },
};
</script>
