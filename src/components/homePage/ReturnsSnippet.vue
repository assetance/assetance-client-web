<template>
  <section class="wl">
    <header>{{ $t('home.projected-returns.tagline') }}</header>
    <h2>{{ $t('home.projected-returns.title') }}</h2>
    <p>{{ $t('home.projected-returns.description') }}</p>
    <div class="snippet">
      <div
        class="propertiesSelector"
        v-if="properties"
      >
        <swiper-container
          :space-between="10"
          :mousewheel="true"
          :keyboard="true"
          :centered-slides="true"
          :navigation="true"
          :pagination="{
            clickable: true,
          }"
          slides-per-view="auto"
          :autoplay="{
            delay: 5000,
          }"
          ref="selectorSwiper"
          events-prefix="selector-swiper-"
        >
          <swiper-slide
            v-for="property in properties"
            :key="property.propertyId"
          >
            <div class="propertyProfiler">
              <img
                :src="property.images[0].url"
                alt="property image"
              >
              <div class="idens">
                <div class="tags">
                  <TackTag>{{ property.propertyCategory }}</TackTag>
                </div>
                <address class="location">
                  {{ property.propertyLocation.city + ' ' + property.propertyLocation.state.code }}
                </address>
                <p class="rooms">
                  {{ $t('global.bedrooms', property.blueprint.rooms, { n: property.blueprint.rooms }) + ' | ' +
                    $t('global.bathrooms',
                       property.blueprint.baths, { n: property.blueprint.baths }) }}
                </p>
                <div class="RFNX">
                  # <span>{{ property.RFNX }}</span>
                </div>
              </div>
            </div>
            <div class="propertyMetrics">
              <div class="metric">
                <span class="metricName">{{ $t('metrics.aroi') }}</span>
                <span class="metricValue">{{ $n(property.metrics.AROI / 100, 'percent',
                                                store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 }) }}</span>
              </div>
              <div class="metric">
                <span class="metricName">{{ $t('metrics.nry') }}</span>
                <span class="metricValue">{{ $n(property.metrics.NRY / 100, 'percent',
                                                store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 }) }}</span>
              </div>
            </div>
            <button>{{ $t('global.view-property') }}</button>
          </swiper-slide>
        </swiper-container>
      </div>
      <div class="calculator">
        <div class="informatives">
          <div class="displayers">
            <apexchart
              type="bar"
              :options="options"
              :series="series"
            />
          </div>
          <div class="selectors">
            <div class="investmentMetrics">
              <div class="metric">
                <span class="metricName">{{ $t('home.projected-returns.yearly-income') }}</span>
                <!-- <span class="metricValue">$ {{ yearlyIncome }}</span> -->
                <span class="metricValue">{{ $n(yearlyIncome * store.getters.getExchangeRate(), "currency",
                                                store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 }) }}</span>
              </div>
              <div class="metric">
                <span class="metricName">{{ $t('home.projected-returns.total-returns') }}</span>
                <!-- <span class="metricValue">$ {{ totalReturns }}</span> -->
                <span class="metricValue">{{ $n(totalReturns * store.getters.getExchangeRate(), "currency",
                                                store.getters.getUserLocaleCurrency(), { minimumFractionDigits: 0 }) }}</span>
              </div>
            </div>
            <div class="selector">
              <div class="selectorInformatives">
                <label
                  for="investment"
                  class="selectorMetric"
                >
                  {{ $t('home.projected-returns.investment-amount') }}
                  <span class="material-symbols-rounded"> info </span>
                </label>
                <p class="selectorValue">
                  {{ $n(investmentAmount, 'currency', store.getters.getUserLocaleCurrency(),
                        { minimumFractionDigits: 0 }) }}
                </p>
              </div>
              <input
                type="range"
                name="investment"
                id="investment"
                min="10"
                max="10000"
                step="10"
                v-model.number="investmentAmount"
                ref="investmentInput"
              >
            </div>
            <div class="selector">
              <div class="selectorInformatives">
                <label
                  for="appreciation"
                  class="selectorMetric"
                >
                  {{ $t('home.projected-returns.annual-appreciation-rate') }}
                  <span class="material-symbols-rounded"> info </span>
                </label>
                <p class="selectorValue">
                  {{ $n(appreciationRate / 100, 'percent', store.getters.getUserLocaleCurrency())
                  }}
                </p>
              </div>
              <input
                type="range"
                name="appreciation"
                id="appreciation"
                min="0"
                max="50"
                v-model.number="appreciationRate"
                ref="appreciationRateInput"
              >
            </div>
            <div class="selector">
              <div class="selectorInformatives">
                <label
                  for="holding"
                  class="selectorMetric"
                >
                  {{ $t('home.projected-returns.hold-period') }}
                  <span class="material-symbols-rounded"> info </span>
                </label>
                <p class="selectorValue">
                  {{ holdPeriod }}<span> {{ $t('home.projected-returns.years') }}</span>
                </p>
              </div>
              <input
                type="range"
                name="holding"
                id="holding"
                min="3"
                max="15"
                v-model.number="holdPeriod"
              >
            </div>
          </div>
        </div>
        <details class="notice">
          <summary><strong>{{ $t('home.projected-returns.important-notice') }}</strong></summary>
          <p>{{ $t('home.projected-returns.notice-message') }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
import TackTag from '@/components/microComponents/TackTag.vue';
import { computed, ref, onMounted } from 'vue';
import getPropertySnapshot from '@/services/getPropertySnapshot.js';
import store from '../../store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// calculations helper
const calculate = {
  yearlyIncome(investment, nry) {
    return toFixedNumber(investment * (nry / 100), 0, undefined);
  },
  appreciation(investment, yar, hold) {
    let appreciation = 0;
    for (let i = 0; i < hold; i++) {
      appreciation += (investment + appreciation) * (yar / 100);
    }
    return toFixedNumber(appreciation, 0, undefined);
  },
  totalReturns(investment, nry, yar, hold) {
    let yIncome = this.yearlyIncome(investment, nry);
    let totalAppreciation = this.appreciation(investment, yar, hold);
    return [yIncome * hold + totalAppreciation, yIncome, totalAppreciation];
  },
};

// slider linker
const currentIndex = ref(0);
const selectorSwiper = ref(null);
// propertiesData
const properties = ref(await getPropertySnapshot.getAll());
// inputs
const investmentInput = ref(null);
const investmentAmount = ref(1000);
const holdPeriod = ref(3);
const appreciationRateInput = ref(null);
const appreciationRate = ref(properties.value[currentIndex.value].metrics.ZIP10YAR);
// displayers
const yearlyIncome = computed(() => {
  return calculate.yearlyIncome(investmentAmount.value, properties.value[currentIndex.value].metrics.NRY);
});
const totalReturns = computed(() => {
  return calculate.totalReturns(
    investmentAmount.value,
    properties.value[currentIndex.value].metrics.NRY,
    appreciationRate.value,
    holdPeriod.value
  )[0];
});
// apexCharts data
const options = ref({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: true,
    },
  },
  colors: ['#0B212E', '#0056e0'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 7,
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900,
          },
        },
      },
    },
  },
  xaxis: {
    type: 'category',
    categories: [`3 ${t('home.projected-returns.years')}`, `6 ${t('home.projected-returns.years')}`, `9 ${t('home.projected-returns.years')}`, `12 ${t('home.projected-returns.years')}`],
  },
  legend: {
    offsetY: 5,
  },
  fill: {
    opacity: 1,
  },
});
const series = ref([
  {
    name: t('home.projected-returns.yearly-income'),
    data: [
      calculate.yearlyIncome(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.NRY
      ) * 3,
      calculate.yearlyIncome(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.NRY
      ) * 6,
      calculate.yearlyIncome(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.NRY
      ) * 9,
      calculate.yearlyIncome(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.NRY
      ) * 12,
    ],
  },
  {
    name: t('home.projected-returns.value'),
    data: [
      calculate.appreciation(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.ZIP10YAR,
        3
      ),
      calculate.appreciation(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.ZIP10YAR,
        6
      ),
      calculate.appreciation(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.ZIP10YAR,
        9
      ),
      calculate.appreciation(
        investmentAmount.value,
        properties.value[currentIndex.value].metrics.ZIP10YAR,
        12
      ),
    ],
  },
]);

