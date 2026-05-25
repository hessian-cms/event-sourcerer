import { GenericPromiseFunction, Mutex } from "@event-sourcerer/mutex";
import { EventSourcererError } from "./errors";

export type JSONValue =
    | string
    | number
    | boolean
    | null
    | { [key: string]: JSONValue }
    | Array<JSONValue>;

// eslint-disable-next-line
type EnsureJSONArgs<Args extends any[]> = {
    [K in keyof Args]: Args[K] extends JSONValue ? Args[K] : JSONValue;
};

export type EventEntry = { eventName: string, time: number, input: JSONValue }
export type EventSourcerer = Awaited<ReturnType<typeof eventSourcerer>>;

export async function eventSourcerer(chain: Array<EventEntry> = []) {
    const mutex = new Mutex();
    // eslint-disable-next-line
    const events: Record<string, Function> = {};
    const eventChain: Array<EventEntry> = chain;

    async function mountEvent<
        // eslint-disable-next-line
        Args extends any[],
        R extends Promise<JSONValue>
    >(
        fn: (...params: EnsureJSONArgs<Args>) => R
    ): Promise<(...params: EnsureJSONArgs<Args>) => R> {
        if (!fn.name) {
            throw new EventSourcererError(`Event function must have a name. No anonymous functions allowed.`);
        }

        if (events[fn.name]) {
            throw new EventSourcererError(`Event with name ${fn.name} is already mounted.`);
        }

        events[fn.name] = fn;

        async function wrapper(...params: EnsureJSONArgs<Args>):Promise<JSONValue> {
            eventChain.push({
                eventName: fn.name,
                time: Date.now(),
                input: params
            })
            return await fn(...params);
        }

        return mutex.lock(wrapper as GenericPromiseFunction) as (...params: EnsureJSONArgs<Args>) => R;
    }

    async function getEventChain(): Promise<EventEntry[]> {
        return eventChain;
    }

    async function build() {
        const chain = await getEventChain();
        for(const entry of chain) {
            const {eventName, input} =  entry;
            const fn = events[eventName];
            if(!fn) {
                throw new EventSourcererError(`Event function must '${eventName}' is not defined.`);
            }
            await fn(...input as JSONValue[]);
        }
    }

    return {
        mountEvent,
        getEventChain,
        build
    }
}