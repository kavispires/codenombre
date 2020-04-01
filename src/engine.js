import { GAME_LENGHTS, KEY_MAPPING } from './constants';
import { getRandomItems, shuffle } from './utils';

const WORDS = require('./words');

class GameEngine {
  constructor() {
    this._dbRef = null;

    this.gameID = null;
    this.mode = null;
    this.difficulty = null;
    this.players = [];
    this.me = null;

    this.codenames = [];
    this.turn = 0;
    this.cluesA = [];
    this.cluesB = [];
    this.keyCardA = [];
    this.keyCardB = [];
    this.whoAmI = 'A';
  }

  init(gameID, mode, difficulty) {
    this.reset();

    this.gameID = gameID;
    this.mode = mode;
    this.difficulty = difficulty;

    this.setup();
    return this.state();
  }

  save(dataObj) {
    this._dbRef.update(dataObj);
  }

  setDbRef(dbRef) {
    this._dbRef = dbRef;
  }

  setGameID(gameID) {
    this.gameID = gameID;
  }

  isMyNicknameSet() {
    return this.players.includes(this.me);
  }

  setPlayer(nickname) {
    if (!this.players.includes(nickname)) {
      this.players.push(nickname);
      this.me = nickname;
      this.save({ players: this.players });
      console.log('players', this.players);
      console.log('me', this.me);
    }
  }

  state() {
    return {
      gameID: this.gameID,
      mode: this.mode,
      difficulty: this.difficulty,
      players: this.players,

      codenames: this.codenames,
      keyCard: this.keyCard,
    };
  }

  update(data) {
    console.log('%cUpdating game...', 'background:LemonChiffon', data);
    this.gameID = data.gameID;
    this.mode = data.mode;
    this.difficulty = data.difficulty;
    this.players = data.players || [];

    this.codenames = data.codenames;
    // this.turn = data.turn;
    // this.cluesA = data.cluesA;
    // this.cluesB = data.cluesB;
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
