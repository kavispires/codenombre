import React, { useEffect, useState } from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import API from '../api';
import useGlobalState from '../useGlobalState';
import localStorageService from '../localStorage';

const HomeJoin = ({ tempGameID, setTempGameID, tempNickname }) => {
  // Global States
  const [gameID, setGameID] = useGlobalState('gameID');
  const [isLoading, setIsLoading] = useGlobalState('isLoading');
  const [nickname, setNickname] = useGlobalState('nickname');
  const [, setScreen] = useGlobalState('screen');
  // Local States
  const [isValidGameID, setIsValidGameID] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [errorGameID, setErrorGameID] = useState('');

  useEffect(() => {
    // Check if game exists
    if (gameID !== tempGameID && tempGameID?.length === 4) {
      setIsLoading(true);

      API.ref(`codenombre/${tempGameID.toUpperCase()}`).once('value', (snap) => {
        if (snap.val()) {
          setGameID(tempGameID.toUpperCase());
          setIsValidGameID(true);
          setErrorGameID('');
        } else {
          setErrorGameID('Provided Game ID does not exist. Try again.');
          setIsValidGameID(false);
        }
        setIsLoading(false);
      });
    }

    if (tempGameID?.length < 4) {
      setIsValidGameID(false);
    }

    // Check if nickname is valid
    if (nickname?.length >= 3 || tempNickname?.length >= 3) {
      setIsValidNickname(true);
    } else {
      setIsValidNickname(false);
    }
  }, [
    gameID,
    tempGameID,
    setGameID,
    setIsValidGameID,
    setIsLoading,
    nickname,
    setIsValidNickname,
    tempNickname,
  ]);

  const goToWaitingRoom = () => {
    localStorageService.setDefaults(gameID, nickname);
    setScreen('game.waiting');
  };

  const goToCreateGame = () => {
    setScreen('home.create');
  };

  return (
    <div className="home-section join-game">
      <TextField
        className="mui-full-width"
        required
        id="game-id"
        label="Game ID"
        defaultValue={tempGameID}
        onChange={(e) => setTempGameID(e.target.value)}
        helperText={errorGameID}
      />
      <TextField
        className="mui-full-width"
        required
        id="nickname"
        label="Nickname"
        defaultValue={tempNickname}
        onChange={(e) => setNickname(e.target.value)}
        helperText={
          nickname && !isValidNickname ? 'Nickname must be at least 3 characters long.' : ''
        }
      />

      <div>{isLoading && <LinearProgress />}</div>

      <Button
        className="mui-block"
        variant="contained"
        color="primary"
        disabled={!isValidNickname || !isValidGameID}
        onClick={() => goToWaitingRoom()}
        style={{ background: green[500] }}
      >
        Join {gameID}
      </Button>
      <div className="home-section home-secion--separator">- or -</div>
      <div className="home-section create-game">
        <Button
          className="block"
          variant="contained"
          color="default"
          onClick={() => goToCreateGame()}
        >
          Create a Game
        </Button>
      </div>
    </div>
  );
};

export default HomeJoin;
