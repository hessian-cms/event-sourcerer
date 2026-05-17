/**
 * A simple mutex implementation for synchronizing asynchronous operations.
 */
export class Mutex {
    constructor(private withResolver: PromiseWithResolvers<void> = Promise.withResolvers<void>()) {
        withResolver.resolve();
    }

    /**
     * Acquires a lock on the mutex, executes the provided asynchronous function, and releases the lock once the function completes.
     * @param fn 
     * @returns 
     */
    lock<T extends (...params: Parameters<T>) => Promise<Awaited<ReturnType<T>>>>(fn: T): T {
        return (async (...params: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
            const localPromise = this.withResolver.promise;
            const { resolve } = this.withResolver = Promise.withResolvers<void>();
            await localPromise;
            try {
                const result = await fn(...params);
                return result;
            } finally {
                resolve();
            }
        }) as T;
    }
}