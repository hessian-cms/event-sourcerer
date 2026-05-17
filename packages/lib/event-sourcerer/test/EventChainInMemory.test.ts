import { describe, test, expect } from 'vitest'
import { EventChainInMemory } from '../src/types/implementation/EventChainInMemory.class';
import { Event } from '../src';

const EVENT_1: Event<string> = {
    eventName: "event1",
    payload: "payload1"
}

const EVENT_2: Event<string> = {
    eventName: "event2",
    payload: "payload2"
}

describe("EventChainInMemory", () => {
    test("Full flow", async () => {
        const chain = new EventChainInMemory();
        await expect(chain.append(EVENT_1)).resolves.toBeUndefined();
        await expect(chain.append(EVENT_2)).resolves.toBeUndefined();
        await expect(chain.getObjects()).resolves.toEqual([EVENT_1, EVENT_2]);

        let count: number = 0;
        await expect(chain.walk(async () => {count++})).resolves.toBeUndefined();
        expect(count).toBe(2);
    })
});