import { Event } from "../EventData.type";
import { EventChain } from "../EventChain.abstract";

/**
 * The EventChainInMemory class is a concrete implementation of the EventChain abstract class that uses an in-memory array to store events. It provides methods for appending events to the chain and retrieving all events from the chain. This implementation is suitable for scenarios where persistence is not required and the event chain can be stored in memory.
 */
export class EventChainInMemory<T> extends EventChain<T> {
    private chain: Event<T>[] = [];

    async append(obj: Event<T>): Promise<void> {
        this.chain.push(obj);
    }

    async getObjects(): Promise<Event<T>[]> {
        return this.chain;
    }
}