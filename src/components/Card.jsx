import React from 'react';

import cardAgent from '../images/card-agent.jpg';
import cardAssassin from '../images/card-assassin.jpg';
import cardBystander from '../images/card-bystander.jpg';

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

const Card = ({ codename, type, size, keyClass }) => {
  return (
    <div className={`codename codename--${size} codename--${keyClass}`}>
      <img className="codename__background" src={getImageSource(keyClass)} alt={keyClass} />
      {type === 'word' && <span className="codename__word">{codename}</span>}
      {type === 'word' && <span className="codename__word-updsidedown">{codename}</span>}
    </div>
  );
};

export default Card;
