import { describe, test, expect } from 'vitest'
import { EventType, EventTypeStoreInMemory } from '../src/types';
import { EventSourcererErrorAlreadyExists, EventSourcererErrorEventNotFound } from '../src';

const TEST_EVENT_TYPE_NAME_NOT_EXISTING = "test-event-type-not-existing";

const TEST_EVENT_TYPE_NAME = "test-event-type";

const TEST_EVENT_TYPE: EventType = {
    eventName: "test-event-type"
};

const UPDATED_TEST_EVENT_TYPE: EventType = {
    eventName: "updated-test-event-type"
};

describe("EventConfigurationStoreInMemory", () => {
    test("Full flow", async () => {
        const configurationStore = new EventTypeStoreInMemory();
        await expect(configurationStore.removeEventType(TEST_EVENT_TYPE_NAME)).rejects.instanceOf(EventSourcererErrorEventNotFound);
        await expect(configurationStore.addEventType(TEST_EVENT_TYPE_NAME, TEST_EVENT_TYPE)).resolves.toBe(undefined);
        await expect(configurationStore.addEventType(TEST_EVENT_TYPE_NAME, TEST_EVENT_TYPE)).rejects.instanceOf(EventSourcererErrorAlreadyExists);
        await expect(configurationStore.getEventType(TEST_EVENT_TYPE_NAME)).resolves.toBe(TEST_EVENT_TYPE);
        await expect(configurationStore.updateEventType(TEST_EVENT_TYPE_NAME, UPDATED_TEST_EVENT_TYPE)).resolves.toBe(undefined);
        await expect(configurationStore.updateEventType(TEST_EVENT_TYPE_NAME_NOT_EXISTING, UPDATED_TEST_EVENT_TYPE)).rejects.instanceOf(EventSourcererErrorEventNotFound);
        await expect(configurationStore.removeEventType(TEST_EVENT_TYPE_NAME)).resolves.toBe(undefined);
        await expect(configurationStore.removeEventType(TEST_EVENT_TYPE_NAME)).rejects.instanceOf(EventSourcererErrorEventNotFound);
    })
});