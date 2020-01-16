import React from 'react';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import client from '../feathers';

const STATUSES = {
  draft: 'Черновик',
  gathering: 'Принимает игроков',
  pending: 'Ожидает запуска',
  launched: 'Запущена',
  finished: 'Завершена',
  aborted: 'Прервана',
};

class MatchItem extends React.Component {
  constructor(props) {
    super(props);
    this.matchService = client.service('matches');
    this.statusService = client.service(`matches/${this.props.gameMatch.id}/status`);
    this.playersService = client.service(`matches/${this.props.gameMatch.id}/players`);
    this.startGathering = this.startGathering.bind(this);
    this.cancelGathering = this.cancelGathering.bind(this);
    this.remove = this.remove.bind(this);
    this.join = this.join.bind(this);
    this.leave = this.leave.bind(this);
  }

  startGathering() {
    this.statusService.update(null, { value: 'gathering' });
  }

  cancelGathering() {
    this.statusService.update(null, { value: 'draft' });
  }

  remove() {
    this.matchService.remove(this.props.gameMatch.id);
  }

  join() {
    this.playersService.create({});
  }

  leave() {
    this.playersService.remove(client.user.id);
  }

  render() {
    const match = this.props.gameMatch;
    const game = this.props.game || {};
    const date = new Date(match.createdAt);
    const actions = [];

    if (match.owner === client.user.id) { // Владелец партии
      if (match.status === 'draft') {
        actions.push(<Button key="switch_to_gathering" onClick={this.startGathering}>Начать сбор</Button>);
        actions.push(<Button key="edit">Редактировать</Button>);
      }
      if (match.status === 'gathering') {
        actions.push(<Button key="switch_to_draft" onClick={this.cancelGathering}>Отменить сбор</Button>);
      }
      if (match.status === 'draft' || match.status === 'gathering') {
        actions.push(<Button key="remove" onClick={this.remove}>Удалить</Button>);
      }
    } else { // Прочие пользователи
      if (match.players.includes(client.user.id)) {
        actions.push(<Button key="leave" onClick={this.leave}>Выйти</Button>);
      } else if (match.status === 'gathering') {
        actions.push(<Button key="join" onClick={this.join}>Присоединиться</Button>);
      }
    }

    return (
      <TableRow>
        <TableCell>{game.name}</TableCell>
        <TableCell>{STATUSES[match.status]}</TableCell>
        <TableCell>{date.toLocaleTimeString()} {date.toLocaleDateString()}</TableCell>
        <TableCell>{match.minPlayers}</TableCell>
        <TableCell>{match.players.length}</TableCell>
        <TableCell>{actions}</TableCell>
      </TableRow>
    );
  }
}

export default withRouter(MatchItem);
