import { computed } from '@vue/composition-api';

const statuses = {
  draft: 'Черновик',
  gathering: 'Поиск игроков',
  pending: 'Подготовка к запуску',
  running: 'Запущена',
  finished: 'Завершена',
  aborted: 'Прервана',
};

export default function useGame({ game, store, router }) {
  const { userId } = store.getters;

  const isOwner = computed(() => game.owner === userId);
  const isIn = computed(() => game.players.some((player) => player.user === userId));
  const play = () => router.push({ name: game.kind, params: { id: game.id } });

  const canJoin = computed(() => {
    if (game.status !== 'gathering' && !(game.status === 'draft' && isOwner)) {
      return false;
    }
    if (game.players.length === game.maxPlayers) {
      return false;
    }
    return true;
  });

  const canLaunch = computed(() => {
    if (!isOwner.value) {
      return false;
    }
    if (game.status !== 'gathering') {
      return false;
    }
    if (game.players.length < game.minPlayers) {
      return false;
    }
    return true;
  });

  const canLeave = computed(() => {
    if (game.status !== 'gathering' && !(game.status === 'draft' && isOwner.value)) {
      return false;
    }
    if (!isIn.value) {
      return false;
    }
    return true;
  });

  const canPlay = computed(() => game.status === 'running' && isIn);

  const createdAt = computed(() => {
    const then = new Date(game.createdAt);
    const now = new Date();

    const timeString = then.toLocaleTimeString();

    let dateString = '';
    if (then.toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
      dateString = 'Сегодня';
    } else {
      dateString = then.toLocaleDateString();
    }

    return `${dateString} ${timeString}`;
  });

  const join = async () => store.dispatch('game/join', game.id);

  const launch = async () => {
    await store.dispatch('game/launch', game.id);
  };

  const leave = async () => {
    await store.dispatch('game/leave', game.id);
    if (game.players.length === 0) {
      await store.dispatch('game/stopGathering', game.id);
      await store.dispatch('game/remove', game.id);
    }
  };

  const players = computed(() => game.players.map((player) => player.name).join(', '));

  const status = computed(() => statuses[game.status]);

  return {
    canJoin,
    canLaunch,
    canLeave,
    canPlay,
    createdAt,
    isIn,
    isOwner,
    join,
    launch,
    leave,
    play,
    players,
    status,
  };
}
