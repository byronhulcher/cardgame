import React from 'react'

import { getCardData } from '../CardData'
import {
  Card,
  CardData,
  CardGameActions,
  CardGameState,
  Player,
} from '../types'

const RenderedCard: React.FC<{ cardData: CardData, disabled: boolean, onClick: () => void }> = ({
  cardData,
  disabled,
  onClick,
}) => (
  <div>
    <a
      className={`${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      {cardData.displayedName || Card[cardData.name]}
    </a>
  </div>
)

export const Hand: React.FC<{
  gameState: CardGameState,
  gameActions: CardGameActions,
  player: Player
}> = ({
  gameState,
  gameActions: {
    playCard,
  },
  player,
}) => {
  const {
    activePlayer,
    hands,
  } = gameState
  return (
    <div>
      <h3>Your hand</h3>
      <h4>
        <ul>
          {[
            ...hands[player],
            Card.Gain1R,
          ].map((card, index) => {
            const cardData = getCardData(card)
            return (
              <li key={`card-${index}`}>
                <RenderedCard
                  cardData={cardData}
                  disabled={!(activePlayer == player && cardData.condition(gameState))}
                  onClick={() => playCard(player, card)}
                />
              </li>
            )
          })}
        </ul>
      </h4>
    </div>
  )
}
