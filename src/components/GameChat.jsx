import React from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';

const NOOP = () => console.log('OK');

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

const GameChat = ({ codename, type, size, keyClass }) => {
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
      <div className="message-actions">
        <TextField className="block" required id="game-id" label="Clue" onChange={() => NOOP()} />
        <Button
          className="block"
          variant="contained"
          color="primary"
          disabled={false}
          onClick={() => NOOP()}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

export default GameChat;
