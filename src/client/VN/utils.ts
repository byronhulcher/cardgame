export type ArgumentOf<F> = F extends (arg: infer T) => unknown ? T : never;
export type ArgumentsOf<F> = F extends (...args: infer T) => unknown ? T : never;

export type HasMethods<T> = { [k in keyof T]: (...args: ArgumentsOf<T[k]>) => void }

// General purpose assert function
// If before this, value had type `U`,
// afterwards the type will be `U & T`
export declare function assertIs<T>(value: unknown): asserts value is T
