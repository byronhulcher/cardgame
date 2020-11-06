import autoBind from 'auto-bind'

type ArgumentsOf<T> = T extends (...args: infer T) => any ? T : never;

type LogicAction = {
  [key in string]: (...args: any[]) => any
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
  actions: T

  constructor(actions: T, queue: LogicActionQueueItem<T>[] = []) {
    this.actions = actions
    this.queue = queue
    autoBind(this)
  }

  push(sceneAction: LogicActionQueueItem<T> | LogicActionQueueItem<T>[]): void {
    this.queue = Array.isArray(sceneAction) ? [...this.queue, ...sceneAction] : [...this.queue, sceneAction]
  }

  pop(): LogicActionQueueItem<T> {
    const [poppedAction, ...remainingQueue] = this.queue
    if (typeof poppedAction !== "undefined") {
      // @ts-ignore
      this.actions[poppedAction.action](...poppedAction.args)
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
