import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import Game from './Game';
import Home from './Home';
import PopUp from './PopUp';
import Toast from './Toast';

const App = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');
  const [screen] = useGlobalState('screen');

  return (
    <Fragment>
      <Container maxWidth="lg" className="full-screen">
        {isLoading ? <LinearProgress /> : <div className="progress-bar-placeholder" />}
        {screen.startsWith('home') && <Home />}
        {screen.startsWith('game') && <Game />}
      </Container>
      <Toast />
      <PopUp />
      {process.env.NODE_ENV === 'development' && (
        <div className="mock-buttons">
          <button onClick={() => gameEngine.mock(0)}>Mock Setup</button>
          <button onClick={() => gameEngine.mock(1)}>Mock Round 1</button>
          <button onClick={() => gameEngine.mock(2)}>Mock Round 2</button>
        </div>
      )}
    </Fragment>
  );
};

export default App;
