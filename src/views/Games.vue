<template>
  <div class="games">
  </div>
</template>

<script>
import { useFind } from 'feathers-vuex';
import { ref } from '@vue/composition-api';

export default {
  name: 'Games',
  data: () => ({
    games: ref([]),
  }),
  mounted() {
    const someData = useFind({
      model: this.$FeathersVuex.api.Game,
      params: { query: { $sort: { createdAt: -1 } } },
    });
    const { items: games } = someData;
    this.games.value = games.value;
    console.log(this.games);
    setTimeout(() => { console.log(this.games); }, 1000);
  },
};
</script>
