<template>
  <div
    class="propertyCard"
    role="card"
    aria-label="property info snippet card"
  >
    <!-- image, tags, and metrics -->
    <div
      class="visuals"
      role="img"
    >
      <img
        :src="propertyData.img"
        :alt="`image of ${propertyData.name} property`"
      >
      <div
        class="chips"
        role="group"
      >
        <!-- category -->
        <TackTag>{{ propertyData.category }}</TackTag>
        <ul class="indicators">
          <li
            v-if="propertyData.isTrade"
          >
            <TackTag>
              <!-- trading shares -->
              <span class="material-symbols-rounded">
                swap_horiz
              </span>
            </TackTag>
          </li>
          <li
            v-if="propertyData.isTrending"
          >
            <TackTag>
              <!-- popular/trending -->
              <span class="material-symbols-rounded iconLtr">
                trending_up
              </span>
            </TackTag>
          </li>
          <li
            v-if="propertyData.isNew"
          >
            <TackTag>
              <!-- new -->
              <span class="material-symbols-rounded iconLtr">
                bolt
              </span>
            </TackTag>
          </li>
        </ul>
      </div>
      <div class="sliderContainer">
        <swiper-container
          slides-per-view="auto"
          free-mode="true"
          height="auto"
          autoplay-delay="2500"
          autoplay-disable-on-interaction="true"
        >
          <swiper-slide
            v-for="metric in propertyData.metrics"
            :key="metric.lable"
          >
            <TackTag>
              <span
                class="metric"
                v-tippy="{
                  content: metric.description
                }"
              >{{ metric.lable }}</span><span class="value"> {{ getMetricValue(metric) }}</span>
            </TackTag>
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
    <!-- info -->
    <div class="informatives">
      <!-- property info -->
      <article class="propertyInfo">
        <sup class="REFNAQS">{{ propertyData.REFNAQS }}</sup>
        <h1 class="name">
          {{ propertyData.name }}
        </h1>
        <p class="location">
          {{ propertyData.location }}
        </p>
        <p class="price">
          <span>{{ $n((propertyData.fundingPrice/100) * store.getters.getExchangeRate(), "currency",
                      store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 }) }}</span>
          <sub>{{ $n((propertyData.sharePrice/100) * store.getters.getExchangeRate(), 'currency', store.getters.getUserLocaleCurrency()) }} / share</sub>
        </p>
      </article>
      <!-- calc snippet (if enabled) TODO v1-->
      <!-- funding info -->
      <div
        class="fundingProgress"
        role="progressbar"
      >
        <div
          class="progress"
          :style="[`width:${propertyData.fundingProgress}%;`, propertyData.fundingProgress < 100 ? '': 'opacity:0.5;']"
        >
          <span
            :class="[propertyData.fundingProgress < 100 ? '' : '__end']"
          >{{ getFundingProgress() }}</span>
        </div>
      </div>
    </div>
    <!-- CTA -->
    <div class="btns">
      <PrimaryButton
        @click="navigateToProperty()"
      >
        {{ $t('global.view-property') }}
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup>
import TackTag from '@/components/microComponents/TackTag.vue';
import PrimaryButton from '../../microComponents/PrimaryButton.vue';
import store from '@/store';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { n } = useI18n();
const router = useRouter();
const props = defineProps({
    propertyData: {
        type: Object,
        required: true
    }
});

function getMetricValue(metricObj) {
    /**
     * TODO:: adjust formatting for locale 
     */

    switch (metricObj.type) {
        case '%':
            return `${metricObj.value}%`;
        case '*':
            return `X ${metricObj.value}`;
        case '+':
            return `${metricObj.value}`;
        case '$':
            return n(metricObj.value, 'currency');
        default:
            metricObj.value
    }
}
function getFundingProgress() {
    if(props.propertyData.fundingProgress < 100) {
        return n((props.propertyData.fundingProgress/100), 'percent', store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 });
    } else return props.propertyData.status;

}

function navigateToProperty() {
    router.push({
        name: 'property', 
        params: {
            id: props.propertyData.id
        }
    });
}
</script>

