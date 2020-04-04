import { MILITARY_ALPHABET } from './constants';

export const shuffle = (list) => {
  const res = [...list];
  res.sort(() => Math.random() - 0.5);
  return res;
};

export const getRandomItems = (list, quantity) => {
  const shuffledList = shuffle(list);
  const res = new Array(quantity).fill(null);
  for (let i = 0; i < res.length; i++) {
    const item = shuffledList[i];
    res[i] = item;
  }
  return res;
};

export const reverseLines = (list, lineSize = 5) => {
  const arr = [];
  for (let i = 0; i < list.length; i += lineSize) {
    arr.push(list.slice(i, i + lineSize));
  }

  return arr.reduce((acc, eachArr) => {
    const newArr = eachArr.reverse();
    return [...acc, ...newArr];
  }, []);
};

export const generadeID = () => {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let id = '';

  while (id.length < 4) {
    id += LETTERS[Math.floor(Math.random() * LETTERS.length)];
  }

  return id;
};

export const getMilitaryTranslation = (gameID = '') => {
  return gameID
    .split('')
    .map((letter) => MILITARY_ALPHABET[letter])
    .join(' • ');
};

export const getKeyClass = (index, side, keys) => {
  const key = keys[index][side];
  switch (key) {
    case 'A':
      return 'assassin';
    case 'G':
      return 'agent';
    default:
      return 'bystander';
  }
};

export const isEveryoneOnline = (online) => {
  return online.every((s) => s);
};
