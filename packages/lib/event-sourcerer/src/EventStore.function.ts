import { EventSourcererError } from "./errors";
import { EventHandler, eventHandler } from "./EventHandler.function";

export type EventStore = Awaited<ReturnType<typeof eventStore>>;

export async function eventStore(events: Record<string, EventHandler> = {}) {
    async function addEvent(name: string, handler?: EventHandler): Promise<EventHandler> {
        if(!handler) {
            handler = await eventHandler(name);
        }
        events[name] = handler;
        return handler;
    }

    async function removeEvent(name: string): Promise<void> {
        if(!events[name]) {
            throw new EventSourcererError(`Event ${name} does not exist`);
        }
        events[name].deactivate();
        delete events[name];
    }

    async function listEvents(): Promise<string[]> {
        return Object.keys(events);
    }

    return {
        addEvent,
        removeEvent,
        listEvents
    }
}