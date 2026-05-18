import { describe, test, expect } from 'vitest'
import { eventSourcerer, EventSourcererErrorAlreadyExists, EventSourcererErrorEventNotFound } from '../src';

describe("EventSourcerer", () => {
    test("Create add and remove events", async () => {
        const sourcerer = await eventSourcerer();
        await expect(sourcerer.addEvent("test", { eventName: "test" })).resolves.toBe(undefined);
        await expect(sourcerer.addEvent("test", { eventName: "test" })).rejects.instanceOf(EventSourcererErrorAlreadyExists);
        await expect(sourcerer.removeEvent("test")).resolves.toBe(undefined);
        await expect(sourcerer.removeEvent("test")).rejects.instanceOf(EventSourcererErrorEventNotFound);
    })
});