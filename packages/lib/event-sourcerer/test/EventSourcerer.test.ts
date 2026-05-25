import { describe, test, expect } from 'vitest'
import { EventEntry, eventSourcerer, EventSourcererError } from "../src"

const DEMO_DATA: Array<EventEntry> = [
    { eventName: 'single', time: 1779697318738, input: [1] },
    { eventName: 'double', time: 1779697318738, input: [2] },
    { eventName: 'single', time: 1779697318738, input: [3] }
]

describe("EventSourcerer", () => {
    test("1+1=2", async () => {
        expect(1 + 1).toBe(2);
    })

    test("Simple test", async () => {
        const es = await eventSourcerer();
        const a = await es.mountEvent(async function test(msg: string) { return msg })
        await expect(es.mountEvent(async function test(msg: string) { return msg })).rejects.instanceOf(EventSourcererError)
        await expect(es.mountEvent(async function (msg: string) { return msg })).rejects.instanceOf(EventSourcererError)
        await a("Hallo");
        await a("Welt");
        await a("!");
        await expect(es.getEventChain()).resolves.lengthOf(3);
    })

    test("Simple test", async () => {
        const es = await eventSourcerer(DEMO_DATA);
        let count = 0;
        await es.mountEvent(async function single(s: number) { count += s; return s })
        await es.mountEvent(async function double(d: number) { count += d*2; return d })
        await es.build();
        expect(count).toBe(8);
    })

    test("Simple test", async () => {
        const es = await eventSourcerer(DEMO_DATA);
        let count = 0;
        await es.mountEvent(async function single(s: number) { count += s; return s })
        await expect(es.build()).rejects.instanceOf(EventSourcererError);
    })
});