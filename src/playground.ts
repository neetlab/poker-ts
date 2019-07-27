import { checkHand } from './hands';
import { StandardCard } from './cards/standard-card';
import { JokerCard } from './cards/joker-card';

const cards = [
  new StandardCard(13, 'spade'),
  new StandardCard(12, 'spade'),
  new StandardCard(11, 'diamond'),
  new StandardCard(10, 'heart'),
  new StandardCard(1, 'club'),
];

const hand = checkHand(cards);

console.log(hand);
