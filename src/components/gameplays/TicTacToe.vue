<template>
  <div>
    <v-container style="width: 360px">
      <v-row justify="center" dense>
        <v-col v-for="cell in view.cells" :key="cell.id" cols="auto">
          <v-card @click="putMark(cell)" :elevation="5" height="100" width="100">
            <mark-cross v-if="cell.mark==='x'"></mark-cross>
            <mark-circle v-if="cell.mark==='o'"></mark-circle>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-2">
        <v-col cols="auto" align-self="center">
          <mark-cross style="width: 30px; height: 30px; vertical-align: middle"></mark-cross>
          {{ players.x.name }}
        </v-col>
        <v-col cols="auto">
          <mark-circle style="width: 30px; height: 30px; vertical-align: middle"></mark-circle>
          {{ players.o.name }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
import MarkCross from '../../assets/tic-tac-toe/cross.svg';
import MarkCircle from '../../assets/tic-tac-toe/circle.svg';

export default {
  components: {
    MarkCross,
    MarkCircle,
  },

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

    const players = computed(() => {
      const playersMap = {};
      view.value.players.forEach((player) => {
        playersMap[player.id] = player;
      });
      props.game.players.forEach((player) => {
        playersMap[player.internalId].name = player.name;
        playersMap[player.internalId].user = player.user;
      });

      return playersMap;
    });

    // test click
    const putMark = (cell) => {
      if (cell.mark === 'x') {
        cell.mark = 'o'; // eslint-disable-line no-param-reassign
      } else {
        cell.mark = 'x'; // eslint-disable-line no-param-reassign
      }
    };

    return {
      view,
      players,
      putMark,
    };
  },
};
</script>
