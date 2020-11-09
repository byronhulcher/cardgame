import autoBind from 'auto-bind'

import { ArgumentsOf } from './utils'

type LogicAction = {
  [key in string]: (...args: unknown[]) => void
}

export type LogicActionQueueItem<T extends LogicAction> = {
  [K in keyof T]: {
    action: K,
    args: ArgumentsOf<T[K]>,
    tag?: string
  }
}[keyof T];

export class LogicActionQueue<T extends LogicAction> {
  queue: LogicActionQueueItem<T>[]
  logicActions: T

  constructor(logicActions: T, queue: LogicActionQueueItem<T>[] = []) {
    this.logicActions = logicActions
    this.queue = queue
    autoBind(this)
  }

  push(sceneAction: LogicActionQueueItem<T> | LogicActionQueueItem<T>[]): void {
    this.queue = Array.isArray(sceneAction) ? [...this.queue, ...sceneAction] : [...this.queue, sceneAction]
  }

  pop(): LogicActionQueueItem<T> {
    const [poppedAction, ...remainingQueue] = this.queue
    if (typeof poppedAction !== "undefined") {
      this.logicActions[poppedAction.action](...poppedAction.args)
    }
    this.queue = remainingQueue
    return poppedAction
  }

  empty(): void {
    this.queue = []
  }

  set(queue: LogicActionQueueItem<T>[]): void {
    this.queue = [...queue]
  }

  jumpTo(tag: string) {
    const queueIndex = this.queue.findIndex((queueItem) => queueItem?.tag === tag)
    if (queueIndex >= 0) {
      this.queue = this.queue.slice(queueIndex)
    }
  }
}
