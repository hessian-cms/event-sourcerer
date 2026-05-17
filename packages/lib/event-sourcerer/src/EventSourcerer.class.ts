import { Mutex } from '@event-sourcerer/mutex'
import { EventType, EventTypeStore, EventTypeStoreInMemory } from './types';

/**
 * The main class of the library, responsible for managing events and their listeners.
 */
export class EventSourcerer {
    constructor(private eventConfigurationStore: EventTypeStore = new EventTypeStoreInMemory) {
        const mutex = new Mutex();
        this.addEvent = mutex.lock(this.addEvent.bind(this));
        this.removeEvent = mutex.lock(this.removeEvent.bind(this));
        //this.event = mutex.lock(this.event.bind(this));
    }

    async addEvent(name: string, configuration: EventType): Promise<void> {
        await this.eventConfigurationStore.addEventType(name, configuration);
    }

    async removeEvent(name: string): Promise<void> {
        await this.eventConfigurationStore.removeEventType(name);
    }

    /*
    async addEventListener<T>(name: string, listener: (event: Event<T>, configuration: EventType) => Promise<void>) {
        // TODO: implement
        throw new Error("Not implemented");
    }

    async removeEventListener<T>(name: string, listener: (event: Event<T>, configuration: EventType) => Promise<void>) {
        // TODO: implement
        throw new Error("Not implemented");
    }
    
    async event<T>(event: Event<T>) {
        // TODO: implement
        throw new Error("Not implemented");
    }
    */
}