import React from 'react'

import {
  ChoiceBody,
  ContinueBody,
  TypingBody,
} from './components'
import { SceneQueue } from './SceneQueue'
import {
  Background,
  CharacterPosition,
  CharacterSprite,
} from './types'

export const stageTestScene = (sceneQueue: InstanceType<typeof SceneQueue>): void => {
  const {
    popUntilStop,
    jumpToAndPopUntilStop,
    queueableActions: {
      setBackground,
      setCharacters,
      setDialog,
      updateCharacters,
      updateDialog,
    },
    tag,
  } = sceneQueue

  setBackground(Background.Outside)
  setCharacters({ [CharacterPosition.Right]: CharacterSprite.BillLeft })
  // setDialog({
  //   dialogSpeaker: 'Bill',
  //   dialogBody: (<ContinueBody onContinue={popUntilStop}>Hello</ContinueBody>),
  // })
  setDialog({
    dialogSpeaker: 'Bill',
    dialogBody: <TypingBody
      choices={[]}
    >
      Hello
    </TypingBody>
    ,
  })
  updateDialog({ dialogBody: <ContinueBody onContinue={popUntilStop}>I&aspos;m Bill</ContinueBody> })
  updateCharacters({ [CharacterPosition.Left]: CharacterSprite.AliceRight })
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: <ContinueBody onContinue={popUntilStop}>And I&aspos;m Alice</ContinueBody>,
  })
  setDialog({ dialogBody:
  <ChoiceBody
    choices={[
      {
        content: 'Talk to Alice',
        onClick: () => jumpToAndPopUntilStop('ALICE_OPTION'),
      },
      {
        content: 'Talk to Bill',
        onClick: () => jumpToAndPopUntilStop('BILL_OPTION'),
      },
    ]}
  >
    Now you have to choose:
  </ChoiceBody> })

  tag("ALICE_OPTION")
  setCharacters({ [CharacterPosition.Left]: CharacterSprite.AliceRight })
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: <ContinueBody onContinue={popUntilStop}>This is my special dialog</ContinueBody>,
  })
  updateDialog({ dialogBody: <ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the right choice</ContinueBody> })

  tag("BILL_OPTION")
  setCharacters({ [CharacterPosition.Right]: CharacterSprite.BillLeft })
  setDialog({
    dialogSpeaker: 'Bill',
    dialogBody: <ContinueBody onContinue={popUntilStop}>This is my unique dialog</ContinueBody>,
  })
  updateDialog({ dialogBody: <ContinueBody onContinue={() => jumpToAndPopUntilStop('AFTER_CHOICE')}>You made the correct choice</ContinueBody> })

  tag("AFTER_CHOICE")
  setCharacters({
    [CharacterPosition.Left]: CharacterSprite.AliceRight,
    [CharacterPosition.Right]: CharacterSprite.BillLeft,
  })
  setDialog({
    dialogSpeaker: 'Alice',
    dialogBody: <ContinueBody onContinue={popUntilStop}>We hope you are satisfied with your decision</ContinueBody>,
  })
  updateDialog({
    dialogSpeaker: 'Bill',
    dialogBody: 'Branching dialog is the key to replayability',
  })
}
