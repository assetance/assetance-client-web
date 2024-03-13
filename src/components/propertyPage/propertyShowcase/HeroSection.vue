<template>
  <section class="hero">
    <!-- images -->
    <div class="visuals">
      <!-- selected image -->
      <img
        :src="imageViewerPic.link"
        :alt="imageViewerPic.alt"
        class="imageViewer"
      >
      <!-- image options -->
      <ul class="imagesSnippets">
        <li
          v-for="(m, i) in 5"
          :key="i"
        >
          <button @click="changeImageViewer(i)">
            <img
              :src="propertyData.images[i].link"
              :alt="propertyData.images[i].alt"
            >
          </button>
        </li>
        <li>
          <button
            v-ripple="{
              pt: {
                root: { style: 'background: var(--primary-70)' },
              },
            }"
            class="p-ripple"
            @click="openImagesOverlay = true"
          >
            <span class="material-symbols-rounded"> wallpaper_slideshow </span>
          </button>
        </li>
      </ul>
    </div>
    <!-- property quick peek -->
    <div class="informatives">
      <!-- tags and meta -->
      <header>
        <TackTag>{{ propertyData.category }}</TackTag>
        <SpeedDial
          direction="left"
          :model="sharingPlatforms"
        >
          <template #item="slotProp">
            <button
              :aria-label="slotProp.item.label"
              @click="slotProp.item.command"
              class="socialSharingBtn p-ripple"
              v-ripple="{
                pt: {
                  root: { style: 'background: var(--primary-70)' },
                },
              }"
            >
              <span
                class="material-symbols-rounded"
                v-if="slotProp.item.icon"
              >
                {{ slotProp.item.icon }}
              </span>
              <img
                v-else
                :src="slotProp.item.image"
                :alt="slotProp.item.alt"
              >
            </button>
          </template>
          <template #icon>
            <span class="material-symbols-rounded"> share </span>
          </template>
        </SpeedDial>
        <button
          class="p-ripple actionBtn"
          aria-label="save"
          v-ripple="{
            pt: {
              root: { style: 'background: var(--primary-70)' },
            },
          }"
          @click="saveBookMark()"
        >
          <span class="material-symbols-rounded"> bookmark </span>
        </button>
        <span
          class="viewsCounter"
          :aria-label="`1,327 viewed this property`"
        >
          <span class="material-symbols-rounded"> visibility </span>
          {{ $n(propertyData.views, 'decimal', store.getters.getUserLocaleCurrency()) }}
        </span>
      </header>
      <!-- REFNAQS id -->
      <sup class="REFNAQS">#{{ propertyData.REFNAQS }}</sup>
      <!-- property Name -->
      <h1 class="propertyName">
        {{ propertyData.name }}
      </h1>
      <!-- property size, years and location -->
      <sub>
        {{
          `
          ${propertyData.location.address ? propertyData.location.address + ', ' : ''} 
          ${
            propertyData.location.buildingNumber
              ? 'building ' + propertyData.location.buildingNumber + ', '
              : ''
          }
          ${
            propertyData.location.propertyNumber
              ? 'property ' + propertyData.location.propertyNumber + ', '
              : ''
          }
          ${propertyData.location.city ? propertyData.location.city + ', ' : ''}
          ${propertyData.location.zipcode ? propertyData.location.zipcode + ', ' : ''}
          ${propertyData.location.state ? propertyData.location.state + ', ' : ''}
          ${propertyData.location.country ? propertyData.location.country + ', ' : ''}
          ${propertyData.location.region ? propertyData.location.region.toUpperCase() : ''}
          
          `
        }}
      </sub>
      <!-- property description -->
      <p
        class="description"
        v-if="propertyData.description"
      >
        {{ propertyData.description }}
      </p>
      <!-- common metrics (second option)-->
      <fieldset
        class="metrics"
        v-else
      >
        <legend>metrics</legend>
        <div
          class="metric"
          v-for="metric in propertyData.metrics"
          :key="metric.lable"
        >
          <span
            class="tooltip"
            v-tippy="{
              content: metric.description,
            }"
          >
            {{ metric.lable }}
          </span>
          <span class="metricValue">{{
            $n(metric.value / 100, metric.type, store.getters.getUserLocaleCurrency())
          }}</span>
        </div>
      </fieldset>
      <!-- funding details -->
      <div class="fundingStatus">
        <!-- current shares status -->
        <div class="fundingMetrics">
          <!-- case 1: still funding -->
          <h2
            class="equityValue"
            v-if="propertyData.status === 'funding'"
          >
            <span class="value">{{
              $n(
                propertyData.availableShares *
                  (propertyData.sharePrice / 100) *
                  store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency()
              )
            }}</span>
            <sub>{{ $t('property.hero.available-of') }}
              <span class="value">{{
                $n(
                  (propertyData.fundingPrice / 100) * store.getters.getExchangeRate(),
                  'currency',
                  store.getters.getUserLocaleCurrency()
                )
              }}</span></sub>
          </h2>
          <!-- case 2: done funding -->
          <h2
            class="equityValue"
            v-else
          >
            <span class="value">{{
              $n(
                (propertyData.valuationData.propertyData.slice(-1) / 100) *
                  store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency()
              )
            }}</span>
          </h2>
          <!-- case 1: still funding -->
          <p
            class="availableShares"
            v-if="propertyData.status === 'funding'"
          >
            {{
              $n(
                (propertyData.sharePrice / 100) * store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { currencyDisplay: 'symbol' }
              )
            }}
            / {{ $t('global.shares', 1) }}
          </p>
          <!-- case 2: done funding -->
          <p
            class="availableShares tooltip"
            v-else
            v-tippy="{
              content: 'only an estimation of what one share would be worth if sold currently',
            }"
          >
            {{
              $n(
                (propertyData.valuationData.propertyData.slice(-1) /
                  100 /
                  propertyData.totalShares) *
                  store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { currencyDisplay: 'symbol' }
              )
            }}
            / {{ $t('global.shares', 1) }}
          </p>
          <hr>
          <time
            :datetime="propertyData.fundingClosingDate"
            class="timeLeft"
          >
            <span class="material-symbols-rounded"> timer </span>
            {{ getFundingDateData() }}</time>
        </div>
        <!-- funding progress -->
        <div
          class="fundingProgress"
          role="progressbar"
        >
          <div
            class="progress"
            :style="[
              `width:${propertyData.fundingProgress}%;`,
              propertyData.fundingProgress < 100 ? '' : 'opacity:0.5;',
            ]"
          >
            <span :class="[propertyData.fundingProgress < 100 ? '' : '__end']">{{
              getFundingProgress()
            }}</span>
          </div>
        </div>
        <!-- cta -->
        <!-- case 1: still funding -->
        <div
          class="cta"
          v-if="propertyData.status === 'funding'"
        >
          <InputNumber
            :max-fraction-digits="0"
            :min="1"
            :max="10000"
            v-model="sharesInput"
            show-buttons
            button-layout="horizontal"
            :suffix="' ' + $t('global.shares', sharesInput)"
            input-id="shares"
          >
            <template #incrementbuttonicon>
              <span class="material-symbols-rounded"> add </span>
            </template>
            <template #decrementbuttonicon>
              <span class="material-symbols-rounded"> remove </span>
            </template>
          </InputNumber>
          <PrimaryButton
            icon="start"
            @click="startInvestment()"
          >
            <!-- Invest <span class="investmentAmount">${{ sharesInput*10 }}</span> -->
            {{ $t('global.invest') }}
            <span class="investmentAmount">{{
              $n(
                sharesInput * (10 * store.getters.getExchangeRate()),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { currencyDisplay: 'symbol' }
              )
            }}</span>
          </PrimaryButton>
        </div>
        <!-- case 2: done funding -->
        <!-- no CTA for Demo -->
      </div>
    </div>
    <ImagesOverlay
      v-if="openImagesOverlay"
      :images="propertyData.images"
      @close="openImagesOverlay = false"
    />
    <toast-element v-if="showToast">
      {{ $t('global.copied') }}
    </toast-element>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import TackTag from '../../microComponents/TackTag.vue';
