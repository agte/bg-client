<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Настольные игры онлайн</h1>
    <v-card
      v-for="gameKind in items"
      :key="gameKind.id"
      class="mx-auto"
      width="480"
    >
      <v-card-title>{{ gameKind.name }}</v-card-title>
      <v-card-actions>
        <v-btn
          :to="{ name: 'WaitingGames', params: { gameKind: gameKind.id } }"
          class="ml-auto"
          color="primary"
        >
          Перейти
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useFind } from 'feathers-vuex';

export default {
  setup(props, context) {
    const { items } = useFind({
      model: context.root.$FeathersVuex.api.GameKind,
      params: {
        query: {
          $sort: { createdAt: -1 },
          $skip: 0,
          $limit: 50,
        },
      },
    });
    return { items };
  },
};
</script>
