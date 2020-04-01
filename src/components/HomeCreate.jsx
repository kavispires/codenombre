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
import toastService from '../toastService';

const HomeCreate = ({ setTempGameID }) => {
  // Global States
  const [isLoading, setIsLoading] = useGlobalState('isLoading');
  const [, setScreen] = useGlobalState('screen');
  const [toast, setToast] = useGlobalState('toast');
  // Local States
  const [gameMode, setGameMode] = useState('classic');
  const [gameDifficulty, setGameDifficulty] = useState('normal');

  const createGame = () => {
    setIsLoading(true);
    const id = generadeID();
    const state = GameEngine.init(id, gameMode, gameDifficulty);

    try {
      API.ref('/codenombre').update({
        [id]: {
          ...state,
        },
      });
      setTempGameID(id);
      setToast(toastService.success(toast, `Game created successfully. ID: ${id}`));
      setIsLoading(false);
      setScreen('home');
    } catch {
      setToast(toastService.error(toast, 'Creating game has failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-section create-game">
      <FormControl component="fieldset">
        <FormLabel component="legend" className="create-game-label">
          Game Type
        </FormLabel>
        <RadioGroup name="game-type" value={gameMode} onChange={(e) => setGameMode(e.target.value)}>
          <FormControlLabel value="classic" control={<Radio />} label="Classic" />
          <FormControlLabel value="simple" disabled control={<Radio />} label="Simple" />
          <FormControlLabel value="pictures" disabled control={<Radio />} label="Pictures" />
          <FormControlLabel value="dixit" disabled control={<Radio />} label="Dixit" />
          <FormControlLabel value="deception" disabled control={<Radio />} label="Deception" />
        </RadioGroup>
        <FormLabel component="legend" className="create-game-label">
          Difficulty
        </FormLabel>
        <RadioGroup
          name="game-difficulty"
          value={gameDifficulty}
          onChange={(e) => setGameDifficulty(e.target.value)}
        >
          <FormControlLabel value="easy" control={<Radio />} label="Easy" />
          <FormControlLabel value="normal" control={<Radio />} label="Normal" />
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
