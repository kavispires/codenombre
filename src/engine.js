import { GAME_LENGHTS, KEY_MAPPING } from './constants';
import { getRandomItems, shuffle } from './utils';

const WORDS = require('./words');

const ONE_MINUTE = 60000;

const dialogs = {
  setup:
    'Analyse the cards.<br>When you think you have a good clue in mind, press "I want to start"!',
};

class GameEngine {
  constructor() {
    this._dbRef = null;

    this.gameID = null;
    this.mode = null;
    this.difficulty = null;
    this.players = [];
    this.online = [false, false];
    this.timestamps = [0, 0];
    this.me = null;
    this.turn = 0;
    this.turnOrder = [];
    this.phase = 'setup';
    this.messages = [];
    this.codenames = [];

    this._tempSaveObj = null;
    this._interval = null;
  }

  /**
   * Determines the index of the player in the players array
   * @type  {string}
   */
  get myDatabaseIndex() {
    return this.players.findIndex((p) => p === this.me);
  }

  /**
   * Determines the index of the oppoent in the players array
   * @type  {string}
   */
  get opponentIndex() {
    return this.players.findIndex((p) => p !== this.me);
  }

  /**
   * Flag indicating if game has already two players set
   * @type  {boolean}
   */
  get isGameFull() {
    return !this.amISet && this.players.length === 2;
  }

  /**
   * Flag indicating if me property is set and included in players
   * @type  {boolean}
   */
  get amISet() {
    return this.me && this.players.includes(this.me);
  }

  /**
   * State to be used by the game global state
   * @type  {string}
   */
  get state() {
    return {
      gameID: this.gameID,
      mode: this.mode,
      difficulty: this.difficulty,
      players: this.players,
      timestamps: this.timestamps,
      turn: this.turn,
      phase: this.phase,
      messages: this.messages,
      turnOrder: this.turnOrder,
      codenames: this.codenames,
      keyCard: this.keyCard,
    };
  }

  get dialog() {
    if (this.phase === 'setup') {
      return dialogs.setup;
    }

    return '';
  }

  /**
   * Sets basic info and calls setup function to prepare game
   * @param  {string} gameID a 4-letter unique ID
   * @param  {string} mode (classic, simple, pictures, dixit, deception)
   * @param  {string} difficulty (easy, normal)
   * @returns {object} the current state
   */
  init(gameID, mode, difficulty) {
    this.reset();

    this.gameID = gameID;
    this.mode = mode;
    this.difficulty = difficulty;

    this.setup();

    return this.state;
  }

  updateOnline() {
    this.online = this.timestamps.map((entry) => Date.now() - entry < ONE_MINUTE * 10);
    return this.online;
  }

  delaySave() {
    this._interval = setInterval(() => {
      if (this._dbRef) {
        this.save({ ...this._tempSaveObj });
        this._tempSaveObj = null;
        clearInterval(this._interval);
      }
    }, 1000);
  }

  save(dataObj = {}) {
    if (!this._dbRef) {
      this._tempSaveObj = dataObj;
      return this.delaySave();
    }

    console.log('%cSaving...', 'background:LightSalmon');
    // New timestamp
    this.timestamps[this.myDatabaseIndex] = Date.now();
    // // Update online check
    // this.updateOnline();

    this._dbRef.update({
      ...dataObj,
      timestamps: this.timestamps,
    });
  }

  num = 1;

  setDbRef(dbRef) {
    if (!this._dbRef) {
      this._dbRef = dbRef;
    }
  }

  setGameID(gameID) {
    this.gameID = gameID;
  }

  setPlayer(nickname) {
    this.me = nickname;
    console.log(this.me, nickname);

    if (this.isGameFull) {
      throw Error('Game is full, try a different game ID');
    }

    if (!this.players.includes(nickname)) {
      this.players.push(nickname);
      this.save({ players: this.players });
    } else {
      this.save();
    }
  }

  setMe(nickname) {
    if (!this.me) this.me = nickname;

    this.save();
  }

  update(data) {
    console.log('%cUpdating game...', 'background:GreenYellow', data);
    this.gameID = data.gameID;
    this.mode = data.mode;
    this.difficulty = data.difficulty;
    this.players = data.players || [];
    this.timestamps = data.timestamps || [0, 0];
    this.turn = data.turn;
    this.phase = data.phase;
    this.messages = data.messages;

    this.codenames = data.codenames;
    this.keyCard = data.keyCard;

    return this.state;
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

  setTurnOrder() {
    const turnOrder = this.myDatabaseIndex === 0 ? [...this.players] : [...this.players].reverse();
    this.save({
      turnOrder,
      turn: this.turn + 1,
      phase: 'clue-giving',
    });
  }
}

export default new GameEngine();
