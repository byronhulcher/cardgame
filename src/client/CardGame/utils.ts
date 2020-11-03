import { Player } from './types'

export const getOpponent = (player: Player) => player === Player.One ? Player.Two : Player.One
