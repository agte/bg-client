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
    const { $router, $store } = context.root;
    const error = ref(null);

    const create = async () => {
      try {
        // Используем это вместо (new Game()).save(),
        // потому что при первом подходе модели не добавляются геттеры/сеттеры на свойства,
        // которые не были переданы в конструктор и не были заданы в настройке instanceDefaults.
        // Но задавать эти свойства заранее нельзя -
        // они отправятся на сервер, а он их не примет и будет ругаться.
        // Эти свойства проставляются только сервером!
        await $store.dispatch('game/create', { kind: props.kind });
        $router.push({ name: 'MyGames' });
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
