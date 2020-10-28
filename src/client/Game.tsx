import React from 'react'

import { useActions, useValues } from 'kea'

import {
  Board,
  Hand,
  Menu
} from './components'
import { GameLogic } from './GameLogic'

/* All the rendered components that we'll be showing to the player */
export const Game: React.FC = () => {
  const gameActions = useActions(GameLogic) as GameActions
  const gameState = useValues(GameLogic) as GameState

  return (
    <>
      <h1>Game </h1>
      <Board {...gameState} />
      <Hand
        player={Player.One}
        {...gameActions}
        {...gameState}
      />
      <Menu {...gameActions} />
    </>
  )
}
