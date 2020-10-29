import React from 'react'

import { useActions, useAllValues } from 'kea'

import {
  Board,
  Hand,
  Instructions,
  Menu
} from './components'
import { GameLogic } from './GameLogic'
import {
  GameActions,
  GameState,
  Player
} from './types'

/* All the rendered components that we'll be showing to the player */
export const Game: React.FC = () => {
  const gameActions = useActions(GameLogic) as GameActions
  const gameState = useAllValues(GameLogic) as GameState
  console.log({ gameState })
  return (
    <>
      <h1>VN Card Game Prototype</h1>
      <div className="row-wrap">
        <div>
          <h2>Active Player: {Player[gameState.activePlayer]}</h2>
          <Board
            gameState={gameState}
          />
          <br />
          <Hand
            player={Player.One}
            gameActions={gameActions}
            gameState={gameState}
          />
          <br />
          <Menu
            gameActions={gameActions}
            gameState={gameState}
          />
        </div>
        <Instructions />
      </div>
    </>
  )
}
