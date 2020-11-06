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
    setDialog: (dialog) => ({ dialog }),
    updateDialog: (dialog) => ({ dialog }),
  }),
  reducers: () => ({
    background: [null, {
      setBackground: (_, { background }: { background: Background }) => background
    }],
    characters: [{}, {
      setCharacter: (currentCharacters: Characters, { position, sprite }: { position: CharacterPosition, sprite: CharacterSprite }) => ({ ...currentCharacters, [position]: sprite }),
      setCharacters: (_, { characters }: { characters: Characters }) => characters,
      updateCharacters: (currentCharacters: Characters, { characters }: { characters: Characters }) => ({ ...currentCharacters, ...characters })
    }],
    dialog: [{}, {
      setDialog: (_, { dialog }: { dialog: IDialogProps }) => dialog,
      updateDialog: (currentDialog: IDialogProps, { dialog }: { dialog: IDialogProps }) => ({ ...currentDialog, ...dialog })
    }]
  })
})
