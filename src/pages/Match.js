import React from 'react';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import client from '../feathers';

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.matchesService = client.service('matches');
    this.state = {
      match: {
        id: '',
        game: '',
        players: [],
      },
      game: {
        id: '',
        name: '',
      },
      players: [],
    };
    this.onMatchPatched = this.onMatchPatched.bind(this);
    this.onMatchRemoved = this.onMatchRemoved.bind(this);
  }

  async componentDidMount() {
    this.matchesService.on('patched', this.onMatchPatched);
    this.matchesService.on('removed', this.onMatchRemoved);

    try {
      const match = await this.matchesService.get(this.props.match.params.matchId);
      this.setState({ match });
      const [game, players] = await Promise.all([
        client.service('games').get(match.game),
        client.service(`matches/${this.state.match.id}/players`).find(),
      ]);
      this.setState({ game });
      this.setState({ players });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.matchesService.off('patched', this.onMatchPatched);
    this.matchesService.off('removed', this.onMatchRemoved);
  }

  onMatchPatched(event) {
    // TODO update state
    console.log(event);
  }

  onMatchRemoved(event) {
    // TODO update state
    console.log(event);
  }

  render() {
    const players = this.state.players.map((player) => {
      return (<li key={player.id}>{player.name}</li>);
    });
    return (
      <Container component="main" maxWidth="xl">
        <Typography variant="h1" gutterBottom>
          Партия в "{this.state.game.name}"
        </Typography>
        <Typography variant="h2" gutterBottom>
          Участники
        </Typography>
        <ol>
          {players}
        </ol>
      </Container>
    );
  }
}

export default withRouter(Match);
