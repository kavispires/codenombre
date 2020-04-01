import { createGlobalState } from 'react-hooks-global-state';

import GameEngine from './engine';

const initialState = {
  gameID: null,
  nickname: null,
  isLoading: false,
  game: GameEngine.state(),
  dbRef: null,
  screen: 'home',
  toast: {
    isVisible: false,
    message: '',
  },
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
