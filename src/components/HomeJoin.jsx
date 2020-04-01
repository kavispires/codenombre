import React, { useEffect, useState } from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import API from '../api';
import useGlobalState from '../useGlobalState';

const NOOP = () => {};

const HomeJoin = ({ tempGameID, setTempGameID }) => {
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
    if (tempGameID?.length === 4) {
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
    } else {
      setIsValidGameID(false);
      setIsLoading(false);
    }

    // Check if nickname is valid
    if (nickname?.length >= 3) {
      setIsValidNickname(true);
    } else {
      setIsValidNickname(false);
    }
  }, [tempGameID, setGameID, setIsValidGameID, setIsLoading, nickname, setIsValidNickname]);

  const goToCreateGame = () => {
    setScreen('home.create');
  };

  return (
    <div className="home-section join-game">
      <TextField
        className="mui-full-width"
        required
        id="nickname"
        label="Nickname"
        onChange={(e) => setNickname(e.target.value)}
        helperText={
          nickname && !isValidNickname ? 'Nickname must be at least 3 characters long.' : ''
        }
      />
      <TextField
        className="mui-full-width"
        required
        id="game-id"
        label="Game ID"
        onChange={(e) => setTempGameID(e.target.value)}
        defaultValue={tempGameID}
        helperText={errorGameID}
      />

      <div>{isLoading && <LinearProgress />}</div>

      <Button
        className="mui-block"
        variant="contained"
        color="primary"
        disabled={!isValidNickname || !isValidGameID}
        onClick={() => NOOP()}
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
