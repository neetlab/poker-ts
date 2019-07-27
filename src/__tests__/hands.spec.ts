import { checkHand } from '../hands';
import { StandardCard } from '../cards/standard-card';
import { JokerCard } from '../cards/joker-card';

describe('hands', () => {
  test('five of a kind', () => {
    const cards = [
      new StandardCard(1, 'spade'),
      new StandardCard(1, 'diamond'),
      new StandardCard(1, 'club'),
      new StandardCard(1, 'heart'),
      new JokerCard(),
    ];

    expect(checkHand(cards)).toBe('fiveOfAKind');
  })

  test('royal straight flush', () => {
    const cards = [
      new StandardCard(1, 'spade'),
      new StandardCard(10, 'spade'),
      new StandardCard(11, 'spade'),
      new StandardCard(12, 'spade'),
      new StandardCard(13, 'spade'),
    ];

    expect(checkHand(cards)).toBe('royalStraightFlush');
  });

  test('straight flush', () => {
    const cards = [
      new StandardCard(6, 'diamond'),
      new StandardCard(5, 'diamond'),
      new StandardCard(4, 'diamond'),
      new StandardCard(3, 'diamond'),
      new StandardCard(2, 'diamond'),
    ];

    expect(checkHand(cards)).toBe('straightFlush');
  });

  test('four of a kind', () => {
    const cards = [
      new StandardCard(1, 'spade'),
      new StandardCard(1, 'diamond'),
      new StandardCard(1, 'club'),
      new StandardCard(1, 'heart'),
      new StandardCard(10, 'spade'),
    ];

    expect(checkHand(cards)).toBe('fourOfAKind');
  });

  test('full house', () => {
    const cards = [
      new StandardCard(2, 'spade'),
      new StandardCard(2, 'heart'),
      new StandardCard(2, 'club'),
      new StandardCard(8, 'diamond'),
      new StandardCard(8, 'club'),
    ];

    expect(checkHand(cards)).toBe('fullHouse');
  });

  test('flush', () => {
    const cards = [
      new StandardCard(13, 'spade'),
      new StandardCard(11, 'spade'),
      new StandardCard(8, 'spade'),
      new StandardCard(5, 'spade'),
      new StandardCard(3, 'spade'),
    ];

    expect(checkHand(cards)).toBe('flush');
  });

  test('straight', () => {
    const cards = [
      new StandardCard(13, 'spade'),
      new StandardCard(12, 'spade'),
      new StandardCard(11, 'diamond'),
      new StandardCard(10, 'heart'),
      new StandardCard(9, 'club'),
    ];

    expect(checkHand(cards)).toBe('straight');
  });

  test('13 -> A straight', () => {
    const cards = [
      new StandardCard(13, 'spade'),
      new StandardCard(12, 'spade'),
      new StandardCard(11, 'diamond'),
      new StandardCard(10, 'heart'),
      new StandardCard(1, 'club'),
    ];

    expect(checkHand(cards)).toBe('straight');
  });

  test('three of a kind', () => {
    const cards = [
      new StandardCard(9, 'spade'),
      new StandardCard(9, 'diamond'),
      new StandardCard(9, 'club'),
      new StandardCard(5, 'spade'),
      new StandardCard(4, 'club'),
    ];

    expect(checkHand(cards)).toBe('threeOfAKind');
  });

  test('two pair', () => {
    const cards = [
      new StandardCard(10, 'heart'),
      new StandardCard(10, 'club'),
      new StandardCard(6, 'heart'),
      new StandardCard(6, 'spade'),
      new StandardCard(1, 'club'),
    ];

    expect(checkHand(cards)).toBe('twoPair');
  });

  test('one pair', () => {
    const cards = [
      new StandardCard(12, 'diamond'),
      new StandardCard(12, 'club'),
      new StandardCard(1, 'heart'),
      new StandardCard(13, 'diamond'),
      new StandardCard(5, 'club'),
    ];

    expect(checkHand(cards)).toBe('onePair');
  });

  test('no pair', () => {
    const cards = [
      new StandardCard(1, 'diamond'),
      new StandardCard(13, 'club'),
      new StandardCard(11, 'diamond'),
      new StandardCard(6, 'club'),
      new StandardCard(4, 'spade'),
    ];

    expect(checkHand(cards)).toBe('noPair');
  });
});
