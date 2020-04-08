import React from 'react';

import cardAgent from '../images/card-agent.jpg';
import cardAssassin from '../images/card-assassin.jpg';
import cardBystander from '../images/card-bystander.jpg';

import gameEngine from '../engine';

const getImageSource = (keyClass) => {
  switch (keyClass) {
    case 'agent':
      return cardAgent;
    case 'assassin':
      return cardAssassin;
    default:
      return cardBystander;
  }
};

const Card = ({ codename, codenameID, type, size, keyClass, isButton, state }) => {
  const imageSource = getImageSource(keyClass);

  if (isButton) {
    return (
      <button
        className={`codename codename--button codename--${type} codename--${size} codename--${keyClass}`}
        onClick={() => gameEngine.submitGuess(codenameID)}
      >
        <InnerCard codename={codename} state={state} imageSource={imageSource} type={type} />
      </button>
    );
  }
  return (
    <div className={`codename codename--${type} codename--${size} codename--${keyClass}`}>
      <InnerCard codename={codename} state={state} imageSource={imageSource} type={type} />
    </div>
  );
};

const InnerCard = ({ codename, state, imageSource, type }) => {
  switch (state) {
    case 'revealed-me':
      return (
        <>
          <img className="codename__background" src={imageSource} alt={imageSource} />
          {type === 'word' && <span className="codename__word">{codename}</span>}
          {type === 'word' && <span className="codename__word-updsidedown">{codename}</span>}
        </>
      );
    case 'revealed-you':
      return (
        <>
          <img className="codename__background" src={imageSource} alt={imageSource} />
          {type === 'word' && <span className="codename__word">{codename}</span>}
          {type === 'word' && <span className="codename__word-updsidedown">{codename}</span>}
        </>
      );
    default:
      return (
        <>
          <img className="codename__background" src={imageSource} alt={imageSource} />
          {type === 'word' && <span className="codename__word">{codename}</span>}
          {type === 'word' && <span className="codename__word-updsidedown">{codename}</span>}
        </>
      );
  }
};

export default Card;
