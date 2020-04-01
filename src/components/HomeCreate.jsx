import React, { useState } from 'react';
import {
  Button,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import API from '../api';
import GameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { generadeID } from '../utils';

const HomeCreate = ({ setTempGameID }) => {
  // Global States
  const [isLoading, setIsLoading] = useGlobalState('isLoading');
  const [, setScreen] = useGlobalState('screen');
  // Local States
  const [gameMode, setGameMode] = useState('classic');

  const createGame = () => {
    setIsLoading(true);
    const id = generadeID();
    const state = GameEngine.init(id, gameMode);

    API.ref('/codenombre').update({
      [id]: {
        ...state,
      },
    });

    setTempGameID(id);
    setIsLoading(false);
    setScreen('home');
  };

  return (
    <div className="home-section create-game">
      <FormControl component="fieldset">
        <FormLabel component="legend">Game Type</FormLabel>
        <RadioGroup name="game-type" value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          <FormControlLabel value="classic" control={<Radio />} label="Classic" />
          <FormControlLabel value="simple" disabled control={<Radio />} label="Simple" />
          <FormControlLabel value="pictures" disabled control={<Radio />} label="Pictures" />
          <FormControlLabel value="dixit" disabled control={<Radio />} label="Dixit" />
          <FormControlLabel value="deception" disabled control={<Radio />} label="Deception" />
        </RadioGroup>
      </FormControl>
      <Button
        className="block"
        variant="contained"
        color="primary"
        style={{ background: green[500] }}
        onClick={() => createGame()}
        disabled={isLoading}
      >
        Create {gameMode} game
      </Button>
    </div>
  );
};

export default HomeCreate;
