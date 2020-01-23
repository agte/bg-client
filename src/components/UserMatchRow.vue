<template>
  <tr>
    <td>{{ match.name }}</td>
    <td>{{ status }}</td>
    <td>{{ createdAt }}</td>
    <td>{{ match.players.length }}</td>
    <td>
      <v-btn
        v-if="match.status === 'draft'"
        @click="publish()"
        color="primary"
        icon
        title="Опубликовать"
      >
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn
        v-if="match.status === 'draft'"
        @click="remove()"
        color="accent"
        icon
        title="Удалить"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
import { computed } from '@vue/composition-api';

const statuses = {
  draft: 'Черновик',
  gathering: 'Поиск игроков',
  pending: 'Подготовка к запуску',
  launched: 'Запущена',
  finished: 'Завершена',
  aborted: 'Прервана',
};

export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const { match } = props;
    const createdAt = computed(() => {
      const date = new Date(match.createdAt);
      return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
    });

    const status = computed(() => statuses[match.status]);

    const remove = async () => {
      try {
        await match.remove();
      } catch (e) {
        console.log(e);
      }
    };

    const publish = async () => {
      // try {
      //   await match.patch({ status: 'gathering' });
      // } catch (e) {
      //   console.log(e);
      // }
    };

    return {
      createdAt,
      status,
      remove,
      publish,
    };
  },
};
</script>
