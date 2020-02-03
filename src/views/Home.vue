<template>
  <v-container class="mx-auto" style="width: 600px">
    <h1 class="display-1 my-5 text-center">Настольные игры онлайн</h1>
    <game-kinds></game-kinds>
  </v-container>
</template>

<script>
import GameKinds from '../components/GameKinds.vue';

export default {
  components: { GameKinds },
};
</script>
