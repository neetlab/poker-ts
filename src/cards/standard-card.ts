import { Card } from "./card";

export type Suit = "spade" | "club" | "heart" | "diamond";

export class StandardCard extends Card {
  constructor(public readonly rank: number, public readonly suit: Suit) {
    super();
  }
}
