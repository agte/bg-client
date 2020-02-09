<template>
  <tr>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn v-if="canJoin" @click="join()" title="Присоединиться" color="primary" icon>
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-btn v-if="canLeave" @click="leave()" title="Покинуть" color="primary" icon>
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-btn v-if="canLaunch" @click="launch()" title="Запустить" color="primary" icon>
        <v-icon>mdi-play</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import useGame from '../mixins/useGame';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    return useGame({
      game: props.game,
      store: context.root.$store,
      router: context.root.$router,
    });
  },
};
</script>
