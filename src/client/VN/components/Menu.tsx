import React from 'react'


import {
  Link,
} from "react-router-dom";

export const Menu: React.FC<{ restartScene: () => void }> = ({
  restartScene
}) => {
  return (
    <div>
      <h2>Menu</h2>
      <h3>
        <ul>
          <a onClick={restartScene}><li>Reset</li></a>
          <Link to="/"><li>Main Menu</li></Link>
        </ul>
      </h3>
    </div>
  )
}
