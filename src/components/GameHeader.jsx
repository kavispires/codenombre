import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Cached from '@material-ui/icons/Cached';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { getMilitaryTranslation } from '../utils';

import OnlineBadge from './OnlineBadge';

const GameHeader = ({ gameID }) => {
  const [online] = useGlobalState('online');

  const opponentShortNickname = gameEngine.opponentsName.substring(0, 2);

  return (
    <AppBar className="header header--flex" position="static">
      <div className="header__left-area">
        <IconButton aria-label="reload" onClick={() => gameEngine.save()}>
          <Cached />
        </IconButton>
      </div>
      <div className="header__game-center">
        <div className="header__game-id">game id</div>
        <h1>{gameID}</h1>
        <div className="header__military-translation">{getMilitaryTranslation(gameID)}</div>
      </div>
      <div className="header__right-area">
        <OnlineBadge name={opponentShortNickname} isOnline={online[gameEngine.opponentIndex]} />
        <OnlineBadge name="Me" isOnline={online[gameEngine.myDatabaseIndex]} />
      </div>
    </AppBar>
  );
};

export default GameHeader;
