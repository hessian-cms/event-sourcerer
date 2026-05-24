import { describe, test, expect } from 'vitest'
import { eventSourcerer, EventSourcererError } from "../src"

describe("EventSourcerer", () => {
    test("1+1=2", async () => {
        expect(1 + 1).toBe(2);
    })

    test("dummy", async () => {
        const es = await eventSourcerer();
        const a = await es.mountEvent(async function test(msg: string) { return msg })
        await expect(es.mountEvent(async function test(msg: string) { return msg })).rejects.instanceOf(EventSourcererError)
        await expect(es.mountEvent(async function(msg: string) { return msg })).rejects.instanceOf(EventSourcererError)
        await a("Hallo");
        await a("Welt");
        await a("!");
        console.log(await es.getEventChain());
        expect(1).toBe(1);
    })
});