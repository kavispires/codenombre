import { GAME_LENGHTS, KEY_MAPPING } from './constants';
import { getRandomItems, shuffle } from './utils';
import mockTurns from './api/mock-turns';

const WORDS = require('./words');

const ONE_MINUTE = 60000;

const dialogs = {
  setup:
    'Analyse the codenames.<br>Your goal is to help your ally to find as many agents (cards) on their side.<br>When you think you have a good clue in mind, press "I want to start"!',
  giveClue:
    "Come up with a one-word clue and the number of cards that match your clue.<br>Watch out for matching Assassins (black-bordered cards), if your ally selects one of them, it's game over.",
  waitClue:
    'Waiting for your ally to come up with a clue that matches as many codenames as possible.<br>Stay in position!',
  makeGuess:
    "Check the message board for your clue. The number is how many codenames match the clue.<br>Don't fail me agent! Click on the cards you think are a match. You need to make at least one guess to be able to pass.",
  waitGuess:
    'Your ally is trying to make contact with the spies.<br>Was your clue clear enough? Wait and see',
  wrongGuess: 'Your ally selected the WRONG agent!',
  myWrongGuess: 'You selected the WRONG agent!',
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
    this.guesses = {};

    this._tempSaveObj = null;
    this._interval = null;
  }

  // GETTERS

  /**
   * Determines the index of the player in the players array
   * @type  {string}
   */
  get myDatabaseIndex() {
    return this.players.findIndex((p) => p === this.me);
  }

  /**
   * Determines the index of the ally in the players array
   * @type  {string}
   */
  get allyDatabaseIndex() {
    return this.turnOrder.findIndex((p) => p !== this.me);
  }

  /**
   * Determines the index of the player in the turn order array
   * @type  {string}
   */
  get myTurnIndex() {
    return this.turnOrder.findIndex((p) => p === this.me);
  }

  /**
   * Determines the index of the player in the turn order array
   * @type  {string}
   */
  get myAllyIndex() {
    return this.turnOrder.findIndex((p) => p !== this.me);
  }

  /**
   * Returns the name of the other player or OP
   * @type  {string}
   */
  get allysName() {
    return this.players[this.allyDatabaseIndex] || 'OP';
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
   * Determines if player has an active or passive action depending on the turn
   * @type  {string} passive or active
   */
  get turnRole() {
    return this.turn % 2 === this.myTurnIndex ? 'passive' : 'active';
  }

  /**
   * Determines the current dialog according to phase and turn role
   * @type  {string}
   */
  get dialog() {
    switch (this.phase) {
      case 'setup':
        return dialogs.setup;
      case 'clue-giving':
        return this.turnRole === 'active' ? dialogs.giveClue : dialogs.waitClue;
      case 'guessing':
        return this.turnRole === 'active' ? dialogs.makeGuess : dialogs.waitGuess;
      case 'wrong-guess':
        return this.turnRole === 'active' ? dialogs.wrongGuess : dialogs.myWrongGuess;
      default:
        return '';
    }
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
      messages: this.messages || [],
      turnOrder: this.turnOrder,
      codenames: this.codenames,
      keyCard: this.keyCard,
    };
  }

  // METHORDS

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
    if (!this._interval) {
      this._interval = setInterval(() => {
        if (this._dbRef) {
          this.save({ ...this._tempSaveObj });
          this._tempSaveObj = null;
          clearInterval(this._interval);
        }
      }, 1000);
    } else {
      console.warn('There`s already a save interval running');
    }
  }

  save(dataObj = {}) {
    if (!this._dbRef) {
      this._tempSaveObj = dataObj;
      return this.delaySave();
    }

    console.log('%cSaving...', 'background:LightSalmon', dataObj);

    // New timestamp
    this.timestamps[this.myDatabaseIndex] = Date.now();

    this._dbRef.update({
      ...dataObj,
      timestamps: dataObj.mock ? dataObj.timestamps : this.timestamps,
    });
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
    this.turnOrder = data.turnOrder || [];

    this.messages = data.messages || [];

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

  // SETTERS

  setDbRef(dbRef) {
    if (!this._dbRef) {
      this._dbRef = dbRef;
    }
  }

  setGameID(gameID) {
    this.gameID = gameID;
  }

  // SAVERS

  setPlayer(nickname) {
    this.me = nickname;

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

  setTurnOrder() {
    const turnOrder = this.myDatabaseIndex === 0 ? [...this.players] : [...this.players].reverse();
    this.save({
      turnOrder,
      turn: this.turn + 1,
      phase: 'clue-giving',
    });
  }

  submitClue(clueObj) {
    this.save({
      phase: 'guessing',
      messages: [
        ...this.messages,
        {
          clue: clueObj.clue,
          number: clueObj.number || 0,
          player: this.me,
        },
      ],
    });
  }

  submitGuess(guessIndex) {
    // Check if guess is result
    const guessResult = this.keyCard[guessIndex][this.allyDatabaseIndex];
    console.log('key', this.keyCard[guessIndex]);
    console.log('myGuess', guessResult);
    //
    switch (guessResult) {
      case 'A':
        console.log('CASE A');
        // this.save({
        //   turn: 0,
        //   phase: 'gameover',
        //   // TO-DO: determine what side made the mistake
        // });
        break;
      case 'G':
        console.log('CASE G');
        // Save guess
        break;
      case 'B':
        console.log('CASE B');
        // Save guess
        // Force pass
        break;
      default:
        console.log('CASE ?');
      // do nothing
    }
  }

  pass() {}

  mock(turnNumber) {
    this.save(mockTurns(turnNumber));
  }
}

export default new GameEngine();
