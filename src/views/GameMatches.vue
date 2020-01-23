<template>
  <v-container class="home text-center" fluid>
    <h1 class="display-1 my-5">Настольные игры онлайн</h1>
    <games></games>
  </v-container>
</template>

<script>
import Games from '../components/Games.vue';

export default {
  components: { Games },
};
</script>
