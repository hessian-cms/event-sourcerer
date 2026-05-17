/**
 * The EventType type represents the configuration for an event within the EventSourcerer library. It consists of a single property, eventName, which is a string that identifies the name of the event. This type is used to define the structure of event configurations that can be stored and retrieved from an EventTypeStore.
 */
export type EventType = {
    eventName: string
}