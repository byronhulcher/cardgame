import { kea } from 'kea'

import {
  Background,
  CharacterPosition,
  Characters,
  CharacterSprite,
  IDialogProps,
  ISceneActions
} from './types'

export const SceneLogic = kea({
  // Boilerplate
  actions: (): ISceneActions => ({
    setBackground: (background) => ({ background }),
    setCharacters: (characters) => ({ characters }),
    updateCharacters: (characters) => ({ characters }),
    setCharacter: (position, sprite) => ({ position, sprite }),
    setDialog: (dialogProps) => (dialogProps),
    updateDialog: (dialogProps) => (dialogProps),
  }),
  reducers: () => ({
    background: [undefined, {
      setBackground: (_, { background }: { background: Background }) => background
    }],
    characters: [{}, {
      setCharacter: (currentCharacters: Characters, { position, sprite }: { position: CharacterPosition, sprite: CharacterSprite }) => ({ ...currentCharacters, [position]: sprite }),
      setCharacters: (_, { characters }: { characters: Characters }) => characters,
      updateCharacters: (currentCharacters: Characters, { characters }: { characters: Characters }) => ({ ...currentCharacters, ...characters })
    }],
    dialogBody: [undefined, {
      setDialog: (_, { dialogBody }: IDialogProps) => dialogBody,
      updateDialog: (currentDialogBody: React.ReactNode | undefined, { dialogBody }: IDialogProps): React.ReactNode | undefined => typeof dialogBody === "undefined" ? currentDialogBody : dialogBody
    }],
    dialogSpeaker: [undefined, {
      setDialog: (_, { dialogSpeaker }: IDialogProps) => dialogSpeaker,
      updateDialog: (currentDialogSpeaker: React.ReactNode | undefined, { dialogSpeaker }: IDialogProps): React.ReactNode | undefined => typeof dialogSpeaker === "undefined" ? currentDialogSpeaker : dialogSpeaker
    }],
  })
})
