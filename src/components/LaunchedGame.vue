<template>
  <tr>
    <td>{{ game.kindInstance.name }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ players }}</td>
    <td>
      <v-btn
        v-if="canPlay"
        @click="play()"
        color="primary"
        icon
        title="Открыть"
      >
        <v-icon>mdi-login</v-icon>
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
