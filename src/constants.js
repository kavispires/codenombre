const SHORT_GAME_KEYS = {
  GG: 2,
  AA: 1,
  AG: 1,
  AB: 1,
  GA: 1,
  BA: 1,
  BB: 3,
  GB: 3,
  BG: 3,
};

const MEDIUM_GAME_KEYS = {
  GG: 3,
  AA: 1,
  AG: 1,
  AB: 1,
  GA: 1,
  BA: 1,
  BB: 4,
  GB: 4,
  BG: 4,
};

const LONG_GAME_KEYS = {
  GG: 3,
  AA: 1,
  AG: 1,
  AB: 1,
  GA: 1,
  BA: 1,
  BB: 7,
  GB: 5,
  BG: 5,
};

export const GAME_LENGHTS = {
  classic: 25,
  simple: 16,
  pictures: 20,
  dixit: 16,
  deception: 20,
};

export const LINE_LENGTHS = {
  classic: 5,
  simple: 4,
  pictures: 5,
  dixit: 4,
  deception: 5,
};

export const KEY_MAPPING = {
  classic: LONG_GAME_KEYS,
  simple: SHORT_GAME_KEYS,
  pictures: MEDIUM_GAME_KEYS,
  dixit: SHORT_GAME_KEYS,
};

export const MILITARY_ALPHABET = {
  A: 'alpha',
  B: 'bravo',
  C: 'charlie',
  D: 'delta',
  E: 'echo',
  F: 'foxtrot',
  G: 'golf',
  H: 'hotel',
  I: 'india',
  J: 'juliet',
  K: 'kilo',
  L: 'lima',
  M: 'mike',
  N: 'november',
  O: 'oscar',
  P: 'papa',
  Q: 'quebek',
  R: 'romeo',
  S: 'sierra',
  T: 'tango',
  U: 'uniform',
  V: 'victor',
  W: 'whiskey',
  X: 'x-ray',
  Y: 'yankee',
  Z: 'zulu',
};
