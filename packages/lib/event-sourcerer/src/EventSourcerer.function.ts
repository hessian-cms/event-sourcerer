import { Mutex } from "@event-sourcerer/mutex";
import { EventType, EventTypeStore, EventTypeStoreInMemory } from "./types";

export async function eventSourcerer(eventConfigurationStore: EventTypeStore = new EventTypeStoreInMemory()) {
    const mutex = new Mutex();

    async function addEvent(name: string, configuration: EventType): Promise < void> {
        await eventConfigurationStore.addEventType(name, configuration);
    }

    async function removeEvent(name: string): Promise<void> {
        await eventConfigurationStore.removeEventType(name);
    }

    return {
        addEvent: mutex.lock(addEvent.bind(null)),
        removeEvent: mutex.lock(removeEvent.bind(null))
    }
}