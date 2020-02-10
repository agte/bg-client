<template>
  <div>
    <v-container style="width: 360px">
      <v-row justify="center" dense>
        <v-col v-for="cell in view.cells" :key="cell.id" cols="auto">
          <v-card :elevation="5" height="100" width="100">
            {{ cell.mark }}
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" dense>
        <v-col cols="auto">
          <v-icon color="blue" large>mdi-close</v-icon> {{ players.x.name }}
        </v-col>
        <v-col cols="auto">
          <v-icon color="green" large>mdi-circle-outline</v-icon> {{ players.o.name }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
    gameplay: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    // крестики-нолики выглядят одинаково для каждой стороны -
    // там нет скрытых элементов, как в карточных играх
    const view = computed(() => Object.values(props.gameplay)[0]);
    const currentPlayer = computed(
      () => view.players.find((player) => !!player.actions.length),
    );
    const players = computed(() => ({
      x: {
        name: props.game.players.find((player) => player.internalId === 'x').name,
      },
      o: {
        name: props.game.players.find((player) => player.internalId === 'o').name,
      },
    }));

    return {
      view,
      currentPlayer,
      players,
    };
  },
};
</script>
