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
      <gathering-game-row
        v-for="game in items"
        :key="game.id"
        :game="game"
      ></gathering-game-row>
    </tbody>
  </v-simple-table>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import GatheringGameRow from './GatheringGameRow.vue';

export default {
  components: {
    GatheringGameRow,
  },

  props: {
    kind: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { Game } = context.root.$FeathersVuex.api;

    const params = ref({
      qid: 'gatheringGames',
      query: {
        game: props.game,
        status: 'gathering',
        $sort: { createdAt: -1 },
        $skip: 0,
        $limit: 50,
      },
    });

    const { items } = useFind({
      model: Game,
      params,
    });

    return { items, params };
  },
};
</script>
