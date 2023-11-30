<template>
    <section class="hero wl">
        <!-- animator start -->
        <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <!-- animator end -->
        <header>{{ $t('about.hero.tagline') }}</header>
        <article class="statement">
            <h1>{{ $t('about.hero.title') }}</h1>
            <p>{{ $t('about.hero.description') }}</p>
        </article>
        <div class="banner">
            <header>{{ $t('about.banner.tagline') }}</header>
            <article>
                <h2>{{ $t('about.banner.title') }}</h2>
                <p>{{ $t('about.banner.description') }}</p>
            </article>
            <img src="@/assets/brand/DarkBlue.png" alt="company logo">
        </div>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.hero {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin-top: 80px;
    border: 1px solid var(--primary-20);
    box-shadow: var(--xlarg-shadow);
    border-radius: 30px;
    padding: 2rem;
    overflow: hidden;

    @media #{$mq-820-down} {
        border-radius: 0 0 30px 30px;
        margin-top: 45px;
        padding: 1rem;
    }

    &>.circles {
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;

        li {
            position: absolute;
            display: block;
            bottom: -150px;
            width: 20px;
            height: 20px;
            list-style: none;
            animation: animate 25s linear infinite;

            &:nth-child(1) {
                left: 25%;
                width: 80px;
                height: 80px;
                animation-delay: 0s;
                background-color: var(--accent);
            }


            &:nth-child(2) {
                left: 10%;
                width: 20px;
                height: 20px;
                animation-delay: 2s;
                animation-duration: 12s;
                background-color: var(--dark);
            }

            &:nth-child(3) {
                left: 70%;
                width: 20px;
                height: 20px;
                animation-delay: 4s;
                background-color: var(--primary);
            }

            &:nth-child(4) {
                left: 40%;
                width: 60px;
                height: 60px;
                animation-delay: 0s;
                animation-duration: 18s;
                background-color: var(--secondary);
            }

            &:nth-child(5) {
                left: 65%;
                width: 20px;
                height: 20px;
                animation-delay: 0s;
                background-color: var(--accent);
            }

            &:nth-child(6) {
                left: 75%;
                width: 110px;
                height: 110px;
                animation-delay: 3s;
                background-color: var(--dark);
            }

            &:nth-child(7) {
                left: 35%;
                width: 150px;
                height: 150px;
                animation-delay: 7s;
                background-color: var(--primary);
            }

            &:nth-child(8) {
                left: 50%;
                width: 25px;
                height: 25px;
                animation-delay: 15s;
                animation-duration: 45s;
                background-color: var(--accent);
            }

            &:nth-child(9) {
                left: 20%;
                width: 15px;
                height: 15px;
                animation-delay: 2s;
                animation-duration: 35s;
                background-color: var(--white);
            }

            &:nth-child(10) {
                left: 85%;
                width: 150px;
                height: 150px;
                animation-delay: 0s;
                animation-duration: 11s;
                background-color: var(--accent);
            }
        }
    }

    &>header {
        border-radius: 10px;
        margin-bottom: 1rem;
        width: fit-content;
        padding: 0.5rem 1rem;
        color: var(--primary);
        font-size: 1rem;
        text-transform: capitalize;
        backdrop-filter: blur(5px);
        background-color: var(--light-70);
        text-align: center;
    }

    .statement {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        border-radius: 10px;
        width: 100%;
        padding: 1rem 1.5rem;
        backdrop-filter: blur(5px);
        background-color: var(--light-70);
        text-align: center;


        h1 {
            margin: 0.5rem 0rem 0rem 0rem;
            width: 100%;
            text-transform: capitalize;
            font-size: 2rem;
            font-weight: 600;

            @media #{$mq-820-down} {
                font-size: 1.5rem;
            }
        }
    }

    .banner {
        display: flex;
        flex-flow: row wrap;
        margin-top: 2rem;
        width: 100%;

        @media #{$mq-820-down} {
            flex-flow: column nowrap;
        }

        &>header {
            margin: 0.3rem 0rem;
            border-radius: 10px;
            width: 100%;
            padding: 0.5rem 1rem;
            color: var(--primary);
            font-size: 1rem;
            text-transform: capitalize;
            backdrop-filter: blur(5px);
            background-color: var(--light-70);
            text-align: center;
        }

        &>article {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            margin-inline-end: 2%;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            backdrop-filter: blur(5px);
            background-color: var(--light-70);
            width: 49%;
            text-align: start;

            @media #{$mq-820-down} {
                order: 3;
                margin-inline-start: unset;
                align-items: center;
                width: 100%;
            }

            h2 {
                margin: 0rem;
                text-transform: capitalize;
            }
        }

        &>img {
            border-radius: 10px;
            width: 49%;
            height: 15rem;
            object-fit: contain;
            padding: 2rem;
            backdrop-filter: blur(5px);
            background-color: var(--light-70);

            @media #{$mq-820-down} {
                order: 2;
                height: 10rem;
                width: 100%;
                margin-bottom: 0.5rem;
            }
        }
    }
}

// animations 
@keyframes animate {

    0% {
        border-radius: 0;
        transform: translateY(0) rotate(0deg);
    }

    100% {
        border-radius: 100%;
        transform: translateY(-1700px) rotate(720deg);

        @media #{$mq-820-down} {
            transform: translateY(-2000px) rotate(720deg);
        }
    }

}
</style>