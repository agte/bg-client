import React from 'react';
import { withRouter } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import client from '../feathers';

import MatchItem from '../components/MatchItem.js';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.gamesService = client.service('games');
    this.matchesService = client.service('matches');
    this.state = {
      games: {},
      matches: {
        total: 0,
        data: [],
      },
    };
    this.onMatchCreated = this.onMatchCreated.bind(this);
    this.onMatchPatched = this.onMatchPatched.bind(this);
    this.onMatchRemoved = this.onMatchRemoved.bind(this);
  }

  componentDidMount() {
    this.matchesService.on('created', this.onMatchCreated);
    this.matchesService.on('patched', this.onMatchPatched);
    this.matchesService.on('removed', this.onMatchRemoved);

    this.matchesService
      .find({ query: { $limit: 20, $sort: { createdAt: -1 } } })
      .then((matches) => {
        this.setState({ matches });
      })
      .catch(console.log);

    this.gamesService.find({ query: { $limit: 50 } })
      .then(({ data }) => {
        this.setState({
          games: data.reduce((map, game) => {
            map[game.id] = game;
            return map;
          }, {}),
        });
      })
      .catch(console.log);
  }

  componentWillUnmount() {
    this.matchesService.off('created', this.onMatchCreated);
    this.matchesService.off('patched', this.onMatchPatched);
    this.matchesService.off('removed', this.onMatchRemoved);
  }

  onMatchCreated(match) {
    this.setState({
      matches: {
        total: this.state.matches.total + 1,
        data: [match, ...this.state.matches.data],
      }
    });
  }

  onMatchPatched(match) {
    const index = this.state.matches.data.findIndex((item) => item.id === match.id);
    if (index !== -1) {
      const updatedData = [...this.state.matches.data];
      updatedData[index] = match;
      this.setState({
        matches: {
          total: this.state.matches.total,
          data: updatedData
        }
      });
    }
  }

  onMatchRemoved({ id }) {
    const index = this.state.matches.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...this.state.matches.data];
      updatedData.splice(index, 1);
      this.setState({
        matches: {
          total: this.state.matches.total - 1,
          data: updatedData
        }
      });
    }
  }

  render() {
    const matches = this.state.matches.data.map((match) => {
      return <MatchItem key={match.id} gameMatch={match} game={this.state.games[match.game]} />;
    });
    return (
      <Container component="main" maxWidth="xl">
        <Typography variant="h1" align="center" gutterBottom>
          Партии
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Игра</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Дата создания</TableCell>
                <TableCell>Всего игроков</TableCell>
                <TableCell>Подключено игроков</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{matches}</TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
}

export default withRouter(Matches);
