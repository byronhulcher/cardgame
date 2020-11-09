import React, { useEffect } from 'react'

import {
  useActions,
  useValues
} from 'kea'
import {
  Link,
} from "react-router-dom";

import { SceneLogic } from './SceneLogic'
import { useSceneQueue } from './SceneQueue'
import { stageTestScene } from './TestSceneWithManager'
import {
  Background,
  CharacterPosition,
  CharacterSprite,
  ISceneActions,
  ISceneValues
} from './types'

export const Scene: React.FC = () => {
  const sceneActions = useActions(SceneLogic) as ISceneActions

  const {
    background,
    characters,
    dialog: {
      dialogBody,
      dialogSpeaker
    }
  } = useValues(SceneLogic) as ISceneValues

  const sceneQueue = useSceneQueue(sceneActions)

  const {
    empty,
    popUntilStop,
  } = sceneQueue

  const restartScene = () => {
    empty()
    stageTestScene(sceneQueue)
    popUntilStop()
  }

  useEffect(restartScene, [])

  return (
    <>
      <h1>VN Prototype</h1>
      <h2>Background: {Background[background]}</h2>
      <h2>Characters:</h2>
      <h3>
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
      </h3>
      <h2>Dialog:</h2>
      <ul>
        {typeof dialogSpeaker !== "undefined" &&
          <li>
            <h3>Speaker: {dialogSpeaker}</h3>
          </li>
        }
        {typeof dialogBody !== "undefined" &&
          <li>
            <h3>Content:</h3>
            <div>{dialogBody}</div>
          </li>
        }
      </ul>
      <h2>Menu</h2>
      <h3>
        <ul>
          <a onClick={restartScene}><li>Reset</li></a>
          <Link to="/"><li>Main Menu</li></Link>
        </ul>
      </h3>
    </>
  )
}
