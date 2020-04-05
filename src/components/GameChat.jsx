import React from 'react';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

const GameChat = () => {
  // Global state
  const [game] = useGlobalState('game');

  return (
    <div className="grid-chat game-chat">
      {game.messages &&
        game.messages.map((messageEntry, index) => {
          if (messageEntry.user === gameEngine.me) {
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
  );
};

export default GameChat;
