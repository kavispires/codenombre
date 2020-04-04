import React from 'react';
import { AppBar, Avatar, Badge, IconButton } from '@material-ui/core';
import Cached from '@material-ui/icons/Cached';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { getMilitaryTranslation } from '../utils';

const GameHeader = ({ gameID }) => {
  const [online] = useGlobalState('online');

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
        <Badge
          color="secondary"
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
          className={`badge ${
            online[gameEngine.myDatabaseIndex] ? 'badge--online' : 'badge--offline'
          }`}
        >
          <Avatar>Me</Avatar>
        </Badge>
        <Badge
          color="secondary"
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
          className={`badge ${
            online[gameEngine.opponentIndex] ? 'badge--online' : 'badge--offline'
          }`}
        >
          <Avatar>Op</Avatar>
        </Badge>
      </div>
    </AppBar>
  );
};

export default GameHeader;
