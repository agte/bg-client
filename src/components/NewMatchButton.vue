<template>
  <div>
    <v-alert
      v-if="error"
      type="error"
    >{{ error.message }}</v-alert>
    <v-btn
      @click="create()"
      class="ml-auto"
      color="accent"
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
  props: {
    game: {
      type: String,
      required: true,
    },
  },

  setup(props, context) {
    const { Match } = context.root.$FeathersVuex.api;
    const error = ref(null);

    const create = async () => {
      try {
        const match = new Match({ game: props.game });
        await match.save();
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
