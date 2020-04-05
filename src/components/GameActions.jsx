import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const NOOP = () => console.log('OK');

const GameActions = () => {
  // Global state
  const [game] = useGlobalState('game');
  // Local state
  const [clue, setClue] = useState({ clue: null, number: null });

  const handleClue = (type, value) => {
    if (value) {
      if (type === 'clue') {
        setClue({ ...clue, clue: value });
      } else if (type === 'number') {
        setClue({ ...clue, number: value });
      }
    }
  };

  const handleSubmitClue = () => {
    gameEngine.submitClue(clue);
  };

  const isClueReady = clue.clue && !clue.clue.includes(' ') && clue.number >= 0;

  return (
    <div className="grid-actions game-actions">
      {game.phase === 'setup' && (
        <div className="game-actions__actions game-actions__actions--setup">
          <Button
            className="mui-block"
            variant="contained"
            color="primary"
            style={{ background: green[500] }}
            onClick={() => gameEngine.setTurnOrder()}
          >
            I want to start!
          </Button>
        </div>
      )}

      {game.phase === 'clue-giving' && gameEngine.turnRole === 'active' && (
        <div className="game-actions__actions game-actions__actions--clue-giving">
          <TextField
            className="block"
            id="clue"
            label="Clue"
            inputProps={{ autocomplete: 'off' }}
            onChange={(e) => handleClue('clue', e.target.value)}
          />
          <TextField
            id="filled-number"
            label="Number"
            type="number"
            inputProps={{ min: '0', max: '25', step: '1' }}
            onChange={(e) => handleClue('number', +e.target.value)}
          />
          <Button
            className="block"
            variant="contained"
            color="primary"
            disabled={!isClueReady}
            style={{ background: green[500] }}
            onClick={handleSubmitClue}
          >
            <SendIcon />
          </Button>
        </div>
      )}

      {game.phase === 'guessing' && gameEngine.turnRole === 'passive' && (
        <div className="game-actions__actions game-actions__actions--guessing">
          <Button
            className="block"
            variant="contained"
            color="primary"
            disabled={false}
            style={{ background: green[500] }}
            onClick={() => NOOP()}
          >
            PASS
          </Button>
        </div>
      )}

      {((game.phase === 'clue-giving' && gameEngine.turnRole === 'passive') ||
        (game.phase === 'guessing' && gameEngine.turnRole === 'active')) && (
        <div className="game-actions__actions game-actions__actions--waiting">
          <CircularProgress style={{ color: green[500] }} />
        </div>
      )}
    </div>
  );
};

export default GameActions;
