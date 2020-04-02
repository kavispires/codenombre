import React from 'react';
import { AppBar } from '@material-ui/core';

import { getMilitaryTranslation } from '../utils';

const GameHeader = ({ gameID }) => {
  return (
    <AppBar className="header" position="static">
      <div className="header__game-id">game id</div>
      <h1>{gameID}</h1>
      <div className="header__military-translation">{getMilitaryTranslation(gameID)}</div>
    </AppBar>
  );
};

export default GameHeader;
