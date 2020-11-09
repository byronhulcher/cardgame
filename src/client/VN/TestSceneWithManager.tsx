import React from 'react'

import {
  ChoiceBody,
  ContinueBody
} from './components'
import { LogicActionQueueItem } from './LogicActionQueue'
import {
  Background,
  CharacterPosition,
  Characters,
  CharacterSprite,
  IDialogProps,
  ISceneActions,
} from './types'
import { SceneQueue } from './SceneQueue'
import { SceneQueueManager } from './SceneQueueManager'

export const getTestScene = (sceneQueueManager: InstanceType<typeof SceneQueueManager>): void => {
  sceneQueueManager.setBackground(Background.Outside)
  sceneQueueManager.setBackground(Background.Outside, "with tag")
  //   const sceneQueue: LogicActionQueueItem<ISceneActions>[] = [
  //   {
  //     action: 'setBackground',
  //     args: [Background.Outside]
  //   },
  //   {
  //     action: 'setCharacters',
  //     args: [{
  //       [CharacterPosition.Right]: CharacterSprite.BillLeft
  //     } as Characters]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogSpeaker: 'Bill',
  //       dialogBody: <ContinueBody onContinue={popUntilStop}>Hello</ContinueBody>
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'updateDialog',
  //     args: [{
  //       dialogBody: <ContinueBody onContinue={popUntilStop}>I'm Bill</ContinueBody>
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'updateCharacters',
  //     args: [{
  //       [CharacterPosition.Left]: CharacterSprite.AliceRight
  //     } as Characters]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogSpeaker: 'Alice',
  //       dialogBody: (<ContinueBody onContinue={popUntilStop}>And I'm Alice</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogBody: (
  //         <
  //           ChoiceBody
  //           choices={[
  //             {
  //               content: 'Talk to Alice',
  //               onClick: () => jumpToAndPopUntilStop('ALICE_OPTION')
  //             },
  //             {
  //               content: 'Talk to Bill',
  //               onClick: () => jumpToAndPopUntilStop('BILL_OPTION')
  //             }
  //           ]}
  //         >
  //           Now you have to choose:
  //         </ChoiceBody>
  //       )
  //     } as IDialogProps]
  //   },
  //   {
  //     tag: 'ALICE_OPTION',
  //     action: 'setCharacters',
  //     args: [{
  //       [CharacterPosition.Left]: CharacterSprite.AliceRight
  //     } as Characters]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogSpeaker: 'Alice',
  //       dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my special dialog</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'updateDialog',
  //     args: [{
  //       dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the right choice</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     tag: 'BILL_OPTION',
  //     action: 'setCharacters',
  //     args: [{
  //       [CharacterPosition.Right]: CharacterSprite.BillLeft
  //     } as Characters]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogSpeaker: 'Bill',
  //       dialogBody: (<ContinueBody onContinue={popUntilStop}>This is my unique dialog</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'updateDialog',
  //     args: [{
  //       dialogBody: (<ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the correct choice</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     tag: 'AFTER_CHOICE',
  //     action: 'setCharacters',
  //     args: [{
  //       [CharacterPosition.Left]: CharacterSprite.AliceRight,
  //       [CharacterPosition.Right]: CharacterSprite.BillLeft
  //     } as Characters]
  //   },
  //   {
  //     action: 'setDialog',
  //     args: [{
  //       dialogSpeaker: 'Alice',
  //       dialogBody: (<ContinueBody onContinue={popUntilStop}>We hope you are satisfied with your decision</ContinueBody>)
  //     } as IDialogProps]
  //   },
  //   {
  //     action: 'updateDialog',
  //     args: [{
  //       dialogSpeaker: 'Bill',
  //       dialogBody: 'Branching dialog is the key to replayability'
  //     } as IDialogProps]
  //   },
  // ]
}
