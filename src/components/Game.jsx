import React, { useEffect } from 'react';

import API from '../api';
import gameEngine from '../engine';
import toastService from '../toastService';
import useGlobalState from '../useGlobalState';
import { isEveryoneOnline } from '../utils';

import GameHeader from './GameHeader';
import GameSession from './GameSession';
import GameWaitingRoom from './GameWaitingRoom';

const Game = () => {
  // Global States
  const [dbRef, setDbRef] = useGlobalState('dbRef');
  const [game, setGame] = useGlobalState('game');
  const [gameID, setGameID] = useGlobalState('gameID');
  const [, setIsLoading] = useGlobalState('isLoading');
  const [screen, setScreen] = useGlobalState('screen');
  const [toast, setToast] = useGlobalState('toast');
  const [online, setOnline] = useGlobalState('online');

  // Create database reference
  useEffect(() => {
    if (game.gameID === null && gameID) {
      setIsLoading(true);

      API.ref(`codenombre/${gameID}`).once('value', (snap) => {
        if (snap.val()) {
          console.log('SETTING REF');
          const firebaseReference = API.ref().child('codenombre').child(gameID);
          gameEngine.setGameID(gameID);
          gameEngine.setDbRef(firebaseReference);
          setGame(gameEngine.update(snap.val()));
          setDbRef(firebaseReference);
        } else {
          setGameID(null);
          gameEngine.setGameID(null);
          setToast(toastService.error(toast, 'Failed to start game session'));
          setScreen('home');
        }

        setGame(gameEngine.state);
        setIsLoading(false);
      });
    }
  }, [game.gameID, gameID, setDbRef, setGame, setGameID, setIsLoading, setScreen, setToast, toast]);

  useEffect(() => {
    if (dbRef) {
      const handleGameState = (snap) => {
        setIsLoading(true);
        if (snap.val()) {
          setGame(gameEngine.update(snap.val()));
          setOnline(gameEngine.updateOnline());
        }
        setIsLoading(false);
      };

      dbRef.on('value', handleGameState);

      const handleGameDisconnect = (snap) => {
        setIsLoading(false);
        setToast(toastService.info(toast, 'Server disconnected'));
        setScreen('home');
      };

      return () => {
        dbRef.off('value', handleGameDisconnect);
      };
    }
  }, [dbRef, setGame, setIsLoading, setScreen, setToast, toast, setOnline]);

  return (
    <div className="game">
      <GameHeader gameID={gameID} />
      {(screen === 'game.waiting' || !isEveryoneOnline(online)) && <GameWaitingRoom />}
      {screen.startsWith('game.stage') && <GameSession />}
    </div>
  );
};

export default Game;
