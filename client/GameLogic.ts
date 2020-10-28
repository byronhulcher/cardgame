import { kea } from 'kea'

import { getCardData } from './CardData'
import { getOpponent } from './utils'

export const GameLogic = kea({
  // Boilerplate
  actions: (): GameActions => ({
    resetGame: () => null,
    startTurn: (player: Player) => ({ player }),
    playCard: (player: Player, card: Card) => ({ player, card }),
    drawCard: (player: Player, card: Card) => ({ player, card })
  }),
  // Here's each of our game states values from `GameState`, mapped to different Actions from `GameActions` which update them deterministicly
  reducers: () => ({
    resourcePoints: [[0, 0] as ResourcePointsTuple, {
      resetGame: () => [0, 0] as ResourcePointsTuple,
      playCard: (currentResourcePoints: ResourcePointsTuple, { player, card }: { player: Player, card: Card }) => (getCardData(card).updateResourcePoints || ((points) => points))(currentResourcePoints, player)
    }],
    victoryPoints: [[0, 0] as VictoryPointsTuple, {
      resetGame: () => [0, 0] as VictoryPointsTuple,
      playCard: (currentVictoryPoints: VictoryPointsTuple, { player, card }: { player: Player, card: Card }) => (getCardData(card).updateResourcePoints || ((points) => points))(currentVictoryPoints, player)
    }],
    hands: [[[], []] as HandTuple, {
      playCard: (currentHandTuple: HandTuple, { player, card }: { player: Player, card: Card }) => currentHandTuple[player].filter((handCard) => handCard !== card),
      drawCard: (currentHandTuple: HandTuple, { player, card }: { player: Player, card: Card }) => currentHandTuple.map((hand, index) => index === player ? [...hand, card] : hand)
    }],
    decks: [[[], []] as HandTuple, {
      drawCard: (currentDeckTuple: DeckTuple, { player, card }: { player: Player, card: Card }) => currentDeckTuple[player].filter((handCard) => handCard !== card)
    }]
  }),
  activeTurn: [Player.One, {
    resetGame: () => Player.One,
    playCard: (_, { player }: { player: Player }) => getOpponent(player)
  }]
})
