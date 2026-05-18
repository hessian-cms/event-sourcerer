import { describe, test, expect } from 'vitest'
import { eventSourcerer, EventSourcererError } from "../src/index"
import { EventSourcererErrorEventHandlerDeactivated } from '../src/errors/EventSourcererErrorEventHandlerDeactivated.error';
import { eventHandler } from '../src/EventHandler.function';

const TEST_STRING = "TEST_STRING";
const EVENT_1_NAME = "test1";
const EVENT_2_NAME = "test2";

describe("EventSourcerer", () => {
    test("Add two events then remove one", async () => {
        const sourcerer = await eventSourcerer();
        await expect(sourcerer.addEvent("test1")).resolves.toBeDefined();
        await expect(sourcerer.addEvent("test2")).resolves.toBeDefined();
        await expect(sourcerer.listEvents()).resolves.toEqual(["test1", "test2"]);
        await expect(sourcerer.removeEvent("test1")).resolves.toBeUndefined();
        await expect(sourcerer.listEvents()).resolves.toEqual(["test2"]);
    })

    test("Remove not existing event", async () => {
        const sourcerer = await eventSourcerer();
        await expect(sourcerer.addEvent(EVENT_1_NAME)).resolves.toBeDefined();
        await expect(sourcerer.addEvent(EVENT_2_NAME)).resolves.toBeDefined();
        await expect(sourcerer.removeEvent(EVENT_1_NAME)).resolves.toBeUndefined();
        await expect(sourcerer.removeEvent(EVENT_1_NAME)).rejects.toBeInstanceOf(EventSourcererError);
    })

    test("Add event, check name, configure handler und trigger", async () => {
        const sourcerer = await eventSourcerer();
        const testHandler = await sourcerer.addEvent(EVENT_1_NAME);
        await expect(testHandler.getEventName()).resolves.toBe(EVENT_1_NAME);
        await expect(testHandler.triggerEvent(TEST_STRING)).resolves.toEqual(TEST_STRING);
    })

    test("Trigger deactived handler", async () => {
        const sourcerer = await eventSourcerer();
        const testHandler = await sourcerer.addEvent(EVENT_1_NAME);
        await expect(testHandler.getEventName()).resolves.toBe(EVENT_1_NAME);
        await expect(testHandler.deactivate()).resolves.toBeUndefined();
        await expect(testHandler.triggerEvent(TEST_STRING)).rejects.toBeInstanceOf(EventSourcererErrorEventHandlerDeactivated);
        await expect(testHandler.getEventName()).rejects.toBeInstanceOf(EventSourcererErrorEventHandlerDeactivated);
    })

    test("Add event with custom handler", async () => {
        const sourcerer = await eventSourcerer();
        expect(sourcerer.addEvent(EVENT_1_NAME, await eventHandler(EVENT_1_NAME))).resolves.toBeDefined();
    })
});