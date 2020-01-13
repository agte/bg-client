import React from 'react';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import client from '../feathers';

// import MatchCard from '../components/MatchCard.js';

class PublicMatches extends React.Component {
  constructor(props) {
    super(props);
    this.gamesService = client.service('games');
    this.matchesService = client.service('matches');
    this.state = { games: {}, matches: [] };
  }

  componentDidMount() {
    this.matchesService
      .find({ limit: -1 })
      .then(({ data }) => {
        this.setState({ games: data });
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    this.gamesService.off('created', this.onGameCreated);
    this.gamesService.off('patched', this.onGamePatched);
    this.gamesService.off('removed', this.onGameRemoved);
  }

  onGameCreated(event) {
    // TODO update state
    console.log(event);
  }

  onGamePatched(event) {
    // TODO update state
    console.log(event);
  }

  onGameRemoved(event) {
    // TODO update state
    console.log(event);
  }

  render() {
    const gameCards = this.state.games.map((game) => <GameCard key={game.id} game={game} />);
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h1" align="center" gutterBottom>
          Доступные игры
        </Typography>
        {gameCards}
      </Container>
    );
  }
}

export default withRouter(PublicMatches);
