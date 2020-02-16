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

  const join = () => store.dispatch('game/join', game.id);
  const leave = () => store.dispatch('game/leave', game.id);
  const play = () => router.push({ name: game.kind, params: { id: game.id } });
  const players = computed(() => game.players.map((player) => player.name).join(', '));
  const run = () => store.dispatch('game/run', game.id);
  const status = computed(() => statuses[game.status]);

  return {
    createdAt,
    join,
    leave,
    play,
    players,
    run,
    status,
  };
}
