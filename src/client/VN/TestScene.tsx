import React from 'react'

import {
  ChoiceBody,
  ContinueBody
} from './components'
import { LogicActionQueueItem } from './LogicActionQueue'
import {
  Background,
  CharacterPosition,
  CharacterSprite,
  ISceneActions,
} from './types'
import { SceneQueue } from './SceneQueue'

export const getTestScene = ({
  jumpToAndPopUntilStop,
  popUntilStop
}: SceneQueue): LogicActionQueueItem<ISceneActions>[] => {
  return [
    {
      action: 'setBackground',
      args: [Background.Outside]
    },
    {
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Right]: CharacterSprite.BillLeft
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Bill',
        dialogBody: <ContinueBody onContinue={popUntilStop}>Hello</ContinueBody>
      }]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogBody: <ContinueBody onContinue={popUntilStop}>I&apos;m Bill</ContinueBody>
      }]
    },
    {
      action: 'updateCharacters',
      args: [{
        [CharacterPosition.Left]: CharacterSprite.AliceRight
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Alice',
        dialogBody: (<ContinueBody onContinue={popUntilStop}>And I&apos;m Alice</ContinueBody>)
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogBody: (
          <
            ChoiceBody
            choices={[
              {
                content: 'Talk to Alice',
                onClick: () => jumpToAndPopUntilStop('ALICE_OPTION')
              },
              {
                content: 'Talk to Bill',
                onClick: () => jumpToAndPopUntilStop('BILL_OPTION')
              }
            ]}
          >
            Now you have to choose:
          </ChoiceBody>
        )
      }]
    },
    {
      tag: 'ALICE_OPTION',
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Left]: CharacterSprite.AliceRight
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Alice',
        dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my special dialog</ContinueBody>)
      }]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the right choice</ContinueBody>)
      }]
    },
    {
      tag: 'BILL_OPTION',
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Right]: CharacterSprite.BillLeft
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Bill',
        dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my unique dialog</ContinueBody>)
      }]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the correct choice</ContinueBody>)
      }]
    },
    {
      tag: 'AFTER_CHOICE',
      action: 'setCharacters',
      args: [{
        [CharacterPosition.Left]: CharacterSprite.AliceRight,
        [CharacterPosition.Right]: CharacterSprite.BillLeft
      }]
    },
    {
      action: 'setDialog',
      args: [{
        dialogSpeaker: 'Alice',
        dialogBody: (<ContinueBody onContinue={popUntilStop}>We hope you are satisfied with your decision</ContinueBody>)
      }]
    },
    {
      action: 'updateDialog',
      args: [{
        dialogSpeaker: 'Bill',
        dialogBody: 'Branching dialog is the key to replayability'
      }]
    },
  ]
}
