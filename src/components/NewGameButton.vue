<template>
  <div>
    <v-btn
      @click="create()"
      class="ml-auto"
      color="accent"
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-alert
      v-if="error"
      type="error"
    >{{ error.message }}</v-alert>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  props: {
    kind: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { $store } = context.root;
    const error = ref(null);

    const create = async () => {
      try {
        const game = await $store.dispatch('game/create', { kind: props.kind });
        await $store.dispatch('game/join', { game });
        await $store.dispatch('game/startGathering', { game });
      } catch (e) {
        error.value = { message: e.message };
      }
    };

    const dismissError = () => {
      error.value = null;
    };

    return {
      create,
      error,
      dismissError,
    };
  },
};
</script>
