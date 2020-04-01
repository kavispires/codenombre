import React, { Fragment } from 'react';
import { Container, LinearProgress } from '@material-ui/core';

import useGlobalState from '../useGlobalState';

import Game from './Game';
import Home from './Home';
import Toast from './Toast';

const App = (props) => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');
  const [screen] = useGlobalState('screen');

  return (
    <Fragment>
      <Container maxWidth="lg">
        {isLoading ? <LinearProgress /> : <div className="progress-bar-placeholder" />}
        {screen.startsWith('home') && <Home />}
        {screen.startsWith('game') && <Game />}
      </Container>
      <Toast />
    </Fragment>
  );
};

export default App;
