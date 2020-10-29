import React from 'react'

import { useActions, useAllValues } from 'kea'

import {
  Board,
  Hand,
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
      <h1>Card Game</h1>
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
    </>
  )
}
