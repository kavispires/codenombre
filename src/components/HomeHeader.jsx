import React from 'react';
import { AppBar } from '@material-ui/core';

const HomeHeader = ({ gameID }) => {
  return (
    <AppBar className="header" position="static">
      <div className="header__game-id">Welcome to</div>
      <h1>CODENOMBRE</h1>
    </AppBar>
  );
};

export default HomeHeader;
