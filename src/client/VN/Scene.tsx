import React from 'react'

import {
  useActions,
  useValues
} from 'kea'


import { SceneLogic } from './SceneLogic'
import {
  LogicActionQueueItem,
  useLogicActionQueue
} from './LogicActionQueue'
import {
  Background,
  CharacterPosition,
  Characters,
  CharacterSprite,
  IDialogProps,
  ISceneActions,
  ISceneValues
} from './types'


type IContinueBodyProps = {
  onContinue?(): void
}

const ContinueBody: React.FC<IContinueBodyProps> = ({
  children,
  onContinue
}) => {
  return (
    <div>
      <div>
        {children}
      </div>
      <div>
        <ul>
          <a onClick={onContinue}>
            <li>Continue</li>
          </a>
        </ul>
      </div>
    </div>
  )
}

interface ISceneProps {

}

export const Scene: React.FC<ISceneProps> = ({
}) => {
  const sceneActions = useActions(SceneLogic) as ISceneActions
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
        dialogBody: <ContinueBody>Hello</ContinueBody>
      } as IDialogProps]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogBody: <ContinueBody>I'm Bill</ContinueBody>
      } as IDialogProps]
    },
    {
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Left]: CharacterSprite.AliceLeft
      } as Characters]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Alice',
        dialogBody: <ContinueBody>And I'm Alice</ContinueBody>
      } as IDialogProps]
    },
  ]

  const {
    characters,
    dialogBody,
    dialogSpeaker
  } = useValues(SceneLogic) as ISceneValues

  const {
    push,
    pop
  } = useLogicActionQueue(sceneActions, sceneQueue)

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
