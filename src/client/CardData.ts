import { getOpponent } from './utils'

export const CARD_DATA_LIBRARY: CardDataLibrary = {
  [Card.Gain1R]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, player, 1)
  },
  [Card.Remove2R]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, getOpponent(player), -1)
  },
  [Card.Sac1RGet1V]: {
    updateResourcePoints: (current, player) => updatePointsForPlayer(current, player, -1),
    updateVictoryPoints: (current, player) => updatePointsForPlayer(current, player, 1)
  }
}

export const getCardData: (cardName: Card) => CardDataWithName = (cardName) => ({ name: cardName, ...(CARD_DATA_LIBRARY[cardName]) })

const updatePointsForPlayer = (points: [number, number], player: Player, modifier: number) => {
  const newPoints = [...points]
  newPoints[player] += modifier
  return newPoints
}