import store from '@/store';
import { useI18n } from 'vue-i18n';
import PrimaryButton from '../../microComponents/PrimaryButton.vue';
import InputNumber from 'primevue/inputnumber';
import ImagesOverlay from '../ImagesOverlay.vue';
import SpeedDial from 'primevue/speeddial';
import { useRoute } from 'vue-router';
import ToastElement from '../../microComponents/ToastElement.vue';
import useDatetime from '@/composables/useDatetime';

/* global */
const { t, n } = useI18n();
const openImagesOverlay = ref(false);
const sharesInput = ref(5); // default number of shares
const route = useRoute();
const showToast = ref(false);
const sharingPlatforms = ref([
  {
    label: t('global.share.link'),
    icon: 'link',
    command: () => {
      copyLink();
    },
  },
  {
    label: t('global.share.x'),
    image: '../src/assets/social/twitterx.png',
    alt: t('global.share.x'),
    command: () => {
      shareProperty('x');
    },
  },
]);

/* data assigning */
const props = defineProps({
  propertyData: {
    type: Object,
    required: true,
  },
});

const imageViewerPic = ref({
  link: props.propertyData.images[0].link,
  alt: props.propertyData.images[0].alt,
});

function changeImageViewer(index) {
  imageViewerPic.value = {
    link: props.propertyData.images[index].link,
    alt: props.propertyData.images[index].alt,
  };
}
// what to show in the progress bar
function getFundingProgress() {
  if (props.propertyData.fundingProgress < 100) {
    return n(
      props.propertyData.fundingProgress / 100,
      'percent',
      store.getters.getUserLocaleCurrency(),
      { minimumFractionDigits: 0 }
    );
  } else return props.propertyData.status;
}
// funding timing
function getFundingDateData() {
  const timer = useDatetime.durationUntilDate(props.propertyData.fundingClosingDate, {
    units: ['days', 'hours', 'minutes'],
  });

  if (timer.isValid) {
    if (timer.days) return t('property.hero.timer.days-left', timer.days);
    if (timer.hours) return t('property.hero.timer.hours-left', timer.hours);
    if (timer.minutes) return t('property.hero.timer.minutes-left', timer.minutes);
  } else
    return `${t('property.hero.timer.closed-on')} ${useDatetime.toLocalDate(
      props.propertyData.fundingClosingDate
    )}`;
}
function startInvestment() {
  /* start app investment flow */
}

