import { order, prevOf } from "./utils";
import { groupBy, zip, flatten } from "lodash";
import { JokerCard } from "./cards/joker-card";
import { StandardCard } from "./cards/standard-card";
import { Card } from "./cards/card";

export type Hand =
  | "fiveOfAKind"
  | "royalStraightFlush"
  | "straightFlush"
  | "fourOfAKind"
  | "fullHouse"
  | "flush"
  | "straight"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "noPair";

type HandChecker = (cards: StandardCard[], hasWildcard?: boolean) => boolean;

/**
 * Create an object that stores the same ranks in the same key.
 * @param cards Cards to group
 */
const groupCardsByRank = (cards: StandardCard[]) =>
  groupBy(cards, card => card.rank);

/**
 * Create a 2-dimensional array that stores the most numerous rank first.
 * @param cards
 */
const chunkCardsByRankPriority = (cards: StandardCard[]) =>
  Object.entries(groupCardsByRank(cards))
    .sort(([_1, a], [_2, b]) => b.length - a.length)
    .map(([_, cards]) => cards);

/**
 * Closure for a checker of "N of a kind"
 * @param n number of pair
 * @param pair if this argument given, find multiple kinds
 * @returns hand checker for it
 */
const makeIsNOfAKind = (n: number, pair = 1): HandChecker => (
  cards,
  hasWildCard
) => {
  const [priorityGroup, ...rest] = chunkCardsByRankPriority(cards);

  if (pair > 1) {
    return makeIsNOfAKind(n, pair - 1)(
      flatten(rest),
      hasWildCard && priorityGroup.length !== n
    );
  }

  if (priorityGroup.length === n) return true;
  if (hasWildCard && priorityGroup.length + 1 === n) return true;

  return false;
};

const isFiveOfAKind = makeIsNOfAKind(5);
const isFourOfAKind = makeIsNOfAKind(4);
const isThreeOfAKind = makeIsNOfAKind(3);
const isTwoPair = makeIsNOfAKind(2, 2); // same as "2 of a kind"
const isOnePair = makeIsNOfAKind(2); // same as "2 of a kind"

const isRoyalStraightFlush: HandChecker = (cards, hasWildCard) =>
  isStraightFlush(cards, hasWildCard) &&
  zip(cards.map(card => card.rank), [1, 10, 11, 12, 13]).every(
    ([a, b]) => a === b
  );

const isStraightFlush: HandChecker = (...args) =>
  isStraight(...args) && isFlush(...args);

const isFullHouse: HandChecker = (cards, hasWildCard) => {
  const [priorityGroup, ...rest] = chunkCardsByRankPriority(cards);

  return isThreeOfAKind(priorityGroup, hasWildCard) && isOnePair(flatten(rest));
};

const isStraight: HandChecker = (cards, hasWildCard) => {
  // Make this: 1, 10, 11, 12, 13
  // like this: 9, 10, 11, 12, 13
  const [x, ...xs] = cards.map(prevOf).sort(order);

  if (xs[0].rank - x.rank === 1) {
    if (xs.length <= 1) return true;
    return isStraight(xs, hasWildCard);
  }

  return false;
};

const isFlush: HandChecker = ([x, ...xs]) => {
  if (xs.every(card => card.suit === x.suit)) return true;
  return false;
};

export const checkHand = (cards: Card[]): Hand => {
  const hasWildCard = cards.some(card => card instanceof JokerCard);
  const standardCards = cards
    .filter((card): card is StandardCard => card instanceof StandardCard)
    .sort(order);

  switch (true) {
    case isFiveOfAKind(standardCards, hasWildCard):
      return "fiveOfAKind";
    case isRoyalStraightFlush(standardCards, hasWildCard):
      return "royalStraightFlush";
    case isStraightFlush(standardCards, hasWildCard):
      return "straightFlush";
    case isFourOfAKind(standardCards, hasWildCard):
      return "fourOfAKind";
    case isFullHouse(standardCards, hasWildCard):
      return "fullHouse";
    case isFlush(standardCards, hasWildCard):
      return "flush";
    case isStraight(standardCards, hasWildCard):
      return "straight";
    case isThreeOfAKind(standardCards, hasWildCard):
      return "threeOfAKind";
    case isTwoPair(standardCards, hasWildCard):
      return "twoPair";
    case isOnePair(standardCards, hasWildCard):
      return "onePair";
    default:
      return "noPair";
  }
};
