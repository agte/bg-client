<template>
  <div>
    <v-card
      v-for="gameKind in items"
      :key="gameKind.id"
      class="mx-auto"
      width="480"
    >
      <v-card-title>{{ gameKind.name }}</v-card-title>
      <v-card-actions>
        <v-btn
          :to="{ name: 'Games', params: { gameKind: gameKind.id } }"
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
import { ref } from '@vue/composition-api';

export default {
  setup(props, context) {
    const { GameKind } = context.root.$FeathersVuex.api;
    const { items } = useFind({
      model: GameKind,
      params: ref({
        query: {
          $sort: { createdAt: -1 },
          $skip: 0,
          $limit: 50,
        },
      }),
    });
    return { items };
  },
};
</script>
