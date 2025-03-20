export class TokenBucketRateLimit<T> {
    constructor (public max: number, public refillInterval: number) {}

    private storage = new Map<T, Bucket>();

    check (key: T, cost: number): boolean {
        const bucket = this.storage.get(key) ?? null;
        if (bucket === null) return true;

        const now = Date.now();
        const refill = Math.floor((now - bucket.refilledAt) / (this.refillInterval * 1e3));

        return refill > 0
            ? Math.min(bucket.count + refill, this.max) >= cost
            : bucket.count >= cost;
    }

    consume (key: T, cost: number): boolean {
        let bucket = this.storage.get(key) ?? null;

        const now = Date.now();
        if (bucket === null) {
            bucket = {
                count: this.max - cost,
                refilledAt: now
            };

            this.storage.set(key, bucket);
            return true;
        }

        const refill = Math.floor((now - bucket?.refilledAt) / (this.refillInterval * 1e3));
        if (refill > 0) {
            bucket.count = Math.min(bucket.count + refill, this.max);
            bucket.refilledAt = now;
        }

        if (bucket.count < cost) {
            this.storage.set(key, bucket);
            return false;
        }

        bucket.count -= cost;
        this.storage.set(key, bucket);

        return true;
    }
}

interface Bucket {
    count: number
    refilledAt: number
}
