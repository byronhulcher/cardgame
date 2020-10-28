import React from 'react'

import { getCardData } from '../CardData'

const RenderedCard: React.FC<{ card: CardDataWithName, onClick: () => void }> = ({ card, onClick }) => (
  <div>
    <h4><a onClick={onClick}>{card.displayedName || card.name}</a></h4>
  </div>
)

export const Hand: React.FC<GameState & GameActions & { player: Player }> = ({
  drawCard,
  hands,
  player
}) => (
    <div>
      {
        hands[player].map((card: Card) =>
          (<RenderedCard card={getCardData(card)} onClick={() => drawCard(player, card)} />))
      }
    </div>
  )
