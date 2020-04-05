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
          <button onClick={() => gameEngine.mock('setup')}>Mock Setup</button>
          <button onClick={() => gameEngine.mock('turn1.clue-giving')}>Mock 1 clue</button>
          <button onClick={() => gameEngine.mock('turn1.guessing')}>Mock 1 guessing</button>
          <button onClick={() => gameEngine.mock('turn2.clue-giving')}>Mock 2 clue</button>
          <button onClick={() => gameEngine.mock('turn2.guessing')}>Mock 2 guessing</button>
        </div>
      )}
    </Fragment>
  );
};

export default App;
