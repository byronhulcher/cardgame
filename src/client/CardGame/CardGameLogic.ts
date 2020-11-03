import { kea } from 'kea'

import { getCardData } from './CardData'
import { getOpponent } from './utils'

import {
  Card,
  CardGameActions,
  DeckTuple,
  HandTuple,
  Player,
  ResourcePointsTuple,
  VictoryPointsTuple
} from './types'

export const CardGameLogic = kea({
  // Boilerplate
  actions: (): CardGameActions => ({
    harvestResources: (player: Player, modifier: number) => ({ player, modifier }),
    resetGame: () => null,
    startTurn: (player: Player) => ({ player }),
    playCard: (player: Player, card: Card) => ({ player, card }),
    drawCard: (player: Player, card: Card) => ({ player, card })
  }),
  // Here's each of our game states values from `GameState`, mapped to different Actions from `GameActions` which update them deterministicly
  reducers: () => ({
    resourcePoints: [[0, 0] as ResourcePointsTuple, {
      resetGame: () => [0, 0] as ResourcePointsTuple,
      playCard: (currentResourcePoints: ResourcePointsTuple, { player, card }: { player: Player, card: Card }) =>
        getCardData(card).updateResourcePoints(currentResourcePoints, player),
    }],
    victoryPoints: [[0, 0] as VictoryPointsTuple, {
      resetGame: () => [0, 0] as VictoryPointsTuple,
      playCard: (currentVictoryPoints: VictoryPointsTuple, { player, card }: { player: Player, card: Card }): VictoryPointsTuple =>
        getCardData(card).updateVictoryPoints(currentVictoryPoints, player),
      harvestResources: (currentVictoryPoints: VictoryPointsTuple, { player, modifier }: { player: Player, modifier: number }) =>
        currentVictoryPoints.map((points, index) => index === player ? points + modifier : points),
    }],
    hands: [[[], []] as HandTuple, {
      playCard: (currentHandTuple: HandTuple, { player, card }: { player: Player, card: Card }) =>
        currentHandTuple.map((hand, index) => index === player ? hand.filter((handCard) => handCard !== card) : hand),
      drawCard: (currentHandTuple: HandTuple, { player, card }: { player: Player, card: Card }) =>
        currentHandTuple.map((hand, index) => index === player ? [...hand, card] : hand),
    }],
    decks: [[[Card.Remove2R, Card.Sacrifice1RGain1V, Card.Sacrifice4RGain6R], []] as HandTuple, {
      drawCard: (currentDeckTuple: DeckTuple, { player, card }: { player: Player, card: Card }) =>
        currentDeckTuple.map((deck, index) => index === player ? deck.filter((deckCard) => deckCard !== card) : deck),
    }],
    activePlayer: [Player.One, {
      resetGame: () => Player.One,
      playCard: (_, { player }: { player: Player }) => getOpponent(player)
    }],
    lastHarvest: [null, {
      harvestResources: (_, { player }: { player: Player }) => player
    }]
  })
})