function saveBookMark() {
  /* save bookmark */
}

function copyLink() {
  // copy link to clipboard and alert the user
  navigator.clipboard.writeText(window.location.origin + route.path).then(() => {
    showToast.value = true;
    setTimeout(() => {
      showToast.value = false;
    }, 2000);
  });
}

function shareProperty(platform) {
  /**
   * TODO v1:: make a post-ready shareable templates for each social media platform
   */
  switch (platform) {
    case 'x':
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          'check out this great investment opportunity'
        )}&url=${encodeURIComponent(import.meta.env.VITE_BASE_URL + route.path)}`,
        '_blank'
      );
      break;

    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-flow: row nowrap;
  box-shadow: var(--xlarg-shadow);
  border: 1px solid var(--dark-5);
  border-radius: 10px;
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  background-color: var(--white);

  @media #{$mq-820-down} {
    flex-flow: column nowrap;
  }

  .visuals {
    flex: 1 1 45%;
    display: flex;
    flex-flow: column nowrap;

    .imageViewer {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;

      @media #{$mq-480-down} {
        height: 12rem;
      }
    }
    .imagesSnippets {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 0;
      padding: 0;
      list-style: none;

      li {
        flex: 1 1 25%;
        margin: 0;
        margin-inline-end: 0.5rem;

        &:nth-last-child(1) {
          margin: 0;
        }

        button {
          border: 1px solid transparent;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          padding: 0;
          background-color: transparent;
          transition-duration: 0.2s;

          &:hover {
            cursor: pointer;
            scale: 1.05;
            border: 1px solid var(--dark-5);
            box-shadow: var(--medium-shadow);
          }
          img {
            border-radius: 10px;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          &:has(> .material-symbols-rounded) {
            background-color: var(--primary-5);
            color: var(--primary);

            .material-symbols-rounded {
              font-feature-settings: 'FILL' 0;
            }
          }
        }
      }
    }
  }

  .informatives {
    flex: 1 1 55%;
    display: flex;
    flex-flow: column nowrap;
    margin-inline-start: 1rem;

    @media #{$mq-820-down} {
      margin-inline-start: 0;
    }

    header {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      @media #{$mq-820-down} {
        margin: 1rem 0;
      }
      .tackTag {
        margin-inline-end: auto;
      }

      &:deep(.p-speeddial) {
        position: relative;
        transition-duration: 0.2s;
        z-index: 0;

        button {
          border: none;
          border-radius: 10px;
          color: var(--primary);
          background-color: transparent;
          transition-duration: 0.2s;

          .material-symbols-rounded {
            font-feature-settings: 'FILL' 0;
            transition-duration: 0.2s;
            font-size: 1rem;
          }

          &:hover {
            background-color: var(--primary-5);

            .material-symbols-rounded {
              font-feature-settings: 'FILL' 1;
            }
          }
        }

        &.p-speeddial-opened {
          button {
            border-radius: 50%;
          }
        }
      }
      .socialSharingBtn {
        border: none;
        border-radius: 10px !important;
        padding: 0.5rem;
        color: var(--primary);

        .material-symbols-rounded {
          font-feature-settings: 'FILL' 0;
        }

        img {
          width: 18px;
        }

        &:hover {
          cursor: pointer;
          background-color: var(--light);

          .material-symbols-rounded {
            font-feature-settings: 'FILL' 1;
          }
        }
      }
      .actionBtn {
        border: none;
        border-radius: 10px;
        background-color: transparent;
        color: var(--primary);
        transition-duration: 0.2s;

        .material-symbols-rounded {
          margin-top: 0.2rem;
          font-size: 1.3rem;
          font-variation-settings: 'FILL' 0;
          transition-duration: 0.1s;
        }
        &:hover {
          cursor: pointer;
          background-color: var(--primary-5);

          .material-symbols-rounded {
            font-variation-settings: 'FILL' 1;
          }
        }
      }
      span.viewsCounter {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-inline-start: 0.5rem;
        border-inline-start: 1px solid var(--dark-40);
        padding: 0 0.5rem;

        .material-symbols-rounded {
          margin: 0 0.2rem;
        }
      }
    }

    .REFNAQS {
      font-size: 1rem;
      margin: 0.25rem 0;
      color: var(--primary);
    }

    .propertyName {
      margin: 0;
      text-transform: capitalize;
    }

    .metrics {
      display: flex;
      flex-flow: row wrap;
      margin: 0.5rem 0;
      border: 1px solid var(--dark-20);
      border-radius: 10px;
      width: 100%;
      padding: 0.25rem;

      legend {
        text-transform: capitalize;
      }

      .metric {
        flex: 1 1 45%;
        display: flex;
        flex-direction: row;
        margin: 0.25rem;
        border-radius: 7px;
        padding: 0.3rem;
        background-color: var(--primary-5);
        font-size: 0.9rem;

        @media #{$mq-820-down} {
          flex-direction: column;
        }
        .metricValue {
          margin-inline-start: auto;
          color: var(--primary);
          font-weight: 600;

          @media #{$mq-820-down} {
            margin: unset;
          }
        }
      }
    }

    .fundingStatus {
      display: flex;
      flex-flow: column nowrap;

      .fundingMetrics {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        @media #{$mq-480-down} {
          flex-direction: column;
        }

        .equityValue {
          display: flex;
          flex-flow: column nowrap;
          margin: 0;
          margin-top: 0.5rem;

          @media #{$mq-820-down} {
            margin: 1rem 0;
          }
          .value {
            color: var(--primary);
            font-weight: 600;
          }
          sub {
            font-weight: 400;
            font-size: 0.8rem;
            color: var(--dark);
          }
        }

        .availableShares {
          margin: 0;
          margin-inline-start: auto;
          font-weight: 600;

          @media #{$mq-480-down} {
            margin: 0.25rem 0;
          }
        }

        hr {
          margin: 0.5rem;
          border: 1px solid var(--dark-20);
          height: 1rem;

          @media #{$mq-480-down} {
            display: none;
          }
        }

        .timeLeft {
          display: flex;
          align-items: center;
          color: var(--negative);

          @media #{$mq-480-down} {
            margin-top: 0.25rem;
          }
          .material-symbols-rounded {
            margin: 0;
            margin: 0 0.25rem;
          }
        }
      }

      .fundingProgress {
        position: relative;
        margin: 0.5rem 0;
        border: 1px solid var(--dark-20);
        border-radius: 5px;
        width: 100%;
        height: 1.1rem;
        background-color: var(--dark-5);
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
    }

    .cta {
      display: flex;
      flex-flow: row nowrap;

      @media #{$mq-820-down} {
        flex-flow: column nowrap;
      }

      &:deep(.p-inputnumber) {
        flex: 1 1 55%;
        margin-inline-end: 0.5rem;
        border: 1px solid var(--dark-20);
        border-radius: 10px;

        @media #{$mq-820-down} {
          margin-inline-end: unset;
          margin: 0.5rem 0;
        }

        .p-inputtext {
          border: none;
          outline: none;
          color: var(--dark);
          text-align: center;
        }
        button {
          border: none;
          background-color: transparent;

          .material-symbols-rounded {
            color: var(--primary);
          }
        }
      }
      .primaryButton {
        flex: 1 1 35%;
        background: unset;
        background-color: var(--primary);
        font-weight: 600;

        .investmentAmount {
          font-weight: 900;
        }
      }
    }
  }
}
</style>
