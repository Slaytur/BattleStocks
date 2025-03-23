<script>
    let session = null; // grab session
</script>

<main class="container my-5">
    <section class="tw:bg-[#111211] tw:text-white tw:text-center tw:py-10 tw:rounded-lg">
        <h1 class="tw:text-5xl tw:font-bold" style="color: var(--color-primary);">BattleStocks</h1>
        <p class="tw:text-2xl tw:mt-4" style="color: var(--color-text);">
            Conquer the Market, Dominate the Game.
        </p>
        <p class="tw:max-w-xl tw:mx-auto tw:mt-6" style="color: var(--color-text);">
            Enter a realm of thrilling PvP competition. Learn to trade, strategize, and practice your skills—risk-free!
        </p>
    </section>

    <section class="card tw:border-[#111211] tw:my-16 tw:p-6">
        <h2 class="tw:text-3xl tw:font-semibold" style="color: var(--color-secondary);">About BattleStocks</h2>
        <p class="tw:text-lg tw:mt-4" style="color: var(--color-text);">
            BattleStocks transforms the traditional world of stock trading into an interactive and educational arena. Our platform empowers you to experiment with market strategies without ever risking your actual money. Ideal for both finance enthusiasts and competitive gamers, our goal is to enhance financial awareness in a fun, risk-free environment.
        </p>
    </section>

    <section class="tw:my-16">
        <h2 class="tw:text-3xl tw:font-semibold" style="color: var(--color-secondary);">How It Works</h2>
        <div class="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 tw:gap-8 tw:mt-6">
            <div class="tw:bg-white tw:shadow-lg tw:rounded-lg tw:p-6">
                <h3 class="tw:text-2xl tw:font-bold tw:mb-2" style="color: var(--color-primary);">Virtual Portfolio</h3>
                <p class="tw:text-base" style="color: var(--color-text);">
                    Start with a virtual portfolio designed to mimic real market conditions, ensuring that you can experiment without any risk.
                </p>
            </div>
            <div class="tw:bg-white tw:shadow-lg tw:rounded-lg tw:p-6">
                <h3 class="tw:text-2xl tw:font-bold tw:mb-2" style="color: var(--color-primary);">Real-Time Duels</h3>
                <p class="tw:text-base" style="color: var(--color-text);">
                    Challenge opponents in head-to-head trading battles where strategic decisions determine your success.
                </p>
            </div>
            <div class="tw:bg-white tw:shadow-lg tw:rounded-lg tw:p-6">
                <h3 class="tw:text-2xl tw:font-bold tw:mb-2" style="color: var(--color-primary);">Market Insights</h3>
                <p class="tw:text-base" style="color: var(--color-text);">
                    Leverage real-time financial data and insights to make informed trades and learn market dynamics.
                </p>
            </div>
            <div class="tw:bg-white tw:shadow-lg tw:rounded-lg tw:p-6">
                <h3 class="tw:text-2xl tw:font-bold tw:mb-2" style="color: var(--color-primary);">Risk-Free Learning</h3>
                <p class="tw:text-base" style="color: var(--color-text);">
                    Enhance your trading skills in a simulated environment where you can practice without the fear of financial loss.
                </p>
            </div>
        </div>
    </section>

    <section class="tw:text-center tw:my-20">
        <h2 class="tw:text-3xl tw:font-semibold" style="color: var(--color-secondary);">Ready to Battle?</h2>
        <p class="tw:text-lg tw:mt-4" style="color: var(--color-text);">
            Join our community of savvy traders and financial warriors. Sharpen your skills, engage in exciting market duels, and embark on your journey to financial mastery.
        </p>
        <button class="btn btn-primary btn-lg tw:mt-8" on:click={() => window.location.href = (session ? "servers" : "/signup")}>
            Get Started
        </button>
    </section>
</main>
