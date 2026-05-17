import { describe, test, expect } from 'vitest'
import { EventSourcerer, EventSourcererErrorAlreadyExists, EventSourcererErrorEventNotFound } from '../src';

describe("EventSourcerer", () => {
    test("Create add and remove events", async () => {
        const eventSourcerer = new EventSourcerer();
        await expect(eventSourcerer.addEvent("test", { eventName: "test" })).resolves.toBe(undefined);
        await expect(eventSourcerer.addEvent("test", { eventName: "test" })).rejects.instanceOf(EventSourcererErrorAlreadyExists);
        await expect(eventSourcerer.removeEvent("test")).resolves.toBe(undefined);
        await expect(eventSourcerer.removeEvent("test")).rejects.instanceOf(EventSourcererErrorEventNotFound);
    })
});