<template>
  <Teleport to="body">
    <div class="overlayContainer">
      <!-- close button -->
      <button
        @click="emit('close', true)"
        class="closeBtn"
      >
        <span class="material-symbols-rounded"> close </span>
      </button>
      <!-- images viewer -->
      <div
        class="clicker"
        @clickout="emit('close', true)"
      >
        <!-- slider -->
        <swiper-container thumbs-swiper=".thumbs">
          <swiper-slide
            v-for="(image, i) in images"
            :key="i"
          >
            <img
              :src="image.link"
              :alt="image.alt"
            >
          </swiper-slide>
        </swiper-container>
        <!-- thumbs -->
        <swiper-container
          space-between="20"
          class="thumbs"
          navigation="true"
          slides-per-view="4"
        >
          <swiper-slide
            v-for="(image, i) in images"
            :key="i"
          >
            <img
              :src="image.link"
              :alt="image.alt"
            >
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped>
.overlayContainer {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-70);
  z-index: 1000;

  .clicker {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 85%;

    @media #{$mq-820-down} {
      width: 95%;
      height: 90vh;
      margin-top: 5rem;
    }
  }
  .closeBtn {
    position: absolute;
    top: 5%;
    right: 1rem;
    background-color: var(--light-40);
    border: none;
    padding-top: 0.2rem;
    color: var(--light);
    border-radius: 7px;
    transition-duration: 0.2s;

    &:hover {
      cursor: pointer;
      background-color: var(--light-70);
      color: var(--dark-70);
    }
    &:active {
      scale: 0.9;
    }
  }

  swiper-container {
    width: 100%;
    height: 70vh;
    border-radius: 10px;
    overflow: hidden;

    @media #{$mq-820-down} {
      height: auto;
    }

    swiper-slide {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
  }

  swiper-container.thumbs {
    width: 100%;
    height: 7rem;

    swiper-slide {
      border: 1px solid transparent;
      transition-duration: 0.2s;
      border-radius: 10px;

      &:hover {
        cursor: pointer;
        border: 1px solid var(--secondary);
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }
    }

    &::part(container) {
      padding: 1rem 0;
      height: 5rem;

      @media #{$mq-820-down} {
        padding: unset;
        margin-top: 1rem;
      }
    }
    &::part(button-next) {
      background-color: var(--light-90);
      top: 3rem;
      padding: 0.5rem;
      border-radius: 10px;

      @media #{$mq-820-down} {
        top: 2rem;
      }
    }
    &::part(button-prev) {
      background-color: var(--light-90);
      top: 3rem;
      padding: 0.5rem;
      border-radius: 10px;

      @media #{$mq-820-down} {
        top: 2rem;
      }
    }
  }
}
</style>
