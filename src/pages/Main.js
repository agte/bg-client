import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import client from '../feathers';

import GameCard from '../components/GameCard.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.gamesService = client.service('games');
    this.state = { games: [] };
    this.onGameCreated = this.onGameCreated.bind(this);
    this.onGamePatched = this.onGamePatched.bind(this);
    this.onGameRemoved = this.onGameRemoved.bind(this);
  }

  componentDidMount() {
    this.gamesService.on('created', this.onGameCreated);
    this.gamesService.on('patched', this.onGamePatched);
    this.gamesService.on('removed', this.onGameRemoved);

    this.gamesService
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
        <Typography component="h1" variant="h4" align="center" gutterBottom style={{marginTop: "1em"}}>
          Доступные игры
        </Typography>
        {gameCards}
      </Container>
    );
  }
}

export default Main;
