const codenames = [
  'america',
  'book',
  'coffee',
  'disco',
  'emerald',
  'fork',
  'gorilla',
  'helicopter',
  'island',
  'job',
  'key',
  'lemon',
  'mountain',
  'november',
  'olive',
  'parrot',
  'queen',
  'rat',
  'sex',
  'tamborine',
  'uber',
  'vase',
  'water',
  'yellow',
  'zombie',
];

const keyCard = [
  'AG',
  'BB',
  'BG',
  'GB',
  'BB',
  'BB',
  'BB',
  'GB',
  'GB',
  'AA',
  'BG',
  'BG',
  'BB',
  'GA',
  'AB',
  'GB',
  'BB',
  'BG',
  'GG',
  'GB',
  'BA',
  'BB',
  'GG',
  'BG',
  'GG',
];

const basics = {
  codenames,
  difficulty: 'normal',
  gameID: 'ABCD',
  keyCard,
  mode: 'classic',
  players: ['Kavis', 'Dennis'],
  turnOrder: ['Kavis', 'Dennis'],
  timestamps: [0, 0],
  turn: 0,
  phase: 'setup',
  mock: true,
};

const mockTurns = (turnNumber) => {
  const now = Date.now();

  switch (turnNumber) {
    case 0:
      return {
        ...basics,
        timestamps: [now, now],
        turn: 0,
        phase: 'setup',
      };
    case 1:
      return {
        ...basics,
        timestamps: [now, now],
        turn: 1,
        phase: 'clue-giving',
      };
    case 2:
      return {
        ...basics,
        timestamps: [now, now],
        turn: 2,
        phase: 'guessing',
      };
    default:
      return {
        ...basics,
        timestamps: [now, now],
      };
  }
};

export default mockTurns;
