import { EventType } from "./EventType.type";

/**
 * The EventTypeStore abstract class defines the structure for managing event type configurations within the EventSourcerer library. It provides methods for adding, retrieving, updating, and removing event type configurations. Implementations of this abstract class can use various storage mechanisms (e.g., in-memory, database) to persist event type configurations.
 */
export abstract class EventTypeStore {
    abstract addEventType(eventType: string, config: EventType): Promise<void>;
    abstract getEventType(eventType: string): Promise<EventType | undefined>;
    abstract updateEventType(eventType: string, config: EventType): Promise<void>;
    abstract removeEventType(eventType: string): Promise<void>;
}