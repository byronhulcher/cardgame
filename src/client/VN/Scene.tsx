import React from 'react'

import {
  useActions,
  useValues
} from 'kea'


import { SceneLogic } from './SceneLogic'
import { useSceneQueueRef } from './SceneQueue'
import {
  CharacterPosition,
  ISceneActions,
  ISceneValues
} from './types'

interface ISceneProps {

}

const Scene: React.FC<ISceneProps> = ({
}) => {
  const sceneActions = useActions(SceneLogic) as ISceneActions

  const {
    characters,
    dialogBody,
    dialogSpeaker
  } = useValues(SceneLogic) as ISceneValues

  return (
    <>
      <h1>Card Game Prototype</h1>
      <h2>Characters</h2>
      <ul>
        {typeof characters[CharacterPosition.Left] !== "undefined" &&
          <li>Left: {characters[CharacterPosition.Left].toString()}</li>
        }
        {typeof characters[CharacterPosition.Center] !== "undefined" &&
          <li>Center: {characters[CharacterPosition.Center].toString()}</li>
        }
        {typeof characters[CharacterPosition.Right] !== "undefined" &&
          <li>Right: {characters[CharacterPosition.Right].toString()}</li>
        }
      </ul>
      <h2>Dialog</h2>
      {typeof dialogSpeaker !== "undefined" &&
        <>
          <h3>Speaker</h3>
          <div>{dialogSpeaker}</div>
        </>
      }
      {typeof dialogBody !== "undefined" &&
        <>
          <h3>Body</h3>
          <div>{dialogBody}</div>
        </>
      }
    </>
  )
}
