import { eventStore, EventStore } from "./EventStore.function";

export type EventSourcerer = Awaited<ReturnType<typeof eventSourcerer>>;

export async function eventSourcerer(store: Promise<EventStore> = eventStore()) {
    const s = await store;

    return {
        addEvent: s.addEvent,
        listEvents: s.listEvents,
        removeEvent: s.removeEvent
    }
}