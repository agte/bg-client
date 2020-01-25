<template>
  <tr>
    <td>{{ match.name }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ match.players.length }}</td>
    <td>
      <v-btn
        v-if="!isIn"
        @click="join()"
        color="primary"
        icon
        title="Присоединиться"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="isIn"
        @click="leave()"
        color="primary"
        icon
        title="Покинуть"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';
import client from '../feathers';

export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const { match } = props;
    const { $store } = context.root;

    const createdAt = computed(() => (new Date(match.createdAt)).toLocaleTimeString());

    const isIn = computed(() => {
      const userId = $store.state.auth.user.id;
      return match.players.some((player) => player.id === userId);
    });

    const join = async () => {
      try {
        await client
          .service(`match/${match.id}/players`)
          .create({});
      } catch (e) {
        console.log(e);
      }
    };

    const leave = async () => {
      const userId = $store.state.auth.user.id;
      try {
        await client
          .service(`match/${match.id}/players`)
          .remove(userId);
      } catch (e) {
        console.log(e);
      }
    };

    return {
      createdAt,
      isIn,
      join,
      leave,
    };
  },
};
</script>
