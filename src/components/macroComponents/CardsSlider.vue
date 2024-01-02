<template>
  <div
    class="cardsSlider"
  >
    <swiper-container
      slides-per-view="auto"
      space-between="10"
      scrollbar-hide="true"
      :navigation="enNavigation"
      ref="cardsSliderRef"
    >
      <swiper-slide
        v-for="dataObject in props.dataArray"
        :key="dataObject.id"
      >
        <slot
          name="card"
          v-bind="dataObject"
        >
          <!-- placeholder value -->
          <ArticleCard 
            orientation="vertical"
          />
        </slot>
      </swiper-slide>
    </swiper-container>
    <sup class="sliderTitle">
      <slot name="title">
        slider title
      </slot>
    </sup>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import ArticleCard from './articles/ArticleCard.vue';

const props = defineProps({
  dataArray: {
    type: Array,
    required: true,
    default: () => {return [
      { // example for an article card object
        id: 'AB01D',
        img: "https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6",
        category: "category",
        readTime: "PT5M23S",
        title: "article title",
        summary: "article body Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!",
        authorImg: "https://cdn.vox-cdn.com/thumbor/Y97pdEOBw39qZ2SdbIo_dKkHOmY=/0x0:4000x6000/1200x0/filters:focal(0x0:4000x6000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9637713/Fillipovic__Jill__cr_Gary_He_.jpeg",
        authorName: "author name",
        publishedAt: "2024-01-01T12:25:22Z"
      },
      // ...
    ]}
  }
});

const cardsSliderRef = ref(null);
const componentWidth = ref(null);
const enNavigation = ref(true); // enable navigation

function checkNavigation() {
    componentWidth.value = cardsSliderRef.value.getBoundingClientRect().width;
    if(componentWidth.value < 560) enNavigation.value = false;
    else enNavigation.value = true;
}
onMounted(() => {
    checkNavigation();
    window.addEventListener('resize', checkNavigation);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', checkNavigation);
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
      border-bottom: 1px solid var(--dark-40);
      margin: 0;
      margin-top: 0.8rem;
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