<template>
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
      <gathering-match-row
        v-for="match in items"
        :key="match.id"
        :match="match"
      ></gathering-match-row>
    </tbody>
  </v-simple-table>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import GatheringMatchRow from './GatheringMatchRow.vue';

export default {
  components: {
    GatheringMatchRow,
  },

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
