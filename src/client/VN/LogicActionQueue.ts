import autoBind from 'auto-bind'

import { ArgumentsOf } from './utils'

export type LogicAction = {
  [key in string]: (...args: unknown[]) => void
}

export type LogicActionQueueItem<T extends LogicAction> = {
  [K in keyof T]: {
    action: K,
    args: ArgumentsOf<T[K]>
  }
}[keyof T];

export type TagQueueItem = {
  tag: string
}

type QueueItem<T extends LogicAction> = LogicActionQueueItem<T> | TagQueueItem

export function isLogicAction<T extends LogicAction>(queueItem: QueueItem<T>): queueItem is LogicActionQueueItem<T> {
  return (queueItem as LogicActionQueueItem<T>).action !== undefined;
}

export function isTag<T extends LogicAction>(queueItem: QueueItem<T>): queueItem is TagQueueItem {
  return (queueItem as TagQueueItem).tag !== undefined;
}

export class LogicActionQueue<T extends LogicAction> {
  queue: QueueItem<T>[]
  logicActions: T
  queueableActions: T

  constructor(logicActions: T, queue: QueueItem<T>[] = []) {
    this.logicActions = logicActions
    this.queue = queue

    this.queueableActions = (Object.keys(logicActions) as Array<keyof T>).reduce(
      (accumulator, action) => ({
        ...accumulator,
        [action]: (...args: [...ArgumentsOf<T[typeof action]>]): void => {
          this.push({ action, args } as LogicActionQueueItem<T>)
        }
      }),
      {} as T
    )

    autoBind(this)
  }

  push(sceneAction: QueueItem<T>): void {
    this.queue = [...this.queue, sceneAction]
  }

  tag(tag: string): void {
    this.push({ tag })
  }

  pop(): QueueItem<T> {
    const [poppedAction, ...remainingQueue] = this.queue
    if (typeof poppedAction !== "undefined") {
      if (isLogicAction(poppedAction)) {
        this.logicActions[poppedAction.action](...poppedAction.args)
      }
    }
    this.queue = remainingQueue
    return poppedAction
  }

  empty(): void {
    this.queue = []
  }

  set(queue: QueueItem<T>[]): void {
    this.queue = [...queue]
  }

  jumpTo(tag: string): boolean {
    const queueIndex = this.queue.findIndex((queueItem) => isTag(queueItem) && queueItem?.tag === tag)
    // return the remainder of the queue EXCLUDING the found item with the tag
    if (queueIndex >= 0) {
      this.queue = this.queue.slice(queueIndex + 1)
      return true
    }
    return false
  }
}
