export type ArgumentsOf<T> = T extends (...args: infer T) => unknown ? T : never;

export type HasMethods<T> = { [k in keyof T]: (...args: ArgumentsOf<T[k]>) => void }

// General purpose assert function
// If before this, value had type `U`,
// afterwards the type will be `U & T`
export declare function assertIs<T>(value: unknown): asserts value is T
