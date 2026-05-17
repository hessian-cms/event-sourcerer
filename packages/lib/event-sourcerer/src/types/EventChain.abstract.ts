import { Mutex } from "@event-sourcerer/mutex";
import { Event } from "./Event.type";

/**
 * The EventChain abstract class defines the structure for managing a chain of events. It provides methods for appending events, retrieving all events, and walking through the events with a callback function. The append and walk methods are protected by a mutex to ensure thread safety when modifying or accessing the event chain.
 */
export abstract class EventChain<T> {
    constructor() {
        const mutex = new Mutex();
        this.append = mutex.lock(this.append.bind(this));
        this.walk = mutex.lock(this.walk.bind(this));
    }

    abstract append(obj: Event<T>): Promise<void>;
    
    abstract getObjects(): Promise<Event<T>[]>;

    public async walk(callback: (event: Event<T>) => Promise<void>): Promise<void> {
        for (const obj of await this.getObjects()) {
            await callback(obj);
        }
    };
}