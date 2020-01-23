<template>
  <div>
    <v-card
      v-for="game in games"
      :key="game.id"
      class="mx-auto"
      width="480"
    >
      <v-card-title>{{ game.name }}</v-card-title>
      <v-card-actions>
        <v-btn
          :to="{ name: 'Matches', params: { game: game.id } }"
          class="ml-auto"
          color="primary"
        >
          Перейти
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useFind } from 'feathers-vuex';

export default {
  setup(props, context) {
    const { Game } = context.root.$FeathersVuex.api;
    const { items: games } = useFind({
      model: Game,
      params: {
        query: {
          $sort: { createdAt: -1 },
          $skip: 0,
          $limit: 50,
        },
      },
    });
    return { games };
  },
};
</script>
