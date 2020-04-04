import React, { useState } from 'react';

import useGlobalState from '../useGlobalState';
import localStorageService from '../localStorage';

import HomeHeader from './HomeHeader';
import HomeJoin from './HomeJoin';
import HomeCreate from './HomeCreate';

const Home = () => {
  // Local Storage State
  const [lsGameID, lsNickname] = localStorageService.getDefaults();
  // Global States
  const [screen] = useGlobalState('screen');
  // Dependable States
  const [tempGameID, setTempGameID] = useState(lsGameID);
  const [tempNickname] = useState(lsNickname);

  return (
    <div className="home">
      <HomeHeader />
      <div className="home-content">
        {screen === 'home' && (
          <HomeJoin
            tempGameID={tempGameID}
            setTempGameID={setTempGameID}
            tempNickname={tempNickname}
          />
        )}
        {screen === 'home.create' && (
          <HomeCreate tempGameID={tempGameID} setTempGameID={setTempGameID} />
        )}
      </div>
    </div>
  );
};

export default Home;
