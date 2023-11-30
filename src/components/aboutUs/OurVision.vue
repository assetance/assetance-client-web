<template>
    <section class="vision wl">
        <header>{{ $t('about.vision.tagline') }}</header>
        <p>{{ $t('about.vision.description') }}</p>
    </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.vision {
    margin: 4rem;
    margin-bottom: 1rem;
    text-align: center;

    &>header {
        border-radius: 10px;
        color: var(--primary);
        font-size: 1rem;
        text-transform: capitalize;

        @media #{$mq-820-down} {
            text-align: center;
        }

    }

    &>p {
        margin: 1rem 0;
        font-weight: 600;
    }
}
</style>