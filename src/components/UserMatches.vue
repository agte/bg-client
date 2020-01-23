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
      <user-match-row
        v-for="match in items"
        :key="match.id"
        :match="match"
      ></user-match-row>
    </tbody>
  </v-simple-table>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';
import UserMatchRow from './UserMatchRow.vue';

export default {
  components: {
    UserMatchRow,
  },

  props: {
    owner: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { Match } = context.root.$FeathersVuex.api;

    const params = ref({
      qid: 'myMatches',
      query: {
        owner: props.owner,
        $sort: { createdAt: -1 },
        $skip: 0,
        $limit: 50,
      },
    });

    const { items } = useFind({
      model: Match,
      params,
    });

    return {
      items,
      params,
    };
  },
};
</script>
