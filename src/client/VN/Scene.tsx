import React, { useRef, useEffect } from 'react'

import {
  useActions,
  useValues
} from 'kea'

import { ContinueBody } from './ContinueBody'
import { LogicActionQueueItem } from './LogicActionQueue'
import {
  Background,
  CharacterPosition,
  Characters,
  CharacterSprite,
  IDialogProps,
  ISceneActions,
  ISceneValues
} from './types'
import { SceneLogic } from './SceneLogic'
import { useSceneQueue } from './SceneQueue'

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

  const {
    queue,
    popUntilStop,
    set
  } = useSceneQueue(sceneActions)

  const sceneQueue: LogicActionQueueItem<ISceneActions>[] = [
    {
      action: 'setBackground',
      args: [Background.Outside]
    },
    {
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Right]: CharacterSprite.BillLeft
      } as Characters]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Bill',
        dialogBody: <ContinueBody onContinue={popUntilStop}>Hello</ContinueBody>
      } as IDialogProps]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogBody: <ContinueBody onContinue={popUntilStop}>I'm Bill</ContinueBody>
      } as IDialogProps]
    },
    {
      action: 'updateCharacters',
      args: [{
        [CharacterPosition.Left]: CharacterSprite.AliceRight
      } as Characters]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Alice',
        dialogBody: 'And I\'m Alice'
      } as IDialogProps]
    },
  ]

  const restartScene = () => {
    set(sceneQueue)
    popUntilStop()
  }

  useEffect(restartScene, [])
  console.log({ queue })
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
