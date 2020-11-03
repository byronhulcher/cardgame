import { useState } from 'react'

import {
  ISceneActions
} from './types'

type SceneAction = {
  action: keyof ISceneActions
  args: any
}

type ISceneQueueActions = {
  push(sceneAction: SceneAction): void
  pop(): void
}

export class SceneQueue {
  queue: SceneAction[]
  actions: ISceneActions

  constructor(actions) {
    this.actions = actions
    this.queue = []
  }

  push(sceneAction: SceneAction) {
    this.queue = [...this.queue, sceneAction]
  }

  pop() {
    const [poppedAction, ...remainingQueue] = this.queue
    if (typeof poppedAction !== "undefined") {
      // @ts-ignore
      this.actions[poppedAction.action](...poppedAction.args)
    }
    this.queue = remainingQueue
  }
}

export const useSceneQueue = (actions: ISceneActions): ISceneQueueActions => {
  const [queue, setQueue] = useState<SceneAction[]>([])

  return {
    push: (sceneAction) => {
      setQueue([...queue, sceneAction])
    },
    pop: () => {
      const [poppedAction, ...remainingQueue] = queue
      if (typeof poppedAction !== "undefined") {
        // @ts-ignore
        actions[poppedAction.action](...poppedAction.args)
      }
      setQueue(remainingQueue)
    }
  }
}
