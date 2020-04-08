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
  messages: [],
};

const mockMessages = (num) => {
  const clues = [
    'pandemic',
    'bagel',
    'store',
    'purchase',
    'nine',
    'investigator',
    'body',
    'morning',
    'mother',
    'daisy',
    'son',
    'love',
    'date',
    'drink',
    'drugs',
    'fabric',
    'rigid',
    'see',
    'detail',
    'information',
    'palm',
    'print',
    'alaska',
    'headphones',
    'table',
    'tomato',
    'clue',
    'amazing',
  ];

  return new Array(num).fill(' ').map((entry, index) => {
    return {
      clue: clues[index],
      number: Math.floor(Math.random() * 4),
      user: basics.turnOrder[index % 2],
    };
  });
};

const mockTurns = (set) => {
  const now = Date.now();

  switch (set) {
    case 'setup':
      return {
        ...basics,
        timestamps: [now, now],
        turn: 0,
        phase: 'setup',
      };
    case 'turn1.clue-giving':
      return {
        ...basics,
        timestamps: [now, now],
        turn: 1,
        phase: 'clue-giving',
      };
    case 'turn1.guessing':
      return {
        ...basics,
        timestamps: [now, now],
        turn: 1,
        phase: 'guessing',
        messages: mockMessages(1),
      };
    case 'turn2.clue-giving':
      return {
        ...basics,
        timestamps: [now, now],
        turn: 2,
        phase: 'clue-giving',
        messages: mockMessages(20),
      };
    case 'turn2.guessing':
      return {
        ...basics,
        timestamps: [now, now],
        turn: 2,
        phase: 'guessing',
        messages: mockMessages(2),
      };
    default:
      return {
        ...basics,
        timestamps: [now, now],
      };
  }
};

export default mockTurns;
