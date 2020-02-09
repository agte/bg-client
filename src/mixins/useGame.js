import { computed } from '@vue/composition-api';

const statuses = {
  draft: 'Черновик',
  gathering: 'Поиск игроков',
  pending: 'Подготовка к запуску',
  launched: 'Запущена',
  finished: 'Завершена',
  aborted: 'Прервана',
};

export default function useGame({ game, store, router }) {
  const isOwner = computed(() => game.owner === store.getters.userId);
  const isIn = computed(() => {
    const { userId } = store.getters;
    return game.players.some((player) => player.user === userId);
  });

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
    if (game.status !== 'gathering') {
      return false;
    }
    if (game.players.length < game.minPlayers) {
      return false;
    }
    return true;
  });

  const canLeave = computed(() => {
    if (game.status !== 'gathering' && !(game.status === 'draft' && isOwner)) {
      return false;
    }
    if (!isIn) {
      return false;
    }
    return true;
  });

  const canPlay = computed(() => game.status === 'launched' && isIn);

  const createdAt = computed(() => (new Date(game.createdAt)).toLocaleTimeString());

  const join = async () => store.dispatch('game/join', game.id);

  const launch = async () => store.dispatch('game/launch', game.id);

  const leave = async () => {
    await store.dispatch('game/leave', game.id);
    if (game.players.length === 0) {
      await store.dispatch('game/stopGathering', game.id);
      await store.dispatch('game/remove', game.id);
    }
  };

  const play = () => {
    router.push({ name: game.kind.id, params: { id: game.id } });
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
