import { randomNormal } from "../../../shared/src/utils/math";

const STEPS = 320;

export class Stock {
    history: number[];

    value: number;
    prevValue: number;
    prevPrevValue: number;

    drift = 0;
    volatility = 0.01;
    jump = 0;

    oneMonthMin = 0;
    oneMonthMax = 0;
    oneMonthAvg = 0;

    oneMonthPERatio = 0;
    twoMonthPERatio = 0;

    constructor (public name: string, public category: string, public baseValue: number) {
        this.value = this.baseValue;
        this.prevValue = this.value;
        this.prevPrevValue = this.prevValue;

        this.history = [this.value];
    }

    apply (dd: number, dv: number, dj: number): void {
        this.drift += dd * 0.001;
        this.volatility += dv * 0.005;
        this.jump += dj;

        const dt = 0.1;
        const jt = Math.floor(Math.random() * (STEPS - 4));

        const drift_pull_strength = 0.0005;
        const max_spike = 0.03; // Adjust to limit spike amount.
        const min_spike = -max_spike;

        this.prevPrevValue = this.prevValue;
        this.prevValue = this.value;
        this.history = [this.value];

        this.oneMonthMin = this.value;
        this.oneMonthMax = this.value;

        for (let t = 0; t < STEPS; t++) {
            const ud = randomNormal(0.4);

            const prev = this.history[this.history.length - 1];

            this.value = prev * Math.exp((this.drift - 0.5 * this.volatility ** 2) * dt + this.volatility * Math.sqrt(dt) * ud);

            // todo: condense this with subtraction
            if (t >= jt && t < (jt + 7)) this.value *= 1 + 0.05 * (this.jump / 7);

            // Apply drift pull and limit spikes
            const change = (this.value / prev) - 1;

            if (change > max_spike) this.value = prev * (1 + max_spike);
            else if (change < max_spike) this.value = prev * (1 + min_spike);

            if (this.value > this.baseValue * (1.1)) this.value *= (1 - drift_pull_strength * (this.value / this.baseValue - 1));
            else if (this.value < this.baseValue * (0.9)) this.value *= (1 + drift_pull_strength * (1 - this.value / this.baseValue));

            this.oneMonthMin = Math.min(this.oneMonthMin, this.value);
            this.oneMonthMax = Math.max(this.oneMonthMax, this.value);

            this.history.push(this.value);
        }

        this.oneMonthAvg = this.history.reduce((a, b) => a + b) / (this.history.length / 10);
        this.oneMonthPERatio = this.value === this.prevValue
            ? 9999
            : this.value / (this.value - this.prevValue);
        this.twoMonthPERatio = this.value === this.prevPrevValue
            ? 9999
            : this.value / (this.value - this.prevPrevValue);
    }

    snap () {
        return {
            name: this.name,
            category: this.category,
            history: this.history,
            value: this.value,
            prevValue: this.prevValue,
            oneMonthAvg: this.oneMonthAvg,
            oneMonthMin: this.oneMonthMin,
            oneMonthPERatio: this.oneMonthPERatio,
            twoMonthPERatio: this.twoMonthPERatio
        };
    }
}
