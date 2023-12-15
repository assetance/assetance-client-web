<template>
  <section class="values wl">
    <header>{{ $t('about.values.tagline') }}</header>
    <p>{{ $t('about.values.description') }}</p>
    <swiper-container
      :space-between="30"
      slides-per-view="auto"
      :scrollbar-hide="false"
      :mousewheel="true"
      :free-mode="true"
    >
      <swiper-slide
        v-for="n in 3"
        :key="n"
      >
        <span class="material-symbols-rounded iconLtr">verified</span>
        <h3>{{ $t(`about.values.value${n}.title`) }}</h3>
        <p>{{ $t(`about.values.value${n}.description`) }}</p>
      </swiper-slide>
    </swiper-container>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.values {
    margin: 2rem;
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

    swiper-container {
        border-radius: 10px;
        height: auto;
        z-index: 0;
        background-color: var(--secondary);

        swiper-slide {
            border-radius: 10px;
            width: 335px;
            height: auto;
            padding: 1rem;

            .material-symbols-rounded {
                border-radius: 7px;
                padding: 0.5rem;
                background-color: var(--primary-20);
                color: var(--dark);
            }
        }
    }
}
</style>