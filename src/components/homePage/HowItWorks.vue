<template>
  <section
    class="howItWorks wl"
    aria-label="how it works section"
  >
    <img
      aria-label="background visualizer"
      src="data:image/svg+xml,<svg
      version=&quot;1.1&quot;
      xmlns=&quot;http://www.w3.org/2000/svg&quot;
      viewBox=&quot;0 0 500 500&quot;
      width=&quot;100%&quot;
      id=&quot;blobSvg&quot;
      style=&quot;opacity: 1&quot;
      filter=&quot;blur(0px)&quot;
      transform=&quot;rotate(135)&quot;>
      <path id=&quot;blob&quot; fill=&quot;url(%23gradient)&quot; style=&quot;opacity: 1&quot;>
        <animate
          attributeName=&quot;d&quot;
          dur=&quot;10000ms&quot;
          repeatCount=&quot;indefinite&quot;
          values=&quot;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;&quot;></animate>
      </path>
      <defs>
        <linearGradient id=&quot;gradient&quot; x1=&quot;0%&quot; y1=&quot;0%&quot; x2=&quot;0%&quot; y2=&quot;100%&quot;>
          <stop offset=&quot;0%&quot; style=&quot;stop-color: rgb(0, 86, 224)&quot;></stop>
          <stop offset=&quot;100%&quot; style=&quot;stop-color: rgb(71, 182, 254)&quot;></stop>
        </linearGradient>
      </defs></svg
    >"
      alt="image"
    >
    <header aria-label="tag line">
      {{ $t('home.how-it-works.tagline') }}
    </header>
    <h2>{{ $t('home.how-it-works.title') }}</h2>
    <div
      class="slideShow"
      aria-label="steps slide show"
    >
      <div class="imagesContainer">
        <swiper-container
          class="images"
          allow-touch-move="false"
          crossfade="false"
          effect="fade"
          ref="imagesEl"
        >
          <swiper-slide>
            <img
              src="https://placehold.co/250"
              alt="a GIF to visualize the step using the website"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://placehold.co/250"
              alt="a GIF to visualize the step using the website"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://placehold.co/250"
              alt="a GIF to visualize the step using the website"
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="https://placehold.co/250"
              alt="a GIF to visualize the step using the website"
            >
          </swiper-slide>
        </swiper-container>
      </div>
      <div
        class="infoMobile"
        aria-label="steps information"
      >
        <ol
          class="stages"
          aria-label="steps names"
        >
          <li
            v-for="(stage, index) in stages"
            :key="index"
          >
            <button
              @click="
                autoplay.pause(10);
                changeStep(index);
              "
              ref="stagesEl"
              :class="[index == 0 ? 'active' : '']"
            >
              <span>{{ index + 1 }}</span> {{ stage }}
            </button>
          </li>
        </ol>
        <ol
          class="steps"
          aria-label="steps explanation"
        >
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            ref="stepsEl"
            :class="[index == 0 ? 'active' : '']"
          >
            <h3>{{ step.title }}</h3>
            <p>
              {{ step.description }}
            </p>
          </li>
        </ol>
      </div>
    </div>
    <div class="ctaButtons">
      <LinkButton>{{ $t('global.browes-properties') }}</LinkButton>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import LinkButton from '../microComponents/LinkButton.vue';

const { t } = useI18n();
const stages = ref([
  t('home.how-it-works.step-cards.step1.slug'),
  t('home.how-it-works.step-cards.step2.slug'),
  t('home.how-it-works.step-cards.step3.slug'),
  t('home.how-it-works.step-cards.step4.slug'),
]);
const stagesEl = ref(null);
const steps = ref([
  {
    title: t('home.how-it-works.step-cards.step1.title'),
    description: t('home.how-it-works.step-cards.step1.description'),
  },
  {
    title: t('home.how-it-works.step-cards.step2.title'),
    description: t('home.how-it-works.step-cards.step2.description'),
  },
  {
    title: t('home.how-it-works.step-cards.step3.title'),
    description: t('home.how-it-works.step-cards.step3.description'),
  },
  {
    title: t('home.how-it-works.step-cards.step4.title'),
    description: t('home.how-it-works.step-cards.step4.description'),
  },
]);
const stepsEl = ref(null);
const imagesEl = ref(null);
const currentActiveIndex = ref(0);

// autoplay logic
const interval = ref(null);
const autoplay = {
  start() {
    interval.value = setInterval(() => {
      changeStep(indexInc());
    }, 5000);
    return interval.value;
  },
  stop() {
    clearInterval(interval.value);
  },
  async pause(seconds) {
    if (interval.value != false) {
      this.stop();
      interval.value = false;
      setTimeout(() => {
        this.start();
      }, seconds * 1000);
    }
  },
};
onMounted(async () => {
  autoplay.start();
});

