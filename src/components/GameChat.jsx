import React, { useState } from 'react';

import useGlobalState from '../useGlobalState';

import GameActions from './GameActions';

function buildMessagesMock() {
  const clues = [
    'pandemic',
    'book',
    'store',
    'purchase',
    'nine',
    'investigator',
    'body',
    'morning',
    'mother',
    'daisy',
    'son',
    'love',
    'date',
    'drink',
    'drugs',
    'fabric',
    'rigid',
    'see',
    'detail',
    'information',
    'palm',
    'print',
    'alaska',
    'headphones',
    'table',
    'tomato',
    'clue',
    'amazing',
  ];

  return clues.reduce((acc, clue, index) => {
    const obj = {
      clue,
      number: Math.floor(Math.random() * 4),
      user: index % 2 === 0 ? 'me' : 'you',
    };

    acc.push(obj);
    return acc;
  }, []);
}

const messages = buildMessagesMock();

const GameChat = () => {
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

  return (
    <div className="game-chat">
      <div className="message-board">
        {messages.map((messageEntry, index) => {
          if (messageEntry.user === 'me') {
            return (
              <div key={`${messageEntry.clue}-${index}`} className="message message-mine">
                <span className="message-text">
                  {messageEntry.clue}, {messageEntry.number}
                </span>
              </div>
            );
          }

          return (
            <div key={`${messageEntry.clue}-${index}`} className="message message-their">
              <span className="message-text">
                {messageEntry.clue}, {messageEntry.number}
              </span>
            </div>
          );
        })}
      </div>
      <GameActions />
    </div>
  );
};

export default GameChat;
