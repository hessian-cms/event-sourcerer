/**
 * The Event type represents an event that can be emitted and listened to within the EventSourcerer library. It consists of an event name, an optional subject, and an optional payload of generic type T.
 */
export type EventData<T> = {
    eventName: string,
    subject?: string,
    payload?: T
}