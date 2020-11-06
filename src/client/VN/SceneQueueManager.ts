import autoBind from 'auto-bind'

import { LogicActionQueueItem } from './LogicActionQueue'
import { SceneQueue } from './SceneQueue'
import { ISceneActions } from './types'
import {
  assertIs,
  ArgumentsOf,
  HasMethods
} from './utils'

class _SceneQueueManager {
  sceneQueue: SceneQueue

  constructor(actions: ISceneActions) {
    assertIs<HasMethods<ISceneActions>>(this)

    this.sceneQueue = new SceneQueue(actions)
    const actionKeys = (Object.keys(actions) as Array<keyof typeof actions>)
    actionKeys.forEach(
      (action) => {
        _SceneQueueManager.prototype[action] =
          (...args: [...ArgumentsOf<ISceneActions[typeof action]>]): void =>
            this.sceneQueue.push({ action, args, } as LogicActionQueueItem<ISceneActions>)
      })

    autoBind(this)
  }

}

export const SceneQueueManager = _SceneQueueManager as _SceneQueueManager & { new(): _SceneQueueManager & HasMethods<ISceneActions> }
