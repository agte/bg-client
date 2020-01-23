<template>
  <div>
    <v-card
      v-for="match in matches"
      :key="match.id"
      class="mx-auto"
      max-width="480"
    >
      <v-card-title>{{ match.id }}</v-card-title>
      <v-card-actions>
      </v-card-actions>
    </v-card>
    <v-btn
      color="accent"
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { useFind } from 'feathers-vuex';

export default {
  props: {
    game: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const { Match } = context.root.$FeathersVuex.api;

    const { items: matches } = useFind({
      model: Match,
      params: {
        query: {
          game: props.game,
          $sort: { createdAt: -1 },
          $skip: 0,
          $limit: 50,
        },
      },
    });

    const error = ref(null);

    const create = async () => {
      try {
        const match = new Match();
        await match.save();
      } catch (e) {
        error.value = { message: e.message };
      }
    };
    return { matches, create };
  },
};
</script>
