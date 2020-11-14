import React from 'react'

export const Instructions: React.FC = () => (
  <div>
    <h3>Instructions</h3>
    <ul>
      <li>Pool of resource points, up to 6</li>
      <li>Pool of victory points, up to 10</li>
      <br />
      <li>When a player has accrued 10 victory points, they win.</li>
      <br />
      <li>At beginning of game each player is given 3 cards from their deck.</li>
      <br />
      <li>At the beginning of a player&apos;s turn, they get one victory point for every resource point.</li>
      <li>After that, if they have less than 3 cards they draw from a pile.</li>
      <br />
      <li>On the player&apos;s turn they can play a card, and enact its effect.</li>
      <li>Some cards have conditions or costs required to play them.</li>
      <li>If a player cannot play a card they may add a resource point.</li>
      <br />
      <li>Then the next player&apos;s turn begins.</li>
    </ul>
  </div>
)
