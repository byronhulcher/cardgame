import React from 'react'

import {
  CardGameState,
  Player,
} from '../types'

const Points: React.FC<{ name: string, symbol: string, points: number, max: number }> = ({
  name,
  symbol,
  points,
  max,
}) => <h3>{name} Points: {Array(points).fill(symbol).join("")}{Array(Math.max(max - points, 0)).fill("⬛").join("")} </h3>
const VictoryPoints: React.FC<{ points: number }> = (props) => (
  <Points name="Victory"
    symbol="🌞"
    {...props}
    max={10}
  />
)
const ResourcePoints: React.FC<{ points: number }> = (props) => (
  <Points name="Resource"
    symbol="🔋"
    {...props}
    max={6}
  />
)

export const Board: React.FC<{
  gameState: CardGameState
}> = ({
  gameState: {
    resourcePoints,
    victoryPoints,
  },
}) => (
  <div>
    <h2>Them </h2>
    <ResourcePoints points={resourcePoints[Player.Two]} />
    <VictoryPoints points={victoryPoints[Player.Two]} />
    <br />
    <h2>You </h2>
    <VictoryPoints points={victoryPoints[Player.One]} />
    <ResourcePoints points={resourcePoints[Player.One]} />
  </div>
)
