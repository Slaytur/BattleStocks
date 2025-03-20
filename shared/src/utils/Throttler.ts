export class Throttler<T> {
    private storage = new Map<T, ThrottlingCounter>();

    constructor (public timeout: number[]) {}

    consume (key: T): boolean {
        let counter = this.storage.get(key) ?? null;

        const now = Date.now();
        if (counter === null) {
            counter = {
                index: 0,
                updatedAt: now
            };

            this.storage.set(key, counter);
            return true;
        }

        const allowed = (now - counter.updatedAt) >= (this.timeout[counter.index] * 1e3);
        if (!allowed) return false;

        counter.updatedAt = now;
        counter.index = Math.min(counter.index + 1, this.timeout.length - 1);

        this.storage.set(key, counter);
        return true;
    }

    reset (key: T): void {
        this.storage.delete(key);
    }
}

interface ThrottlingCounter {
    index: number
    updatedAt: number
}
