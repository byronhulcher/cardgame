import React from 'react'

import {
  ChoiceBody,
  ContinueBody
} from './components'
import {
  Background,
  CharacterPosition,
  Characters,
  CharacterSprite,
  IDialogProps,
} from './types'
import { SceneQueueManager } from './SceneQueueManager'

export const getTestScene = (sceneQueueManager: InstanceType<typeof SceneQueueManager>): void => {
  const {
    sceneQueue: {
      popUntilStop,
      jumpToAndPopUntilStop
    },
    setBackground,
    setCharacters,
    setDialog,
    updateCharacters,
    updateDialog
  } = sceneQueueManager

  setBackground(Background.Outside)
  setCharacters({
    [CharacterPosition.Right]: CharacterSprite.BillLeft
  } as Characters)
  setDialog({
    dialogSpeaker: 'Bill',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>Hello</ContinueBody>)
  } as IDialogProps)
  updateDialog({
    dialogBody: (<ContinueBody onContinue={popUntilStop}>I&aspos;m Bill</ContinueBody>)
  } as IDialogProps)
  updateCharacters({
    [CharacterPosition.Left]: CharacterSprite.AliceRight
  } as Characters)
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>And I&aspos;m Alice</ContinueBody>)
  } as IDialogProps)
  setDialog({
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
  } as IDialogProps)

  setCharacters({
    [CharacterPosition.Left]: CharacterSprite.AliceRight
  } as Characters, "ALICE_OPTION")
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my special dialog</ContinueBody>)
  } as IDialogProps)
  updateDialog({
    dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the right choice</ContinueBody>)
  } as IDialogProps)
  setCharacters({
    [CharacterPosition.Left]: CharacterSprite.AliceRight
  } as Characters, "ALICE_OPTION")
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my special dialog</ContinueBody>)
  } as IDialogProps)
  updateDialog({
    dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the right choice</ContinueBody>)
  } as IDialogProps)

  setCharacters({
    [CharacterPosition.Right]: CharacterSprite.BillLeft
  } as Characters, "BILL_OPTION")
  setDialog({
    dialogSpeaker: 'Bill',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my unique dialog</ContinueBody>)
  } as IDialogProps)
  updateDialog({
    dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the correct choice</ContinueBody>)
  } as IDialogProps)

  setCharacters({
    [CharacterPosition.Left]: CharacterSprite.AliceRight,
    [CharacterPosition.Right]: CharacterSprite.BillLeft
  } as Characters, "AFTER_CHOICE")
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: (<ContinueBody onContinue={popUntilStop}>We hope you are satisfied with your decision</ContinueBody>)
  } as IDialogProps)
  updateDialog({
    dialogSpeaker: 'Bill',
    dialogBody: 'Branching dialog is the key to replayability'
  } as IDialogProps)
}
