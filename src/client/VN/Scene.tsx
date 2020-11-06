import React, { useEffect } from 'react'

import {
  useActions,
  useValues
} from 'kea'

import { SceneLogic } from './SceneLogic'
import { useSceneQueue } from './SceneQueue'
import { getTestScene } from './TestScene'
import {
  CharacterPosition,
  CharacterSprite,
  ISceneActions,
  ISceneValues
} from './types'

interface ISceneProps {
}

export const Scene: React.FC<ISceneProps> = ({
}) => {
  const sceneActions = useActions(SceneLogic) as ISceneActions

  const {
    characters,
    dialog: {
      dialogBody,
      dialogSpeaker
    }
  } = useValues(SceneLogic) as ISceneValues

  const sceneQueue = useSceneQueue(sceneActions)

  const {
    popUntilStop,
    set
  } = sceneQueue

  const scene = getTestScene(sceneQueue)

  const restartScene = () => {
    set(scene)
    popUntilStop()
  }

  useEffect(restartScene, [])

  return (
    <>
      <h1>Card Game Prototype</h1>
      <h2>Characters</h2>
      <ul>
        {typeof characters[CharacterPosition.Left] !== "undefined" &&
          <li>Left: {CharacterSprite[characters[CharacterPosition.Left]]}</li>
        }
        {typeof characters[CharacterPosition.Center] !== "undefined" &&
          <li>Center: {CharacterSprite[characters[CharacterPosition.Center]]}</li>
        }
        {typeof characters[CharacterPosition.Right] !== "undefined" &&
          <li>Right: {CharacterSprite[characters[CharacterPosition.Right]]}</li>
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
      <h2>Menu</h2>
      <h3>
        <ul>
          <a onClick={restartScene}>
            <li>
              Reset
            </li>
          </a>
        </ul>
      </h3>
    </>
  )
}
