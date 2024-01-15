<template>
  <div
    class="cardsSlider"
  >
    <!-- slider tray-->
    <swiper-container
      slides-per-view="auto"
      space-between="10"
      scrollbar-hide="true"
      :navigation="false"
      ref="cardsSliderRef"
    >
      <swiper-slide
        v-for="n in cardsNumber"
        :key="n"
      >
        <slot name="card">
          <!-- default loader card -->
          <ArticleCardLoader 
            orientation="vertical"
          />
        </slot>
      </swiper-slide>
    </swiper-container>
    <sup class="sliderTitle">
      <!-- slider title -->
      <slot name="title">
        slider title
      </slot>
    </sup>
  </div>
</template>

<script setup>
import ArticleCardLoader from './articles/ArticleCardLoader.vue';

// props
defineProps({
  cardsNumber: {
    type: Number,
    required: false,
    default: 10
  }
});

</script>

<style lang="scss" scoped>
.cardsSlider {
    position: relative;
    width: 100%;

    swiper-container {
        width: 100%;
        height: auto;
        z-index: 0;

        &::part(container) {
            padding-top: 3rem;
            padding-bottom: 0.8rem;
        }
        &::part(button-next) {
          position: absolute;
          top: 2rem;
          right: 0;
          border: 1.5px solid var(--dark-40);
          border-radius: 7px;
          height: 1rem;
          padding: 0.3rem;
          color: var(--dark-70);
          background-color: var(--dark-5);
          transition-duration: 0.2s;

          &:hover {
            cursor: pointer;
            border-color: var(--primary-40);
            background-color: var(--primary-5);
            color: var(--primary);
          }
          &:active {
            scale: 0.90;
          }

          html[dir = 'rtl'] & {
            right: unset;
            left: 0;
          }
        }
        &::part(button-prev) {
          position: absolute;
          top: 2rem;
          left: unset;
          right: 3rem;
          border: 1.5px solid var(--dark-40);
          border-radius: 7px;
          height: 1rem;
          padding: 0.3rem;
          color: var(--dark-70);
          background-color: var(--dark-5);
          transition-duration: 0.2s;

          &:hover {
            cursor: pointer;
            background-color: var(--primary-5);
            color: var(--primary);
            border-color: var(--primary-40);
          }
          &:active {
            scale: 0.90;
          }

          html[dir = 'rtl'] & {
            right: unset;
            left: 3rem;
          }
        }
        swiper-slide {
          width: fit-content;
          padding: 0 0.3rem 0.7rem 0.3rem;
        }
    }

    .sliderTitle {
      position: absolute;
      top: 0;
      left: 0.5rem;
      margin: 0;
      margin-top: 0.8rem;
      border-bottom: 1px solid var(--dark-40);
      width: 80%;
      font-size: 1.1rem;
      font-weight: 600;
      text-transform: capitalize;

      html[dir = 'rtl'] & {
        left: unset;
        right: 0.5rem;
      }
    }
}
</style>