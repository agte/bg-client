<template>
  <v-simple-table>
    <thead>
      <tr>
        <th>Игра</th>
        <th>Статус</th>
        <th>Дата создания</th>
        <th>Игроки</th>
        <th>Операции</th>
      </tr>
    </thead>
    <tbody>
      <user-game-row
        v-for="game in items"
        :key="game.id"
        :game="game"
      ></user-game-row>
    </tbody>
  </v-simple-table>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import UserGameRow from './UserGameRow.vue';

export default {
  components: {
    UserGameRow,
  },

  props: {
    owner: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { Game } = context.root.$FeathersVuex.api;

    const params = ref({
      qid: 'myGames',
      query: {
        owner: props.owner,
        $sort: { createdAt: -1 },
        $skip: 0,
        $limit: 50,
      },
    });

    const { items } = useFind({
      model: Game,
      params,
    });

    return {
      items,
      params,
    };
  },
};
</script>