onMounted(async () => {
  selectorSwiper.value.addEventListener('selector-swiper-slidechange', () => {
    currentIndex.value = selectorSwiper.value.swiper.realIndex;
    appreciationRate.value = properties.value[currentIndex.value].metrics.ZIP10YAR;

    updateGraph();
  });
  investmentInput.value.addEventListener('mouseup', () => {
    updateGraph();
  });
  investmentInput.value.addEventListener('touchend', () => {
    updateGraph();
  });
  appreciationRateInput.value.addEventListener('mouseup', () => {
    updateGraph(appreciationRate.value);
  });
  appreciationRateInput.value.addEventListener('touchend', () => {
    updateGraph(appreciationRate.value);
  });
});

// helpers
function updateGraph(ZIP10YAR = properties.value[currentIndex.value].metrics.ZIP10YAR) {
  series.value = [
    {
      name: t('home.projected-returns.yearly-income'),
      data: [
        calculate.yearlyIncome(
          investmentAmount.value,
          properties.value[currentIndex.value].metrics.NRY
        ) * 3,
        calculate.yearlyIncome(
          investmentAmount.value,
          properties.value[currentIndex.value].metrics.NRY
        ) * 6,
        calculate.yearlyIncome(
          investmentAmount.value,
          properties.value[currentIndex.value].metrics.NRY
        ) * 9,
        calculate.yearlyIncome(
          investmentAmount.value,
          properties.value[currentIndex.value].metrics.NRY
        ) * 12,
      ],
    },
    {
      name: t('home.projected-returns.value'),
      data: [
        calculate.appreciation(investmentAmount.value, ZIP10YAR, 3),
        calculate.appreciation(investmentAmount.value, ZIP10YAR, 6),
        calculate.appreciation(investmentAmount.value, ZIP10YAR, 9),
        calculate.appreciation(investmentAmount.value, ZIP10YAR, 12),
      ],
    },
  ];
}
function toFixedNumber(num, digits = 2, base = 10) {
  const pow = Math.pow(base ?? 10, digits);
  return Math.round(num * pow) / pow;
}
</script>

