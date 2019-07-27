import { prevOf, order } from '../utils';
import { StandardCard } from '../cards/standard-card';

test('prevOf', () => {
  expect(prevOf(new StandardCard(1, 'spade')).rank).toBe(13);
  expect(prevOf(new StandardCard(13, 'spade')).rank).toBe(12);
})

test('order', () => {
  const one = new StandardCard(1, 'spade');
  const two = new StandardCard(2, 'spade');
  const three = new StandardCard(3, 'spade');

  expect([two, three, one].sort(order)).toEqual([one, two, three]);
})
