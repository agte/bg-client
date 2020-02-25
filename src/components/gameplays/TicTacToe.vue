<template>
  <v-container style="width: 360px">
    <v-alert v-if="view.finished" type="success">
      Игра завершена
    </v-alert>
    <v-row justify="center" dense>
      <v-col v-for="(cell, index) in view.cells" :key="index" cols="auto">
        <v-card v-if="canMove && !cell" @click="putMark(index)"
          :elevation="5" height="100" width="100"
        >
          <mark-cross v-if="cell==='x'"></mark-cross>
          <mark-circle v-if="cell==='o'"></mark-circle>
        </v-card>
        <v-card v-else :elevation="5" height="100" width="100">
          <mark-cross v-if="cell==='x'"></mark-cross>
          <mark-circle v-if="cell==='o'"></mark-circle>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-2">
      <v-col cols="auto" align-self="center" class="text-center">
        <mark-cross style="width: 30px; height: 30px; vertical-align: middle"></mark-cross>
        {{ players.x.name }}
        <br>
        <div v-if="view.finished" style="height: 40px">
          <v-icon v-if="view.winner === 'x'" large color="orange">mdi-crown</v-icon>
        </div>
      </v-col>
      <v-col cols="auto" align-self="center" class="text-center">
        <mark-circle style="width: 30px; height: 30px; vertical-align: middle"></mark-circle>
        {{ players.o.name }}
        <br>
        <div v-if="view.finished" style="height: 40px">
          <v-icon v-if="view.winner === 'o'" large color="orange">mdi-crown</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>
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

  setup(props, context) {
    const { game, gameplay: views } = props;
    const { $store } = context.root;

    // крестики-нолики выглядят одинаково для каждой стороны -
    // там нет скрытых элементов, как в карточных играх,
    // так что берём первый попавшийся вид.
    const view = computed(() => Object.values(views)[0]);

    const players = computed(() => {
      const playersMap = { x: { id: 'x' }, o: { id: 'o' } };
      game.players.forEach((player) => {
        playersMap[player.internalId].name = player.name;
        playersMap[player.internalId].user = player.user;
      });
      return playersMap;
    });

    const { userId } = $store.getters;

    const myCurrentPlayerId = computed(() => {
      const myPlayersIds = game.players
        .filter((player) => player.user === userId)
        .map((player) => player.internalId);
      return myPlayersIds.includes(view.value.currentPlayer) ? view.value.currentPlayer : null;
    });

    const canMove = computed(() => myCurrentPlayerId.value && !view.value.finished);

    const putMark = (index) => {
      $store.dispatch('gameplay/move', {
        id: game.id,
        player: myCurrentPlayerId.value,
        action: 'mark',
        params: { id: String(index) },
      });
    };

    return {
      canMove,
      myCurrentPlayerId,
      players,
      putMark,
      view,
    };
  },
};
</script>
