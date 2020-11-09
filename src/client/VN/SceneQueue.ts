import autoBind from 'auto-bind'
import { useRef } from 'react'

import {
  LogicActionQueue,
  LogicActionQueueItem
} from './LogicActionQueue'
import { ISceneActions } from './types'
import {
  ArgumentOf
} from './utils'

const STOP_ACTIONS: (keyof ISceneActions)[] = ['setDialog', 'updateDialog']

export type MethodsWithTag<T> = { [k in keyof T]: (arg: ArgumentOf<T[k]>, tag?: string) => void }

export class SceneQueue extends LogicActionQueue<ISceneActions> {
  actions: MethodsWithTag<ISceneActions>

  constructor(logicActions: ISceneActions) {
    super(logicActions)

    this.actions = (Object.keys(logicActions) as Array<keyof ISceneActions>).reduce(
      (accumulator, action) => ({
        ...accumulator,
        [action]: (arg: ArgumentOf<ISceneActions[typeof action]>, tag?: string): void => {
          this.push({ action, args: [arg], tag } as LogicActionQueueItem<ISceneActions>)
        }
      }),
      {} as MethodsWithTag<ISceneActions>
    )

    autoBind(this)
  }

  popUntilStop(): void {
    while (this.queue.length > 0) {
      const popped = this.pop()
      if (STOP_ACTIONS.includes(popped.action)) {
        break
      }
    }
  }

  jumpToAndPopUntilStop(tag: string): void {
    this.jumpTo(tag)
    if (this.queue[0]?.tag === tag) {
      this.popUntilStop()
    }
  }
}

export const useSceneQueue = (actions: ISceneActions): InstanceType<typeof SceneQueue> => {
  const sceneQueue = new SceneQueue(actions)
  const sceneQueueRef = useRef(sceneQueue).current
  return sceneQueueRef
}
