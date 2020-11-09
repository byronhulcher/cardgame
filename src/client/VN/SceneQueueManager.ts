import autoBind from 'auto-bind'

import { LogicActionQueueItem } from './LogicActionQueue'
import { SceneQueue } from './SceneQueue'
import { ISceneActions } from './types'
import {
  assertIs,
  ArgumentsOf
} from './utils'

export type ArgumentsOfWithTag<F> = F extends (...args) => unknown ? [...ArgumentsOf<F>, string?] : never;
export type HasMethodsWithTag<T> = { [k in keyof T]: (...args: ArgumentsOfWithTag<T[k]>) => void }

class _SceneQueueManager {
  sceneQueue: SceneQueue

  constructor(actions: ISceneActions) {
    assertIs<HasMethodsWithTag<ISceneActions>>(this)

    this.sceneQueue = new SceneQueue(actions)
    const actionKeys = (Object.keys(actions) as Array<keyof typeof actions>)
    actionKeys.forEach(
      (action) => {
        _SceneQueueManager.prototype[action] =
          (...args: [...ArgumentsOfWithTag<ISceneActions[typeof action]>]): void => {
            const lastArg = args[args.length - 1]
            const lastArgIsTag = typeof lastArg === "string"
            const argsWithoutTag = (lastArgIsTag ? args.slice(0, -1) : args) as ArgumentsOf<ISceneActions[typeof action]>
            const tag = lastArgIsTag ? lastArg : undefined
            this.sceneQueue.push({ action, args: argsWithoutTag, tag: tag } as LogicActionQueueItem<ISceneActions>)
          }
      })

    autoBind(this)
  }

}

export const SceneQueueManager = _SceneQueueManager as _SceneQueueManager & { new(): _SceneQueueManager & HasMethodsWithTag<ISceneActions> }
