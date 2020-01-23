<template>
  <div>
    <v-card
      v-for="match in items"
      :key="match.id"
      class="mx-auto"
      max-width="480"
    >
      <v-card-title>{{ match.id }} {{ match.status }}</v-card-title>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';

export default {
  props: {
    game: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const { Match } = context.root.$FeathersVuex.api;

    const params = ref({
      qid: 'gatheringMatches',
      query: {
        game: props.game,
        status: 'gathering',
        $sort: { createdAt: -1 },
        $skip: 0,
        $limit: 50,
      },
    });

    const { items } = useFind({
      model: Match,
      params,
    });

    return { items, params };
  },
};
</script>
