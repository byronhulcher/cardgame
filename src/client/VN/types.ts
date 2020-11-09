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

export type Characters = Partial<{
  [key in CharacterPosition]: CharacterSprite
}>

export type IDialogProps = Partial<{
  dialogBody: React.ReactNode
  dialogSpeaker: React.ReactNode
}>

export type ISceneValues = IDialogProps & {
  background: Background
  characters: Characters,
  dialog: IDialogProps
}

export type ISceneActions = {
  setBackground(background: Background)
  setCharacters(characters: Characters)
  updateCharacters(characters: Characters)
  setDialog(dialog: IDialogProps)
  updateDialog(dialog: IDialogProps)
}
