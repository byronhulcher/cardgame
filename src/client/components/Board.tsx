import React from 'react'

const Points: React.FC<{ name: string, symbol: string, points: number }> = ({ name, symbol, points }) => (<h3>{name} Points: {Array(points).map(() => (<>{symbol}</>))} </h3>)
const VictoryPoints: React.FC<{ points: number }> = (props) => (<Points name="Victory" symbol="☀" {...props} />)
const ResourcePoints: React.FC<{ points: number }> = (props) => (<Points name="Resource" symbol="🔋" {...props} />)

export const Board: React.FC<GameState> = ({
  resourcePoints,
  victoryPoints
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
