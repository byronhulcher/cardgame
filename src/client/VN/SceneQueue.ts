import { useRef } from 'react'

import {
  LogicActionQueue,
  isLogicAction,
} from './LogicActionQueue'
import { ISceneActions } from './types'
import {
  ArgumentOf
} from './utils'

const STOP_ACTIONS: (keyof ISceneActions)[] = ['setDialog', 'updateDialog']

export type MethodsWithTag<T> = { [k in keyof T]: (arg: ArgumentOf<T[k]>, tag?: string) => void }

export class SceneQueue extends LogicActionQueue<ISceneActions> {
  popUntilStop(): void {
    while (this.queue.length > 0) {
      const popped = this.pop()
      if (isLogicAction(popped) && STOP_ACTIONS.includes(popped.action)) {
        break
      }
    }
  }

  jumpToAndPopUntilStop(tag: string): void {
    if (this.jumpTo(tag)) {
      this.popUntilStop()
    }
  }
}

export const useSceneQueue = (actions: ISceneActions): InstanceType<typeof SceneQueue> => {
  const sceneQueue = new SceneQueue(actions)
  const sceneQueueRef = useRef(sceneQueue).current
  return sceneQueueRef
}
