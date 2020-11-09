import { kea } from 'kea'

import {
  Background,
  Characters,
  IDialogProps,
  ISceneActions
} from './types'

export const SceneLogic = kea({
  // Boilerplate
  actions: (): ISceneActions => ({
    setBackground: (background) => ({ background }),
    setCharacters: (characters) => ({ characters }),
    setDialog: (dialog) => ({ dialog }),
    updateCharacters: (characters) => ({ characters }),
    updateDialog: (dialog) => ({ dialog }),
  }),
  reducers: () => ({
    background: [Background.Default, {
      setBackground: (_, { background }: { background: Background }) => background
    }],
    characters: [{}, {
      setCharacters: (_, { characters }: { characters: Characters }) => characters,
      updateCharacters: (currentCharacters: Characters, { characters }: { characters: Characters }) => ({ ...currentCharacters, ...characters })
    }],
    dialog: [{}, {
      setDialog: (_, { dialog }: { dialog: IDialogProps }) => dialog,
      updateDialog: (currentDialog: IDialogProps, { dialog }: { dialog: IDialogProps }) => ({ ...currentDialog, ...dialog })
    }]
  })
})