<style lang="scss" scoped>
  .propertyCard {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 30%;
    box-shadow: var(--medium-shadow);
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    max-width: 420px;
    min-width: 280px;
    padding: 0.5rem;
    background-color: var(--white);
    overflow: hidden;
    
    @media #{$mq-820-down} {
      max-width: unset;
      min-width: 220;
      width: 100%;
    }
    @media #{$mq-480-down} {
      max-width: unset;
      min-width: 150;
      width: 100%;
    }

    .visuals {
      position: relative;
      display: flex;
      flex-flow: column nowrap;

      img {
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        width: 100%;
        height: 202px;
        object-fit: cover;
      }

      .chips {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
        display: flex;
        flex-flow: row wrap;

        .tackTag {
          display: flex;
          align-items: center;
          border-radius: 7px;
          width: fit-content;
          background-color: var(--dark-90);
        }

        .indicators {
          display: flex;
          flex-flow: row nowrap;
          margin-inline-start: auto;

          & .tackTag {
            position: unset;
            margin-inline-start: 0.2rem;
            padding: 0.1rem;
            color: var(--light);
            
            span {
              font-size: 1.3rem;
            }
          } 
      }
      }

      .sliderContainer {
        position: absolute;
        top: 0.3rem;
        left: 0.5rem;
        right: 0.5rem;

        swiper-container {
          width: 100%;
          z-index: 0;

          &::part(container) {
            border-radius: 7px;
          }
          swiper-slide {
            display: flex;
            align-items: center;
            height: auto;
            width: fit-content;
            
            & > .tackTag {
              position: unset;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              margin: 0 0.2rem;
              background-color: var(--light-70);
              backdrop-filter: blur(2px);
              color: var(--dark-90);
              cursor: default;

              span {
                font-size: 1rem;
              }
              .metric {
                text-decoration: underline 1px dashed var(--dark-40);
                
                &:hover {
                  cursor: help;
                }
              }

              .value {
                margin-inline-start: 0.1rem;
                color: var(--primary);
              }

              .infoIcon {
                margin-inline-start: 0.2rem ;
                font-size: 0.7rem;
              }
            }
          }
        }
      }

    }

    .informatives {
      display: flex;
      flex-flow: column nowrap;
      margin: 0.5rem 0;
      margin-bottom: 0;
      
      .propertyInfo {
        display: flex;
        flex-flow: column nowrap;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        padding: 0.5rem;
        background-color: var(--primary-5);
        text-align: start;
        
        .REFNAQS {
          color: var(--primary);
          font-size: 0.8rem;
        }
  
        .name {
          margin: 0;
        }
  
        .location {
            position: relative;
          margin: 0.2rem 0;
          max-height: 2.5rem;
          overflow: hidden;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            height: 1rem;
            background: linear-gradient(transparent, var(--light));

          }
        }
  
        .price {
            display: flex;
            flex-flow: column nowrap;
            border-top: 1px solid var(--dark-20);
          margin: 0;
          padding: 0.5rem 0 0 0;
          font-size: 1.3rem;
          font-weight: 600;
          text-align: end;

          sub {
            font-size: 0.8rem;
            color: var(--primary-90);
          }
        }
      }
    }

    .fundingProgress {
      position: relative;
      border: 1px solid var(--dark-20);
      border-radius: 5px;
      margin: 0.5rem 0;
      width: 100%;
      height: 1.1rem;
      background-color: var(--secondary);
      overflow: hidden;

      .progress {
        // logical ---
        width: 45%;
        // logical ---
        position: absolute;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: inherit;
        background-color: var(--dark);
        transition-duration: 0.2s;

        span {
          margin-inline-start: auto;
          margin-inline-end: 0.2rem;
          width: fit-content;
          color: var(--light);
          font-size: 0.8rem;
          background-color: var(--dark-40);

          &.__end {
            margin-inline-end: auto;
          }
        }
      }
    }

    .btns {
        .primaryButton {
            background: unset;
            background-color: var(--dark);
        }
    }   
  }
</style>