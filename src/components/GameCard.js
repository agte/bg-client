import React from 'react';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import client from '../feathers';

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.matchesService = client.service('matches');
    this.state = { ...props.game };
    this.onStartPlay = this.onStartPlay.bind(this);
  }

  async onStartPlay(e) {
    const match = await this.matchesService.create({ game: this.state.id });
    this.props.history.push(`/games/${this.state.id}/matches/${match.id}`);
  }

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant='h2' align="center">
            {this.state.name}
          </Typography>
          <Typography variant='body1' align="center">
            Минимум игроков: {this.state.minPlayers}<br />
            Максимум игроков: {this.state.maxPlayers}
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="primary" variant="outlined" fullWidth endIcon={<PlayCircleFilledIcon />} onClick={this.onStartPlay}>
            Играть
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withRouter(GameCard);
