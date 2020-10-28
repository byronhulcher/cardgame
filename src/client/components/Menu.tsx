import React from 'react'

export const Menu: React.FC<GameActions> = ({
  resetGame
}) => (
    <div>
      <h2>Menu</h2>
      <h3>
        <ul>
          <li><a onClick={resetGame}>Reset Game</a></li>
        </ul>
      </h3>
    </div>
  )
