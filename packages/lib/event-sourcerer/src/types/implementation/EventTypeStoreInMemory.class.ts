import { EventSourcererErrorAlreadyExists, EventSourcererErrorEventNotFound } from "../../errors";
import { EventType } from "../EventType.type";
import { EventTypeStore } from "../EventTypeStore.abstract";

/**
 * The EventTypeStoreInMemory class is a concrete implementation of the EventTypeStore abstract class that uses an in-memory object to store event type configurations. It provides methods for adding, retrieving, updating, and removing event type configurations. This implementation is suitable for scenarios where persistence is not required and the event type configurations can be stored in memory.
 */
export class EventTypeStoreInMemory extends EventTypeStore {
    private store: Record<string, EventType> = {};

    async addEventType(eventType: string, config: EventType): Promise<void> {
        if (this.store[eventType]) {
            throw new EventSourcererErrorAlreadyExists(`Event type '${eventType}' already exists`);
        }
        this.store[eventType] = config;
    }
    async getEventType(eventType: string): Promise<EventType | undefined> {
        return this.store[eventType];
    }
    
    async updateEventType(eventType: string, config: EventType): Promise<void> {
        if (!this.store[eventType]) {
            throw new EventSourcererErrorEventNotFound(`Event type '${eventType}' not found`);
        }
        this.store[eventType] = config;
    }
    
    async removeEventType(eventType: string): Promise<void> {
        if (!this.store[eventType]) {
            throw new EventSourcererErrorEventNotFound(`Event type '${eventType}' not found`);
        }
        delete this.store[eventType];
    }

}