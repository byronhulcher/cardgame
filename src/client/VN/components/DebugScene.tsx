import React from 'react'

import {
  Background,
  CharacterPosition,
  CharacterSprite,
  ISceneValues,
} from '../types'

export const DebugScene: React.FC<ISceneValues> = ({
  background,
  characters,
  dialog: {
    dialogBody,
    dialogSpeaker,
  },
}) => {
  return (
    <>
      <h2>Background: {Background[background]}</h2>
      <h2>Characters:</h2>
      <h3>
        <ul>
          {typeof characters[CharacterPosition.Left] !== "undefined" &&
            <li>Left: {CharacterSprite[characters[CharacterPosition.Left]]}</li>}
          {typeof characters[CharacterPosition.Center] !== "undefined" &&
            <li>Center: {CharacterSprite[characters[CharacterPosition.Center]]}</li>}
          {typeof characters[CharacterPosition.Right] !== "undefined" &&
            <li>Right: {CharacterSprite[characters[CharacterPosition.Right]]}</li>}
        </ul>
      </h3>
      <h2>Dialog:</h2>
      <ul>
        {typeof dialogSpeaker !== "undefined" && (
          <li>
            <h3>Speaker: {dialogSpeaker}</h3>
          </li>
        )}
        {typeof dialogBody !== "undefined" && (
          <li>
            <h3>Content:</h3>
            <div>{dialogBody}</div>
          </li>
        )}
      </ul>
    </>
  )
}
