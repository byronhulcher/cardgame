export type ArgumentsOf<T> = T extends (...args: infer T) => unknown ? T : never;
