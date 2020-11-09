import autoBind from 'auto-bind'

import { LogicActionQueueItem } from './LogicActionQueue'
import { SceneQueue } from './SceneQueue'
import { ISceneActions } from './types'
import {
  assertIs,
} from './utils'

export type ArgumentOf<F> = F extends (arg: infer T) => unknown ? T : never;
export type HasMethodsWithTag<T> = { [k in keyof T]: (arg: ArgumentOf<T[k]>, tag?: string) => void }

class _SceneQueueManager {
  sceneQueue: SceneQueue

  constructor(actions: ISceneActions) {
    assertIs<HasMethodsWithTag<ISceneActions>>(this)

    this.sceneQueue = new SceneQueue(actions)
    const actionKeys = (Object.keys(actions) as Array<keyof typeof actions>)
    actionKeys.forEach(
      (action) => {
        _SceneQueueManager.prototype[action] =
          (arg: ArgumentOf<ISceneActions[typeof action]>, tag?: string): void => {
            this.sceneQueue.push({ action, args: [arg], tag } as LogicActionQueueItem<ISceneActions>)
          }
      })

    autoBind(this)
  }

}

export const SceneQueueManager = _SceneQueueManager as _SceneQueueManager & { new(): _SceneQueueManager & HasMethodsWithTag<ISceneActions> }
