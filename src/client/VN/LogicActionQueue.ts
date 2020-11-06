import { useRef } from 'react'

type ArgumentsOf<T> = T extends (...args: infer T) => any ? T : never;

export type LogicActionQueueItem<T> = {
  [K in keyof T]: {
    action: K,
    args: ArgumentsOf<T[K]>
  }
}[keyof T];

type LogicAction = {
  [key in string]: (...args: any[]) => any
}

export class LogicActionQueue<T extends LogicAction> {
  queue: LogicActionQueueItem<T>[]
  actions: T

  constructor(actions: T, queue: LogicActionQueueItem<T>[] = []) {
    this.actions = actions
    this.queue = queue
  }

  push(sceneAction: LogicActionQueueItem<T> | LogicActionQueueItem<T>[]) {
    this.queue = Array.isArray(sceneAction) ? [...this.queue, ...sceneAction] : [...this.queue, sceneAction]
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

export const useLogicActionQueue = <T extends LogicAction>(actions: T, queue: LogicActionQueueItem<T>[] = []) => {
  const sceneQueueRef = useRef(new LogicActionQueue(actions, queue))
  const {
    pop,
    push
  } = sceneQueueRef.current
  return {
    pop,
    push
  }
}
