enum Player {
  One = 0,
  Two = 1
}

enum Card {
  Sac1RGet1V,
  Remove2R,
  Gain1R
}

type CardData = {
  displayedName?: string
  displayedText?: string
  symbol?: string
  updateResourcePoints?(victoryPoints: VictoryPointsTuple, player: Player)
  updateVictoryPoints?(victoryPoints: VictoryPointsTuple, player: Player)
}

type CardDataWithName = CardData & {
  name: Card
}

type CardDataLibrary = {
  [key in Card]: CardData
}

/* Instead of modifying the game state directly, these cards will apply a passive effect.
   Still trying to work out how to represent that in state machine */
// enum Effect {
//   ReduceNext2plusP,
//   MatchNextV
// }

type ZeroToSix = 0 | 1 | 2 | 3 | 4 | 5 | 6
type ZeroToZen = ZeroToSix | 7 | 8 | 9 | 10

type HandTuple = [Card[], Card[]]
type DeckTuple = [Card[], Card[]]
// type EffectTuple = [Effect[], Effect[]]
type ResourcePointsTuple = [ZeroToSix, ZeroToSix]
type VictoryPointsTuple = [ZeroToZen, ZeroToZen]

// The propertiees provided by our game's state
type GameState = {
  // effects: EffectTuple
  hands: HandTuple
  decks: DeckTuple
  resourcePoints: ResourcePointsTuple
  victoryPoints: VictoryPointsTuple
  activeTurn: Player
}

type GameActions = {
  resetGame(): void
  startTurn(player: Player): void
  playCard(player: Player, card: Card): void
  drawCard(player: Player, card: Card): void
}
