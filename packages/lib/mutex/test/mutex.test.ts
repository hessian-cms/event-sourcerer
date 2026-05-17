import { describe, test, expect } from 'vitest'
import { Mutex } from '../src';

describe("Mutex", () => {
    test("Default test", async () => {
        const arr: Array<number> = [];
        const mutex = new Mutex();
        const addToArr = async (id: number, delay: number) => {
            await new Promise<void>(resolve => setTimeout(() => {
                arr.push(id);
                resolve();
            }, delay));
        }
        const execDelayAddToArr = mutex.lock(addToArr);

        const promiseArray = [
            execDelayAddToArr(1, 100),
            execDelayAddToArr(2, 50),
            execDelayAddToArr(3, 10)
        ]
        await Promise.all(promiseArray);

        expect(arr).toEqual([1,2,3])
    })
});