import { StandardCard } from './cards/standard-card';

export function order(a: StandardCard, b: StandardCard) {
  return a.rank - b.rank;
}

export function prevOf(card: StandardCard) {
  if (card.rank === 1) return new StandardCard(13, card.suit);
  return new StandardCard(card.rank - 1, card.suit);
}
