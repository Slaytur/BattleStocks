<script>
    import { onMount } from "svelte";
    import gsap from "gsap";
    import img from "$lib/imgs/stock_sheet.jpg";
    let session = null; // session var

    onMount(() => {
        gsap.to(".animated-img", {
            duration: 10,
            y: "-20%", // Moves the image up, creating a pan-down effect
            scale: 1.1, // Slight zoom-in for a dynamic effect
            ease: "power1.out"
        });
    });
</script>

<main class="tw:w-full tw:h-screen tw:overflow-hidden tw:relative">
    <img class="animated-img tw:min-w-[1920px] tw:w-screen tw:mx-auto tw:bg-gray-400 tw:text-center tw:object-cover"
        src={img}
        alt="stock market graph" />

    <div class="text-overlay tw:absolute tw:top-0 tw:w-screen tw:h-screen tw:bg-black/40 tw:shadow-xl tw:px-8 tw:py-6 tw:text-center tw:items-center tw:justify-center tw:flex tw:flex-col">
        <h1 class="tw:!text-[42px] tw:!font-extrabold tw:!text-white tw:!tracking-wide">
            Put Your Trading Skills to the Test with the <span class="tw:text-secondary">Ultimate</span>
        </h1>
        <div class="tw:text-[30px] tw:text-gray-200 tw:mt-3">
            Fast-Paced, Competitive, Stock Trading Game
        </div>
        <button class="btn btn-lg tw:!mt-4 tw:!bg-secondary tw:!text-white" on:click={() => window.location.href = (session ? "servers" : "/signup")}>
            Get Started
        </button>
    </div>
</main>
