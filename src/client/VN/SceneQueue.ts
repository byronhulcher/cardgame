import { useRef } from 'react'

import {
  LogicActionQueue,
  LogicActionQueueItem
} from './LogicActionQueue'
import {
  ISceneActions
} from './types'

const STOP_ACTIONS: (keyof ISceneActions)[] = ['setDialog', 'updateDialog']

export class SceneQueue extends LogicActionQueue<ISceneActions> {
  popUntilStop() {
    while (this.queue.length > 0) {
      const popped = this.pop()
      if (STOP_ACTIONS.includes(popped.action)) {
        break
      }
    }
  }
}

export const useSceneQueue = (actions: ISceneActions, queue: LogicActionQueueItem<ISceneActions>[] = []) => {
  const sceneQueue = new SceneQueue(actions, queue)
  const sceneQueueRef = useRef(sceneQueue).current
  return sceneQueueRef
}
