<template>
  <section class="hero wl" aria-label="Hero Section">
    <div class="banner">
      <div class="info fade-in-left" aria-label="Hero Info">
        <h1 class="fade-in-300">
          unlocking real estate investing for everyone
        </h1>
        <p class="fade-in-up">
          Investing Made Accessible With Low-Cost Shares, Hassle-Free
          Management, and Freedom to Buy and Sell on Your Terms.
        </p>
        <div class="ctaButtons fade-in-up-300">
          <PrimaryButton icon="start">Start Investing</PrimaryButton>
          <SecondaryButton icon="explore">Browes Properties</SecondaryButton>
        </div>
        <div class="mobileAppCta fade-in-up-500">
          <a href="#"
            ><img
              src="@/assets/Google-Play/EN/light-badge.png"
              alt="get it on Google Play"
          /></a>
          <a href="#"
            ><img
              src="@/assets/App-Store/EN/light-badge.png"
              alt="download on App Store"
          /></a>
        </div>
      </div>
      <Transition>
        <Suspense>
          <div class="visualizer" aria-label="Hero Image">
            <BannerVisualizer></BannerVisualizer>
          </div>
          <template #fallback>
            <div
              class="visualizerFallbackSkeleton"
              aria-label="Hero Image Loading">
              <div class="loadingShader fade-in-right"></div>
              <div class="loadingShader fade-in-right"></div>
              <div class="loadingShader fade-in-500"></div>
              <div class="loadingShader fade-in-right-500"></div>
              <div class="loadingShader fade-in-right-500"></div>
            </div>
          </template>
        </Suspense>
      </Transition>
    </div>
    <!-- value Index (to show index by city) is redacted for this build -->
    <!-- <div class="valueIndex"></div> -->
  </section>
</template>

<script setup>
import PrimaryButton from '@/components/microComponents/PrimaryButton.vue';
import SecondaryButton from '@/components/microComponents/SecondaryButton.vue';
import BannerVisualizer from '@/components/BannerVisualizer.vue';
import ballAnimate from '@/helpers/ballAnimate.js';
import { onMounted } from 'vue';

onMounted(async () => {
  // background animation
  ballAnimate.animate('section.hero');
});
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-top: 80px;
  padding-bottom: 2rem;
  width: 100%;

  @media #{$mq-1400-down} {
    overflow: hidden;
  }

  .banner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    @media #{$mq-820-down} {
      flex-flow: column nowrap;
    }

    .info {
      margin-inline-start: 1rem;
      margin-inline-end: 4rem;
      max-width: 400px;
      backdrop-filter: blur(4px);

      @media #{$mq-820-down} {
        order: 2;
        z-index: -1;
        margin-inline-end: 1rem;
        margin-block-start: 1rem;
        max-width: unset;
        text-align: center;
      }

      & > h1 {
        margin-bottom: 0.5rem;
        font-size: 3rem;
        font-weight: bolder;
        text-transform: capitalize;

        @media #{$mq-820-down} {
          font-size: 2.5rem;
        }
      }

      & > p {
        margin: 2rem 0rem;
        line-height: 1.5rem;

        @media #{$mq-820-down} {
          margin: 0.8rem 0rem;
        }
      }
      .ctaButtons {
        display: flex;
        flex-flow: row nowrap;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
        }

        & > *:nth-child(1) {
          flex: 1 2 2;
          margin-inline-end: 0.5rem;
          margin-block-end: 0.5rem;
        }
      }

      .mobileAppCta {
        display: flex;
        flex-flow: row nowrap;

        @media #{$mq-820-down} {
          justify-content: center;
        }

        a {
          &:nth-child(1) {
            img {
              width: 140px;
              height: 57px;
            }
          }
          &:nth-child(2) {
            padding: 0.5rem;

            img {
              width: 120px;
              height: 40px;
            }
          }

          &:hover {
            scale: 1.04;
            transition-duration: 0.2s;
          }
        }
      }
    }

    .visualizer {
      width: 100%;
      height: 350px;

      @media #{$mq-820-down} {
        height: 200px;
      }
    }

    .visualizerFallbackSkeleton {
      position: relative;
      width: 100%;
      height: 350px;

      @media #{$mq-820-down} {
        height: 200px;
      }
      div {
        &:nth-child(1) {
          position: absolute;
          top: 10%;
          left: calc(100% - (90 * 1.1%));
          border-radius: 10px;
          min-width: 150px;
          width: 30%;
          max-height: 130px;
          height: 100%;

          @media #{$mq-820-down} {
            top: 0%;
          }
        }
        &:nth-child(2) {
          position: absolute;
          top: 45%;
          right: 9%;
          border-radius: 10px;
          max-width: 120px;
          width: 100%;
          max-height: 100px;
          height: 100%;
        }
        &:nth-child(3) {
          position: absolute;
          top: 60%;
          left: 50%;
          border-radius: 10px;
          box-shadow: var(--primary-dark-shadow);
          max-width: 400px;
          width: 100%;
          max-height: 250px;
          height: 100%;
          transform: translate(-50%, -50%);
          overflow: hidden;

          @media #{$mq-820-down} {
            max-width: 320px;
          }
        }
        &:nth-child(4) {
          position: absolute;
          top: 2%;
          left: calc(100% - (35 * 1.4%));
          border-radius: 10px;
          min-width: 140px;
          width: 20%;
          max-height: 85px;
          height: 100%;
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
        }
      }

      .loadingShader {
        position: relative;
        border-radius: 10px;
        min-width: 100px;
        max-width: 100%;
        width: 100%;
        min-height: 100px;
        height: 360px;
        background-color: var(--secondary);
        overflow: hidden;

        &::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            80deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 30%,
            rgba(#fff, 0.5) 50%,
            rgba(#fff, 0)
          );
          animation: shimmer 1s infinite;
          content: '';
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      }
    }
  }

  .valueIndex {
    padding: 0rem 1rem;
  }
}

// vue Transition animation
.v-enter-active {
  transition: opacity 0s ease;
}
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
