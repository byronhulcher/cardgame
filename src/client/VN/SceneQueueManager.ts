import autoBind from 'auto-bind'

import { LogicActionQueueItem } from './LogicActionQueue'
import { SceneQueue } from './SceneQueue'
import { ISceneActions } from './types'
import { ArgumentsOf } from './utils'

export class SceneQueueManager {
  sceneQueue: SceneQueue

  constructor(actions: ISceneActions) {
    this.sceneQueue = new SceneQueue(actions)
    const actionKeys = (Object.keys(actions) as Array<keyof typeof actions>)

    actionKeys.forEach(
      (action) => {
        SceneQueueManager.prototype[action] =
          (...args: ArgumentsOf<ISceneActions[typeof action]>) =>
            this.sceneQueue.push({ action, args } as LogicActionQueueItem<ISceneActions>)
      })

    autoBind(this)
  }
}
