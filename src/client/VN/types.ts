export enum BooleanFlags {
  GotKey
}

export type PlayerBooleanFlags = {
  [key in BooleanFlags]: boolean
}

export type Player = {
  flags: PlayerBooleanFlags
}

export enum Background {
  Default,
  Outside,
  Inside
}

export enum CharacterSprite {
  AliceLeft,
  AliceRight,
  BillLeft,
  BillRight
}

export enum CharacterPosition {
  Left,
  Center,
  Right
}

export type Characters = {
  [key in CharacterPosition]?: CharacterSprite
}

export type ISceneValues = IDialogProps & {
  background: Background
  characters: Characters,

}

export type IDialogProps = {
  dialogBody?: React.ReactNode
  dialogSpeaker?: React.ReactNode
}

export type ISceneActions = {
  setBackground(background: Background)
  setCharacters(characters: Characters)
  updateCharacters(characters: Characters)
  setCharacter(position: CharacterPosition, sprite: CharacterSprite)
  setDialog(dialogProps: IDialogProps)
  updateDialog(dialogProps: IDialogProps)
}

type Parameters<T> = T extends (...args: infer T) => any ? T : never;
type ISceneActionsCloneToDemonstrateParameters = {
  [key in keyof ISceneActions]: (...args: Parameters<ISceneActions[key]>) => void
}
