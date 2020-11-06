import {
  LogicActionQueueItem
} from './LogicActionQueue'
import {
  SceneQueue
} from './SceneQueue'
import {
  ISceneActions
} from './types'
import {
  ArgumentsOf
} from './utils'


export class SceneQueueManager {
  sceneQueue: SceneQueue
  actions: ISceneActions

  constructor(actions: ISceneActions) {
    this.actions = actions
    this.sceneQueue = new SceneQueue(actions)

    const actionKeys = (Object.keys(actions) as Array<keyof typeof actions>)

    actionKeys.forEach(
      (action) => {
        type arguments = ArgumentsOf<ISceneActions[typeof action]>
        SceneQueueManager.prototype[action] = (...args: arguments) => this.sceneQueue.push({ action, args } as LogicActionQueueItem<ISceneActions>)
      })
  }
}
