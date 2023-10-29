<template>
  <div class="VisualizerContainer">
    <div class="complementaryImage fade-in">
      <swiper-container
        loop="true"
        allow-touch-move="false"
        :ref="
          (el) => {
            swipers.push(el);
          }
        ">
        <swiper-slide v-for="image in imageLinkers[1]" :key="image.alt">
          <img :src="image.url" :alt="image.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="complementaryImage fade-in">
      <swiper-container
        loop="true"
        allow-touch-move="false"
        :ref="
          (el) => {
            swipers.push(el);
          }
        ">
        <swiper-slide v-for="image in imageLinkers[2]" :key="image.alt">
          <img :src="image.url" :alt="image.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="mainImage fade-in-300">
      <swiper-container
        id="mainImage"
        ref="mainSwiper"
        events-prefix="main-swiper-"
        loop="ture"
        :pagination="{
          clickable: true,
        }"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        allow-touch-move="true">
        <swiper-slide
          v-for="image in imageLinkers[0]"
          :key="image.alt"
          ref="mainSwiperSlides">
          <img :src="image.url" :alt="image.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="complementaryImage fade-in-500">
      <swiper-container
        loop="true"
        allow-touch-move="false"
        :ref="
          (el) => {
            swipers.push(el);
          }
        ">
        <swiper-slide v-for="image in imageLinkers[3]" :key="image.alt">
          <div class="metrics">
            <div class="metric">
              <span>AROI</span>
              <p>
                {{ image.AROI }}
              </p>
            </div>
            <div class="metric">
              <span>NRY</span>
              <p>
                {{ image.NRY }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
    <div class="complementaryImage fade-in-500">
      <swiper-container
        loop="true"
        allow-touch-move="false"
        :ref="
          (el) => {
            swipers.push(el);
          }
        ">
        <swiper-slide v-for="image in imageLinkers[4]" :key="image.alt">
          <img :src="image.url" :alt="image.alt" />
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import router from '@/router';
import { onMounted, ref } from 'vue';
import getPropertySnapshot from '@/services/getPropertySnapshot';

/**
 * Data fetching and organization
 */
const properties = ref(null);
properties.value = await getPropertySnapshot.getAll();
const imageLinkers = ref([]);
for (let i = 0; i < 6; i++) {
  imageLinkers.value[i] = [];
}
for (let i = 0; i < properties.value.length; i++) {
  const property = properties.value[i];
  // adding photos one for each of the 5 swipers
  for (let j = 0; j < 5; j++) {
    if (j == 3) {
      imageLinkers.value[j].push({
        AROI: property.metrics.AROI,
        NRY: property.metrics.NRY,
      });
      continue;
    }
    imageLinkers.value[j].push({
      url: property.images[j].url,
      alt: property.images[j].alt,
    });
  }
  // adding RFNX IDs
  imageLinkers.value[5].push(property.RFNX);
}

/**
 * SwiperJs's logic
 */
const swipers = ref([]);
const mainSwiper = ref(null);
const mainSwiperSlides = ref(null);

onMounted(async () => {
  // setting up eventListeners' elements
  // adding event eventListener to detect slide changes in main swiper
  mainSwiper.value.addEventListener('main-swiper-slidechange', async () => {
    await changeSlides(mainSwiper.value.swiper.realIndex);
  });
  // adding click eventListener to slides in main swiper's slides
  for (let i = 0; i < mainSwiperSlides.value.length; i++) {
    const element = mainSwiperSlides.value[i];
    element.addEventListener('click', () => {
      // fetch the corresbonding property ID then redirect to property page
      let propertyId = imageLinkers.value[5][mainSwiper.value.swiper.realIndex];
      console.log('property ID:  ' + propertyId);
      // router.push({ name: 'property', params: { propertyId } });
    });
  }
});

async function changeSlides(slideIndex) {
  // change all swipers to the specified index
  for (let i = 0; i < swipers.value.length; i++) {
    setTimeout(() => {
      swipers.value[i].swiper.slideTo(slideIndex);
    }, i * 30);
  }
}
</script>

<style lang="scss" scoped>
div.VisualizerContainer {
  position: relative;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  swiper-container {
    height: 100%;
  }
  swiper-slide {
    height: 100%;
  }

  .mainImage {
    position: absolute;
    border-radius: 10px;
    box-shadow: var(--primary-dark-shadow);
    top: 60%;
    left: 50%;
    max-width: 400px;
    width: 100%;
    max-height: 250px;
    height: 100%;
    transform: translate(-50%, -50%);
    overflow: hidden;

    @media #{$mq-820-down} {
      max-width: 320px;
    }

    &:hover {
      cursor: pointer;
    }

    swiper-container::part(bullet) {
      border-radius: 5px;
      border: 1px solid var(--dark-70);
      width: 16px;
      background-color: var(--light-70);
      opacity: 1;
      transition-duration: 0.3s;
    }
    swiper-container::part(bullet-active) {
      border-radius: 5px;
      border: 1px solid var(--primary);
      width: 32px;
      background-color: var(--secondary);
      transition-duration: 0.3s;
    }
  }
  .complementaryImage {
    box-shadow: var(--primary-dark-shadow);
    overflow: hidden;

    &:nth-child(1) {
      position: absolute;
      border-radius: 10px;
      top: 10%;
      left: calc(100% - (90 * 1.1%));
      min-width: 150px;
      width: 30%;
      max-height: 130px;
      height: 100%;

      @media #{$mq-820-down} {
        top: 0%;
      }

      swiper-container {
        z-index: 0;
      }
    }
    &:nth-child(5) {
      position: absolute;
      border-radius: 10px;
      top: 80%;
      right: 7%;
      max-width: 170px;
      width: 100%;
      max-height: 130px;
      height: 100%;

      @media #{$mq-820-down} {
        right: 0%;
        max-width: 120px;
        max-height: 80px;
      }

      swiper-container {
        z-index: 0;
      }
    }
    &:nth-child(2) {
      position: absolute;
      border-radius: 10px;
      top: 45%;
      right: 9%;
      max-width: 120px;
      width: 100%;
      max-height: 100px;
      height: 100%;

      swiper-container {
        z-index: 0;
      }
    }
    &:nth-child(4) {
      position: absolute;
      border-radius: 10px;
      border: 1px solid var(--dark-5);
      top: 2%;
      left: calc(100% - (35 * 1.4%));
      min-width: 140px;
      width: 20%;
      max-height: 85px;
      height: 100%;
      background-color: var(--light);

      swiper-container {
        z-index: 0;

        swiper-slide {
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-around;

          .metrics {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-around;
            padding: 0.3rem;
            height: 100%;
            width: 100%;

            .metric {
              position: relative;
              margin: 0.2rem;
              padding: 0.3rem;
              border: 1px solid var(--dark-5);
              border-radius: 9px;
              font-weight: 600;
              font-size: 14px;
              background-color: var(--primary-5);

              & > span {
                position: absolute;
                padding: 0rem 0.5rem;
                border-radius: 5px;
                transform: translateY(-50%);
                left: 5px;
                background-color: var(--dark);
                color: var(--light);
              }

              p {
                margin: 0rem 0.3rem 0rem 0.3rem;
                text-align: right;
                color: var(--primary);
                font-size: 1rem;
                font-weight: 900;
              }
            }
          }
        }
      }
    }
  }
}
</style>
