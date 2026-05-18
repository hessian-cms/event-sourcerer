import { Mutex } from "@event-sourcerer/mutex";
import { EventSourcererError } from "./errors";
import { EventSourcererErrorEventHandlerDeactivated } from "./errors/EventSourcererErrorEventHandlerDeactivated.error";

export type EventHandler = Awaited<ReturnType<typeof eventHandler>>;

export async function eventHandler(eventName: string) {
    const mutex = new Mutex();
    let active = true;

    async function deactivate(): Promise<void> {
        active = false;
    }

    async function triggerEvent(payload: any): Promise<any> {
        if(!active) {
            throw new EventSourcererErrorEventHandlerDeactivated(`Event ${eventName} is deactivated and cannot be triggered.`)
        }
        // TODO implement
        return payload
    }

    async function getEventName(): Promise<string> {
        if(!active) {
            throw new EventSourcererErrorEventHandlerDeactivated(`Event ${eventName} is deactivated and cannot be triggered.`)
        }
        
        return eventName;
    }

    return {
        getEventName,
        triggerEvent: mutex.lock(triggerEvent),
        deactivate: mutex.lock(deactivate)
    }
}