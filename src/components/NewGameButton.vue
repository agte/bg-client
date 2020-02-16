<template>
  <div>
    <v-btn @click="create()" title="Начать новую партию" color="accent" fixed right bottom fab>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-alert v-if="error" type="error">{{ error.message }}</v-alert>
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
      $store.dispatch('game/createFast', { kind: props.kind })
        .catch((e) => {
          error.value = { message: e.message };
        });
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
