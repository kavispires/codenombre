import { GAME_LENGHTS, KEY_MAPPING } from './constants';
import { getRandomItems, shuffle } from './utils';

const WORDS = require('./words');

class GameEngine {
  constructor() {
    this.gameID = null;
    this.codenames = [];
    this.mode = null;
    this.turn = 0;
    this.cluesA = [];
    this.cluesB = [];
    this.keyCardA = [];
    this.keyCardB = [];
    this.whoAmI = 'A';
  }

  init(gameID, mode = 'classic') {
    this.reset();

    this.gameID = gameID;
    this.mode = mode;
    this.setup();
    return this.state();
  }

  setGameID(gameID) {
    this.gameID = gameID;
  }

  state() {
    return {
      mode: this.mode,
      gameID: this.gameID,
      codenames: this.codenames,
      keyCard: this.keyCard,
    };
  }

  update(data) {
    console.log('%cUpdating game...', 'background:LemonChiffon', data);
    this.gameID = data.gameID;
    this.codenames = data.codenames;
    this.mode = data.mode;
    this.turn = data.turn;
    this.cluesA = data.cluesA;
    this.cluesB = data.cluesB;
    this.keyCard = data.keyCard;

    return this.state();
  }

  reset() {
    // TO-DO reset all properties
  }

  setup() {
    const gridLength = GAME_LENGHTS[this.mode];
    const keyMap = KEY_MAPPING[this.mode];

    // Build key card
    const keyArray = Object.entries(keyMap).reduce((acc, [key, count]) => {
      const newArr = new Array(count).fill(key);
      return [...acc, ...newArr];
    }, []);

    // Set KeyCards
    this.keyCard = shuffle(keyArray);

    // Set words
    this.codenames = getRandomItems(WORDS, gridLength);
  }

  getMyKeys() {
    return this.whoAmI === 'A' ? this.keyCard : this.keyCard.reverse();
  }

  //
}

export default new GameEngine();
