import React from 'react'

import {
  Link,
} from "react-router-dom";

import {
  Card,
  CardGameActions,
  CardGameState,
  Player
} from '../types'

export const Menu: React.FC<{
  gameState: CardGameState,
  gameActions: CardGameActions
}> = ({
  gameState: {
    activePlayer,
    decks,
    lastHarvest,
    resourcePoints
  },
  gameActions: {
    harvestResources,
    drawCard,
    playCard,
    resetGame
  }
}) => (
      <div>
        <h2>Menu</h2>
        <h3>
          <ul>
            <li>
              <a
                className={decks[Player.One].length <= 0 ? 'disabled' : ''}
                onClick={() => decks[Player.One].length <= 0 ? undefined : drawCard(Player.One, decks[Player.One][0])}
              >
                Draw from your deck: ({decks[Player.One].length})
              </a>
            </li>
            <li>
              <a
                className={activePlayer === lastHarvest ? 'disabled' : ''}
                onClick={() => activePlayer === lastHarvest ? undefined : harvestResources(activePlayer, resourcePoints[activePlayer])}
              >
                Harvest Active Player's Resources
              </a>
            </li>
            <li>
              <a
                className={activePlayer === Player.Two ? '' : 'disabled'}
                onClick={() => activePlayer === Player.Two ? playCard(Player.Two, Card.Gain1R) : undefined}
              >
                Opponent takes turn
              </a>
            </li>
            <li><a onClick={resetGame}>Reset Game</a></li>
            <li><Link to="/">Main Menu</Link></li>
          </ul>
        </h3>
      </div >
    )
