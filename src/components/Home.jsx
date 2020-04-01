import React, { useState } from 'react';

import useGlobalState from '../useGlobalState';

import HomeHeader from './HomeHeader';
import HomeJoin from './HomeJoin';
import HomeCreate from './HomeCreate';

const Home = () => {
  // Global States
  const [screen] = useGlobalState('screen');
  // Dependable States
  const [tempGameID, setTempGameID] = useState('');

  return (
    <div className="home">
      <HomeHeader />
      <div className="home-content">
        {screen === 'home' && <HomeJoin tempGameID={tempGameID} setTempGameID={setTempGameID} />}
        {screen === 'home.create' && (
          <HomeCreate tempGameID={tempGameID} setTempGameID={setTempGameID} />
        )}
      </div>
    </div>
  );
};

export default Home;
