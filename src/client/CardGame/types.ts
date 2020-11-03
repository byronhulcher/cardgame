export enum Player {
  One = 0,
  Two = 1
}

export enum Card {
  Sacrifice1RGain1V,
  Sacrifice4RGain6R,
  Remove2R,
  Gain1R
}

type CardProperties = {
  displayedName?: string
  displayedText?: string
  symbol?: string
}

export type CardFunctions = {
  updateResourcePoints(resourcePoints: ResourcePointsTuple, player: Player): ResourcePointsTuple
  updateVictoryPoints(victoryPoints: VictoryPointsTuple, player: Player): VictoryPointsTuple
  condition(gameState: CardGameState): boolean
}

export type CardData = CardProperties & CardFunctions & {
  name: Card
}
export type IncompleteCardData = CardProperties & Partial<CardFunctions>

export type CardDataLibrary = {
  [key in Card]: IncompleteCardData
}

/* Instead of modifying the game state directly, these cards will apply a passive effect.
   Still trying to work out how to represent that in state machine */
// export enum Effect {
//   ReduceNext2plusP,
//   MatchNextV
// }

export type HandTuple = [Card[], Card[]]
export type DeckTuple = [Card[], Card[]]
// export type EffectTuple = [Effect[], Effect[]]
export type ResourcePointsTuple = [number, number]
export type VictoryPointsTuple = [number, number]


// The propertiees provided by our game's state
export type CardGameState = {
  // effects: EffectTuple
  activePlayer: Player
  hands: HandTuple
  decks: DeckTuple
  lastHarvest: Player | null
  resourcePoints: ResourcePointsTuple
  victoryPoints: VictoryPointsTuple
}

export type CardGameActions = {
  harvestResources(player: Player, modifier: number): void
  resetGame(): void
  startTurn(player: Player): void
  playCard(player: Player, card: Card): void
  drawCard(player: Player, card: Card): void
}
