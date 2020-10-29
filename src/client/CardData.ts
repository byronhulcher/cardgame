import {
  Card,
  CardData,
  CardDataLibrary,
  ResourcePointsTuple,
  VictoryPointsTuple,
  Player,
  GameState
} from './types'
import { getOpponent } from './utils'

export const CARD_DATA_LIBRARY: CardDataLibrary = {
  [Card.Gain1R]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, player, 1)
  },
  [Card.Sac4RGet6R]: {
    condition: ({ activePlayer, resourcePoints }: GameState) => resourcePoints[activePlayer] >= 4,
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, player, 2)
  },
  [Card.Remove2R]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, getOpponent(player), -1)
  },
  [Card.Sac1RGet1V]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, player, -1),
    updateVictoryPoints: (current, player) => updatePointsForPlayer(current, player, 1)
  }
}

export const getCardData: (cardName: Card) => CardData = (cardName) => {
  const cardData = CARD_DATA_LIBRARY[cardName]
  return {
    name: cardName,
    ...cardData,
    updateResourcePoints: typeof cardData.updateResourcePoints === "undefined" ? ((points) => points) : cardData.updateResourcePoints,
    updateVictoryPoints: typeof cardData.updateVictoryPoints === "undefined" ? ((points) => points) : cardData.updateVictoryPoints,
    condition: typeof cardData.condition === "undefined" ? (() => true) : cardData.condition,
  } as CardData

}
const updatePointsForPlayer = <T extends ResourcePointsTuple | VictoryPointsTuple>(pointsTuple: T, player: Player, modifier: number): T =>
  pointsTuple.map((p, index) => player === index ? Math.max(0, p + modifier) : p) as T