<style lang="scss" scoped>
section.wl {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

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
    margin-top: 0.5rem;
    border-radius: 10px;
    box-shadow: var(--primary-larg-shadow);
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 700;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);

    @media #{$mq-820-down} {
      font-size: 1.5rem;
    }
  }

  .snippet {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    width: 100%;

    @media #{$mq-820-down} {
      flex-flow: column nowrap;
      align-items: center;
    }

    .propertiesSelector {
      border: 1px solid var(--dark-5);
      border-radius: 10px;
      width: 100%;
      height: auto;
      overflow: hidden;

      swiper-container {
        position: relative;
        height: 100%;
        padding: 0.5rem 0rem 2rem 0rem;
        z-index: 0;

        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          width: 15%;
          height: 100%;
          background: linear-gradient(270deg, var(--dark-5) 0%, transparent 90%);
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 15%;
          height: 100%;
          background: linear-gradient(90deg, var(--dark-5) 0%, transparent 90%);
        }

        swiper-slide {
          display: flex;
          flex-flow: column nowrap;
          justify-content: flex-start;
          align-items: center;
          border: 1px solid var(--primary-20);
          border-radius: 10px;
          max-width: 18rem;
          width: 100%;
          padding: 0.5rem;
          background-color: var(--light);
          opacity: 0.5;

          &.swiper-slide-active {
            box-shadow: var(--larg-shadow);
            border: 1px solid var(--primary-40);
            scale: 1.02;
            opacity: 1;
          }

          .propertyProfiler {
            display: flex;
            flex-flow: row nowrap;
            width: 100%;

            img {
              border-radius: 10px;
              width: 49%;
              object-fit: cover;
            }

            .idens {
              margin-inline-start: 0.5rem;
              width: 50%;

              .tags {
                display: flex;
                flex-flow: row wrap;
              }

              .RFNX {
                border: 1px solid var(--primary-5);
                border-radius: 4px;
                margin: 0.5rem 0rem;
                width: fit-content;
                padding: 0rem 0.2rem;
                background-color: var(--secondary);
                color: var(--accent);
                font-weight: 400;
                font-size: 0.7rem;
              }

              .location {
                margin: 0.5rem 0rem;
              }

              .rooms {
                margin: 0;
                font-size: 0.6rem;
                color: var(--dark-70);
              }
            }
          }

          .propertyMetrics {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            width: 100%;

            .metric {
              position: relative;
              display: flex;
              margin: 0.5rem 0rem;
              border: 1px solid var(--dark-5);
              border-radius: 7px;
              width: 100%;
              padding: 0.5rem 0.3rem;
              background-color: var(--primary-5);
              color: var(--primary);

              &:nth-child(1) {
                margin-inline-end: 0.3rem;
              }

              /**
                metricName style 1
              */
              // .metricName {
              //   position: absolute;
              //   top: -5px;
              //   border-radius: 5px;
              //   padding: 0.3rem;
              //   background-color: var(--dark);
              //   color: var(--light);
              // }
              /**
                metricName style 2
              */
              .metricName {
                color: var(--dark-70);
                font-weight: 500;
              }

              .metricValue {
                margin-inline-start: auto;
                font-weight: 500;
              }
            }
          }

          &>button {
            border: none;
            border-radius: 7px;
            width: 100%;
            height: 100%;
            padding: 0.5rem 1rem;
            background-color: var(--dark);
            color: var(--light);
            transition-duration: 0.2s;

            &:hover {
              cursor: pointer;
              scale: 1.02;
              box-shadow: var(--small-shadow);
            }

            &:active {
              scale: 0.99;
            }
          }
        }

        &::part(container) {
          overflow: unset;
        }

        &::part(pagination) {
          bottom: -2rem;
        }

        &::part(bullet) {
          border-radius: 7px;
          width: 15px;
          height: 8px;
          transition-duration: 0.5s;
        }

        &::part(bullet-active) {
          border-radius: 7px;
          width: 25px;
          height: 8px;
          transition-duration: 0.5s;
        }

        &::part(button-prev) {
          z-index: 5;
        }

        &::part(button-next) {
          z-index: 5;
        }
      }
    }

    .calculator {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      border: 1.5px solid var(--dark-5);
      border-radius: 10px;
      margin: 0.5rem;
      padding: 0.5rem;
      width: 100%;

      .informatives {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        justify-content: space-evenly;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
        }

        .displayers {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          border: 1px solid var(--dark-5);
          border-radius: 10px;
          max-width: 400px;
          width: 100%;
          height: 17rem;
          background-color: var(--primary-5);

          @media #{$mq-820-down} {
            border: none;
            max-width: unset;
          }

          .vue-apexcharts {
            max-width: 430px;
            width: 100%;
          }
        }

        .selectors {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          margin-inline-start: 0.5rem;
          width: 100%;

          @media #{$mq-820-down} {
            margin: 0.5rem 0rem;
          }

          .investmentMetrics {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;
            margin-bottom: 1rem;
            width: 100%;

            @media #{$mq-480-down} {
              flex-flow: column nowrap;
            }

            .metric {
              position: relative;
              display: flex;
              align-items: center;
              border: 1px solid var(--dark-5);
              border-radius: 7px;
              width: 100%;
              height: 100%;
              padding: 0.5rem 0.5rem;
              background-color: var(--primary-5);
              color: var(--primary);

              &:nth-child(1) {
                margin-inline-end: 0.5rem;

                @media #{$mq-480-down} {
                  margin: 0;
                  margin-bottom: 0.5rem;
                }
              }

              /**
                metricName style 1
              */
              // .metricName {
              //   position: absolute;
              //   top: -5px;
              //   border-radius: 5px;
              //   padding: 0.3rem;
              //   background-color: var(--dark);
              //   color: var(--light);
              // }
              /**
                metricName style 2
              */
              .metricName {
                color: var(--dark-70);
                font-weight: 500;
              }

              .metricValue {
                margin-inline-start: auto;
                font-weight: 500;
              }
            }
          }

          .selector {
            display: flex;
            flex-flow: column nowrap;
            margin: 0.2rem 0rem;
            width: 100%;

            .selectorInformatives {
              display: flex;
              flex-flow: row nowrap;
              width: 100%;

              .selectorMetric {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: 0.2rem 0.5rem;
                font-size: 1rem;
                font-weight: 500;

                span.material-symbols-rounded {
                  margin-inline-start: 0.5rem;
                  font-size: 1rem;
                  color: var(--dark-70);

                  &:hover {
                    cursor: pointer;
                  }
                }
              }

              .selectorValue {
                margin: 0;
                margin-inline-start: auto;
                border: 1px solid var(--dark-5);
                border-radius: 7px;
                padding: 0.5rem;
                font-weight: 500;
                background-color: var(--primary-5);
                color: var(--primary);
              }
            }

            input[type='range'] {
              appearance: none;
              margin-top: 0.5rem;
              outline: none;
              border-radius: 5px;
              width: 100%;
              height: 0.5rem;
              background-color: var(--dark-5);
              transition-duration: 0.3s;

              &:hover {
                background-color: var(--primary-20);
                cursor: pointer;
              }

              // webkit
              &::-webkit-slider-thumb {
                appearance: none;
                cursor: grab;
                border-radius: 100%;
                width: 1.5rem;
                height: 1.5rem;
                background: var(--primary);
              }

              &:hover::-webkit-slider-thumb {
                background: var(--accent-primary);
              }

              &:active::-webkit-slider-thumb {
                cursor: grabbing;
              }

              // moz
              &::-moz-range-thumb {
                appearance: none;
                cursor: grab;
                border-radius: 100%;
                width: 1.5rem;
                height: 1.5rem;
                background: var(--primary);
              }

              &:hover::-moz-range-thumb {
                background: var(--accent-primary);
              }

              &:active::-moz-range-thumb {
                cursor: grabbing;
              }
            }
          }
        }
      }

      details.notice {
        border: 1px solid var(--dark-5);
        border-radius: 10px;
        margin-top: 0.5rem;
        width: 100%;
        max-height: 2.5rem;
        padding: 0.5rem;
        background-color: var(--secondary);
        overflow: hidden;
        transition-duration: 0.5s;

        summary {
          display: block;
          padding-left: 1.2rem;
          position: relative;
          cursor: pointer;

          &::before {
            content: '';
            position: absolute;
            border-width: 0.4rem;
            border-style: solid;
            border-color: transparent transparent transparent var(--dark-70);
            top: 0.3rem;
            left: 0.3rem;
            transform: rotate(0);
            transform-origin: 0.2rem 50%;
            transition: 0.25s transform ease;
          }
        }

        p {
          font-size: 0.85rem;
        }

        &[open]>summary::before {
          transform: rotate(90deg);
        }

        &[open] {
          max-height: 20rem;
          transition-duration: 0.5s;
        }
      }
    }
  }
}
</style>