// function to link changes between elements
function changeStep(index) {
  if (stagesEl.value && imagesEl.value) {
    stagesEl.value.forEach((stage) => stage.classList.remove('active'));
    stagesEl.value[index].classList.add('active');

    stepsEl.value.forEach((step) => step.classList.remove('active'));
    stepsEl.value[index].classList.add('active');

    imagesEl.value.swiper.slideTo(index);
    currentActiveIndex.value = index;
  }
}
// checking what the next index number should be
function indexInc(index = currentActiveIndex.value, upperLimit = 3, lowerLimit = 0) {
  if (index >= upperLimit) {
    return lowerLimit;
  } else if (index < lowerLimit) {
    return upperLimit;
  } else return ++index;
}
</script>

<style lang="scss" scoped>
section.howItWorks {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  &>header {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: var(--primary);
    font-size: 1rem;
    text-transform: capitalize;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);
  }

  &>h2 {
    border-radius: 10px;
    margin-top: 0.5rem;
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 700;
    backdrop-filter: blur(5px);
    box-shadow: var(--primary-larg-shadow);
    background-color: var(--light-70);

    @media #{$mq-820-down} {
      font-size: 1.5rem;
    }
  }

  .slideShow {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    margin: 1rem;
    padding: 1rem;
    width: 100%;

    @media #{$mq-820-down} {
      flex-flow: column nowrap;
    }

    .imagesContainer {
      border-radius: 10px;
      box-shadow: var(--larg-shadow);
      max-width: 450px;
      width: 100%;
      overflow: hidden;

      @media #{$mq-820-down} {
        max-width: unset;
      }

      swiper-container.images {
        margin: 0;
        z-index: 0;

        swiper-slide {
          img {
            width: 100%;
            object-fit: cover;
            margin-bottom: -10px;
          }
        }
      }
    }

    .infoMobile {
      display: flex;
      flex-flow: column nowrap;
      margin-inline-start: 0.5rem;
      width: 100%;

      @media #{$mq-820-down} {
        margin-inline-start: unset;
        height: 17rem;
      }

      .stages {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        width: 100%;
        padding: 0;
        list-style: none;
        margin-top: 0rem;

        @media #{$mq-820-down} {
          margin-top: 2rem;
        }

        @media #{$mq-365-down} {
          flex-flow: row wrap;
        }

        li {
          margin: 0rem 0.3rem;
          width: 100%;

          button {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border-radius: 8px;
            border: 1px solid var(--dark-5);
            padding: 0.5rem 0.5rem;
            width: 100%;
            background-color: var(--primary-5);
            font-weight: 600;
            transition-duration: 0.2s;

            @media #{$mq-820-down} {
              background-color: var(--secondary);
            }

            @media #{$mq-365-down} {
              margin: 0.2rem 0rem;
            }

            &:hover {
              cursor: pointer;
              border: 1px solid var(--primary);
              scale: 1.01;
              color: var(--primary);
              box-shadow: var(--small-shadow);
            }

            &:active {
              scale: 0.99;
            }

            span {
              margin-inline-end: 0.4rem;
              border-radius: 5px;
              padding: 0rem 0.4rem;
              font-size: 1rem;
              color: var(--light);
              background-color: var(--dark);
              transition-duration: 0.2s;
            }

            &.active {
              border: none;
              background: var(--accent-primary);
              color: var(--light);
              box-shadow: var(--medium-shadow);
              scale: 1.05;

              @media #{$mq-820-down} {
                border: 1px solid var(--secondary);
              }
            }

            &.active span {
              color: var(--dark);
              background-color: var(--secondary);
            }
          }
        }
      }

      .steps {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          background-color: var(--primary-5);
          border: 1px solid var(--dark-5);
          border-radius: 10px;
          padding: 0.2rem 0.5rem;
          margin: 0.5rem 0.2rem;
          opacity: 0.5;
          transition-duration: 0.5s;

          @media #{$mq-820-down} {
            max-height: 0px;
            margin: 0;
            padding: 0px;
            overflow: hidden;
            border: none;
            transition-duration: 0s;
          }

          h3 {
            margin: 0.3rem 0rem;
          }

          p {
            margin-bottom: 0px;
            margin-top: 0px;
            max-height: 500px;
            overflow: hidden;
            transition-duration: 0.3s;

            @media #{$mq-820-down} {
              max-height: 500px;
              transition-duration: 0s;
            }
          }

          &.active {
            border: 1px solid var(--primary-20);
            box-shadow: var(--medium-shadow);
            padding: 1rem;
            opacity: 1;
            background-color: var(--white);

            @media #{$mq-820-down} {
              max-height: 20rem;
              margin: 0.5rem 0.2rem;
            }

            // p {
            //   max-height: 500px;
            // }
          }
        }
      }
    }
  }

  &>img {
    position: absolute;
    width: 50%;
    margin-inline-start: 50%;
    top: 60%;
    z-index: -1000;

    @media #{$mq-480-down} {
      top: 90%;
    }
  }

  &>.ctaButtons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    width: 50%;

    &>* {
      margin: 0.2rem;
    }
  }
}
</style>
