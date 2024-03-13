<template>
  <article class="propertyMainInfo">
    <!-- current status -->
    <h1>{{ $t('property.info-section.financials.financials') }}</h1>
    <!-- offering details -->
    <div class="offeringDtails">
      <!-- historical data -->
      <div class="historicals">
        <h2>{{ $t('property.info-section.financials.historicals.historicals') }}</h2>
        <!-- valuation -->
        <div class="historicalData">
          <h3>{{ $t('property.info-section.financials.historicals.historical-valuation') }}</h3>
          <apexchart
            :options="valuationData.options"
            :series="valuationData.series"
          />
        </div>
        <!-- rent income -->
        <div class="historicalData">
          <h3>
            {{
              $t('property.info-section.financials.historicals.historical-annual-rental-returns')
            }}
          </h3>
          <apexchart
            :options="rentalData.options"
            :series="rentalData.series"
          />
        </div>
      </div>
      <!-- common metrics -->
      <fieldset class="metrics">
        <legend>{{ $t('property.info-section.financials.metrics') }}</legend>
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
            $n(metric.value / 100, metric.type, store.getters.getUserLocaleCurrency(), {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })
          }}</span>
        </div>
      </fieldset>
      <!-- offering details -->
      <div class="fundingData">
        <h2>{{ $t('property.info-section.financials.offering-details.offering-details') }}</h2>
        <!-- features -->
        <aside>
          <div class="status">
            <span class="material-symbols-rounded iconLtr"> price_check </span>
            <span>
              {{ $t('property.info-section.financials.offering-details.closing-at') }}
              <time
                :datetime="useDatetime.localizeISO(propertyData.fundingClosingDate)"
                class="value"
              >{{ useDatetime.toLocalDate(propertyData.fundingClosingDate) }}</time>
            </span>
          </div>
          <div class="status">
            <span class="material-symbols-rounded"> hourglass_empty </span>
            <span>
              {{ $t('property.info-section.financials.offering-details.exit-estimation') }} :
              <time
                v-if="useDatetime.durationUntilDate(propertyData.exitEstimation.from).years > 1"
                :datetime="
                  useDatetime.durationUntilDate(propertyData.exitEstimation.from).durationISO
                "
                class="value"
              >{{ useDatetime.durationUntilDate(propertyData.exitEstimation.from).years }} -
              </time>
              <time
                :datetime="
                  useDatetime.durationUntilDate(propertyData.exitEstimation.to).durationISO
                "
                class="value"
              >{{ useDatetime.durationUntilDate(propertyData.exitEstimation.to).years }}</time>
            </span>
          </div>
          <div class="status">
            <span class="material-symbols-rounded"> group </span>
            <span>
              <span class="value">{{ propertyData.investors }}</span>
              {{
                $t(
                  'property.info-section.financials.offering-details.investors',
                  propertyData.investors
                )
              }}
            </span>
          </div>
        </aside>
        <!-- details -->
        <Panel toggleable>
          <template #header>
            <span>{{
              $t('property.info-section.financials.offering-details.total-funding-amount')
            }}</span>
            <span class="value">{{
              $n(
                (propertyData.fundingPrice / 100) * store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency()
              )
            }}</span>
          </template>
          <DataTable
            :value="propertyData.offeringDetails"
            striped-rows
          >
            <Column
              field="name"
              :header="$t('property.info-section.financials.offering-details.expenses')"
            >
              <template #body="slotProps">
                <span
                  v-tippy="{
                    content: slotProps.data.description,
                  }"
                  class="tooltip"
                >{{ slotProps.data.name }}</span>
              </template>
            </Column>
            <Column :header="$t('property.info-section.financials.offering-details.amount')">
              <template #body="slotProps">
                <span>{{
                  $n(
                    (slotProps.data.amount / 100) * store.getters.getExchangeRate(),
                    'decimal',
                    store.getters.getUserLocaleCurrency()
                  )
                }}</span>
              </template>
            </Column>
          </DataTable>
        </Panel>
      </div>
      <!-- rental details -->
      <div class="fundingData">
        <h2>{{ $t('property.info-section.financials.rental-returns.rental-returns') }}</h2>
        <!-- featuers -->
        <aside>
          <div class="status">
            <span class="material-symbols-rounded"> license </span>
            <span>
              {{ $t('property.info-section.financials.rental-returns.rental-guarantee') }}
              <time
                :datetime="propertyData.rentalGuarantee"
                class="value"
              >{{ useDatetime.durationISOToObj(propertyData.rentalGuarantee).months }}
                {{ $t('global.durations.months') }}</time>
            </span>
          </div>
          <div class="status">
            <span class="material-symbols-rounded"> schedule </span>
            <span>
              <span v-if="!propertyData.rentalStartDate.isSolid">{{
                $t('property.info-section.financials.rental-returns.anticipated-rent-start-date')
              }}</span>
              <span v-else>{{ $t('property.info-section.financials.rental-returns.rent-start-date') }}
              </span>
              &nbsp;
              <time
                :datetime="useDatetime.localizeISO(propertyData.rentalStartDate.date)"
                class="value"
              >{{ useDatetime.toLocalDate(propertyData.rentalStartDate.date) }}</time>
            </span>
          </div>
        </aside>
        <!-- details -->
        <Panel toggleable>
          <template #header>
            <span>{{
              $t('property.info-section.financials.rental-returns.net-rental-returns')
            }}</span>
            <span class="value">{{
              $n(
                (propertyData.incomeReturns / 100) * store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { minimumFractionDigits: 0 }
              )
            }}</span>
          </template>
          <DataTable
            :value="propertyData.rentalReturns"
            striped-rows
          >
            <Column
              field="name"
              :header="$t('property.info-section.financials.rental-returns.origin')"
            >
              <template #body="slotProps">
                <span
                  v-tippy="{
                    content: slotProps.data.description,
                  }"
                  class="tooltip"
                >{{ slotProps.data.name }}</span>
              </template>
            </Column>
            <Column :header="$t('property.info-section.financials.rental-returns.amount')">
              <template #body="slotProps">
                <span>{{
                  $n(
                    (slotProps.data.amount / 100) * store.getters.getExchangeRate(),
                    'decimal',
                    store.getters.getUserLocaleCurrency()
                  )
                }}</span>
              </template>
            </Column>
          </DataTable>
        </Panel>
      </div>
      <!-- returns calculator -->
      <div class="returnsCalculator">
        <h2>{{ $t('property.info-section.financials.returns-calculator.returns-calculator') }}</h2>
        <div class="calculator">
          <!-- viewer -->
          <div class="chart">
            <apexchart
              :options="calcChart.options"
              :series="calcChart.series"
            />
          </div>
          <!-- input fields -->
          <div class="inputs">
            <SliderInput
              v-model:value.lazy="calcInputs.investmentAmount.value"
              name="investmentAmount"
              :min="10 * store.getters.getExchangeRate()"
              :max="50000 * store.getters.getExchangeRate()"
              :step="10 * store.getters.getExchangeRate()"
              :ref="calcInputs.investmentAmount.ref"
            >
              <template #label>
                <span
                  class="tooltip"
                  v-tippy="{
                    content: $t(
                      'property.info-section.financials.returns-calculator.investment-description'
                    ),
                  }"
                >
                  {{ $t('property.info-section.financials.returns-calculator.investment') }}
                </span>
              </template>
              <template #value>
                {{
                  $n(
                    calcInputs.investmentAmount.value,
                    'currency',
                    store.getters.getUserLocaleCurrency(),
                    { minimumFractionDigits: 0 }
                  )
                }}
              </template>
            </SliderInput>
            <SliderInput
              v-model:value="calcInputs.appreciationRate.value"
              name="appreciationRate"
              :min="0"
              :max="30"
              :step="0.2"
              :ref="calcInputs.appreciationRate.ref"
            >
              <template #label>
                <span
                  class="tooltip"
                  v-tippy="{
                    content: $t(
                      'property.info-section.financials.returns-calculator.appreciation-rate-description'
                    ),
                  }"
                >
                  {{ $t('property.info-section.financials.returns-calculator.appreciation-rate') }}
                </span>
              </template>
              <template #value>
                {{
                  $n(
                    calcInputs.appreciationRate.value / 100,
                    'percent',
                    store.getters.getUserLocaleCurrency(),
                    { minimumFractionDigits: 2 }
                  )
                }}
              </template>
            </SliderInput>
            <SliderInput
              v-model:value="calcInputs.netRentYield.value"
              name="netRentYield"
              :min="0"
              :max="30"
              :step="0.2"
              :ref="calcInputs.netRentYield.ref"
            >
              <template #label>
                <span
                  class="tooltip"
                  v-tippy="{
                    content: $t(
                      'property.info-section.financials.returns-calculator.rent-yield-description'
                    ),
                  }"
                >
                  {{ $t('property.info-section.financials.returns-calculator.rent-yield') }}
                </span>
              </template>
              <template #value>
                {{
                  $n(
                    calcInputs.netRentYield.value / 100,
                    'percent',
                    store.getters.getUserLocaleCurrency(),
                    { minimumFractionDigits: 2 }
                  )
                }}
              </template>
            </SliderInput>
            <SliderInput
              v-model:value="calcInputs.holdPeriod.value"
              name="holdPeriod"
              :min="1"
              :max="15"
              :step="1"
              :ref="calcInputs.holdPeriod.ref"
            >
              <template #label>
                <span
                  class="tooltip"
                  v-tippy="{
                    content: $t(
                      'property.info-section.financials.returns-calculator.hold-period-description'
                    ),
                  }"
                >
                  {{ $t('property.info-section.financials.returns-calculator.hold-period') }}
                </span>
              </template>
              <template #value>
                {{ calcInputs.holdPeriod.value }}
              </template>
            </SliderInput>
            <div class="result">
              <span
                class="tooltip"
                v-tippy="{
                  content: $t(
                    'property.info-section.financials.returns-calculator.yearly-income-description'
                  ),
                }"
              >{{ $t('property.info-section.financials.returns-calculator.yearly-income') }}</span>
              <span class="value">
                {{
                  $n(yearlyIncome, 'currency', store.getters.getUserLocaleCurrency(), {
                    minimumFractionDigits: 0,
                  })
                }}
              </span>
            </div>
            <div class="result">
              <span
                class="tooltip"
                v-tippy="{
                  content: $t(
                    'property.info-section.financials.returns-calculator.total-profits-description'
                  ),
                }"
              >{{ $t('property.info-section.financials.returns-calculator.total-profits') }}</span>
              <span class="value">
                {{
                  $n(totalReturns, 'currency', store.getters.getUserLocaleCurrency(), {
                    minimumFractionDigits: 0,
                  })
                }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { inject, ref, computed, watch } from 'vue';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import store from '@/store';
import SliderInput from '../../microComponents/SliderInput.vue';
import useDatetime from '@/composables/useDatetime';
import { useI18n } from 'vue-i18n';

const { t, n } = useI18n();

// injecting fetched property data <PropertyShowcase.vue>
const propertyData = await inject('propertyData');

const currency = ref(n(2, 'currency', store.getters.getUserLocaleCurrency()).slice(0, 3));

/* historical valuation data */
const valuationData = {
  options: {
    chart: {
      type: 'line',
      id: 'historicalValuationChart',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: true,
        tools: {
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
        export: {
          csv: {
            filename: `${t(
              'property.info-section.financials.historicals.exportable-historical-valuation'
            )} #${propertyData.value.REFNAQS} - Assetance`,
            headerCategory: 'dates',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: `${t(
              'property.info-section.financials.historicals.exportable-historical-valuation'
            )} #${propertyData.value.REFNAQS} - Assetance`,
          },
          png: {
            filename: `${t(
              'property.info-section.financials.historicals.exportable-historical-valuation'
            )} #${propertyData.value.REFNAQS} - Assetance`,
          },
        },
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0],
        top: 2,
        blur: 2,
        color: '#0056e0',
        opacity: 0.2,
      },
    },
    legend: {
      offsetY: 7,
      itemMargin: {
        vertical: 10,
      },
    },
    colors: ['#0056e0', '#0b212e', '#47b6fe'],
    fill: {
      type: ['solid', 'gradient', 'gradient'],
      // if type gradient
      gradient: {
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#0056e0',
            },
          ],
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#0b212e',
            },
          ],
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#47b6fe',
            },
          ],
        ],
      },
      // if type pattern
      pattern: {
        style: 'verticalLines',
        width: 7,
        strokeWidth: 5,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'round',
      width: 4,
    },
    xaxis: {
      type: 'datetime',
      categories: propertyData.value.valuationData.dataPoints,
      tooltip: { enabled: false },
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MM/yy',
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      title: {
        text: currency.value, // localize
      },
      forceNiceScale: true,
      labels: {
        formatter: (value) => {
          // localize this number
          return getSuffixedNumber(value * store.getters.getExchangeRate());
        },
      },
    },
    markers: {
      size: 0.1,
      hover: {
        sizeOffset: 3,
      },
      discrete: [
        {
          seriesIndex: 0,
          // dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#0056e0',
          size: 5,
          shape: 'circle',
        },
        {
          seriesIndex: 1,
          // dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#0b212e',
          size: 5,
          shape: 'circle',
        },
        {
          seriesIndex: 2,
          // dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.valuationData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#47b6fe',
          size: 5,
          shape: 'circle',
        },
      ],
    },
    grid: {
      show: true,
      position: 'back',
      strokeDashArray: 10,
      column: {
        colors: [
          '#eaeaea',
          '#eaeaea',
          '#eaeaea',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
        ],
        opacity: 0.9,
      },
    },
    /* 
    forecastDataPoints: { // forecasting ability
      count: 4,
      fillOpacity: 0.5,
      strokeWidth: 1,
      dashArray: 5,
    }
    */
  },
  series: getSeriesData(propertyData.value.valuationData),
};
const rentalData = {
  options: {
    chart: {
      type: 'line',
      id: 'historicalRentalsChart',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: true,
        tools: {
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
        export: {
          csv: {
            filename: `t('property.info-section.financials.historicals.exportable-historical-annual-rental-returns') #${propertyData.value.REFNAQS} - Assetance`,
            headerCategory: 'dates',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: `t('property.info-section.financials.historicals.exportable-historical-annual-rental-returns') #${propertyData.value.REFNAQS} - Assetance`,
          },
          png: {
            filename: `t('property.info-section.financials.historicals.exportable-historical-annual-rental-returns') #${propertyData.value.REFNAQS} - Assetance`,
          },
        },
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0],
        top: 2,
        blur: 2,
        color: '#0056e0',
        opacity: 0.2,
      },
    },
    legend: {
      offsetY: 7,
      itemMargin: {
        vertical: 10,
      },
    },
    colors: ['#0056e0', '#0b212e', '#47b6fe'],
    fill: {
      type: ['solid', 'gradient', 'gradient'],
      // if type gradient
      gradient: {
        stops: [0, 100],
        colorStops: [
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#0056e0',
            },
          ],
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#0b212e',
            },
          ],
          [
            {
              offset: 0,
              opacity: 0.2,
              color: '#47b6fe',
            },
            {
              offset: 50,
              opacity: 1,
              color: '#47b6fe',
            },
          ],
        ],
      },
      // if type pattern
      pattern: {
        style: 'verticalLines',
        width: 7,
        strokeWidth: 5,
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'round',
      width: 4,
    },
    xaxis: {
      type: 'datetime',
      categories: propertyData.value.rentalData.dataPoints,
      tooltip: { enabled: false },
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MM/yy',
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      title: {
        text: currency.value, // localize
      },
      forceNiceScale: true,
      labels: {
        formatter: (value) => {
          // localize this number
          return getSuffixedNumber(value * store.getters.getExchangeRate());
        },
      },
    },
    markers: {
      size: 0.1,
      hover: {
        sizeOffset: 3,
      },
      discrete: [
        {
          seriesIndex: 0,
          // dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#0056e0',
          size: 5,
          shape: 'circle',
        },
        {
          seriesIndex: 1,
          // dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#0b212e',
          size: 5,
          shape: 'circle',
        },
        {
          seriesIndex: 2,
          // dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1 - 4, // - 4 is for the last known data point, after that it's a prediction
          dataPointIndex: propertyData.value.rentalData.dataPoints.length - 1,
          fillColor: '#fff',
          strokeColor: '#47b6fe',
          size: 5,
          shape: 'circle',
        },
      ],
    },
    grid: {
      show: true,
      position: 'back',
      strokeDashArray: 10,
      column: {
        colors: [
          '#eaeaea',
          '#eaeaea',
          '#eaeaea',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
        ],
        opacity: 0.9,
      },
    },
    tooltip: {
      x: {
        format: 'yyyy',
      },
    },
    /* 
    forecastDataPoints: { // forecasting ability
      count: 4,
      fillOpacity: 0.5,
      strokeWidth: 1,
      dashArray: 5,
    }
    */
  },
  series: getSeriesData(propertyData.value.rentalData),
};

function getSeriesData(dataObj) {
  let resArray = [];

  // property valuation
  if (dataObj.propertyData)
    resArray.push({
      name: t('property.info-section.financials.historicals.property'),
      data: dataObj.propertyData,
    });
  // zip code
  if (dataObj.zipAvgData)
    resArray.push({
      name: t('property.info-section.financials.historicals.zip-avg'),
      data: dataObj.zipAvgData,
    });
  // country
  if (dataObj.stateAvgData)
    resArray.push({
      name: `${propertyData.value.location.country} ${t(
        'property.info-section.financials.historicals.avg'
      )}`,
      data: dataObj.stateAvgData,
    });

  return resArray;
}
function getSuffixedNumber(number) {
  const kThreshold = 1000;
  const mThreshold = 1000000;
  let num = number / 100; // in DB money amount is stored in cents

  if (num >= mThreshold) {
    return `${n(num / mThreshold, 'decimal', store.getters.getUserLocaleCurrency())}M`;
  } else if (num >= kThreshold) {
    return `${n(num / kThreshold, 'decimal', store.getters.getUserLocaleCurrency())}K`;
  } else return `${n(num, 'decimal', store.getters.getUserLocaleCurrency())}`;
}

/* returns calculator */
// metrics
const nry = propertyData.value.metrics.find((metric) => {
  return metric.lable == 'NRY';
}).value;
const yar = propertyData.value.metrics.find((metric) => {
  return metric.lable === 'ZIP10YAR';
}).value;

// calculation helpers
const calculate = {
  yearlyIncome(investment, nry) {
    return investment * (nry / 100);
  },
  appreciation(investment, yar, hold) {
    /**
     * TODO:: validate math
     */
    let appreciation = 0;
    for (let i = 0; i < hold; i++) {
      appreciation += (investment + appreciation) * (yar / 100);
    }
    return appreciation;
  },
  totalReturns(investment, nry, yar, hold) {
    let yIncome = this.yearlyIncome(investment, nry);
    let totalAppreciation = this.appreciation(investment, yar, hold);
    return [yIncome * hold + totalAppreciation, yIncome, totalAppreciation];
  },
};

// inputs data and props
const calcInputs = ref({
  investmentAmount: {
    ref: null,
    value: 1000 * store.getters.getExchangeRate(),
  },
  appreciationRate: {
    ref: null,
    value: yar,
  },
  netRentYield: {
    ref: null,
    value: nry,
  },
  holdPeriod: {
    ref: null,
    value: 5,
  },
});

// results
const yearlyIncome = computed(() => {
  return calculate.yearlyIncome(
    calcInputs.value.investmentAmount.value,
    calcInputs.value.netRentYield.value
  );
});
const totalReturns = computed(() => {
  return calculate.totalReturns(
    calcInputs.value.investmentAmount.value,
    calcInputs.value.netRentYield.value,
    calcInputs.value.appreciationRate.value,
    calcInputs.value.holdPeriod.value
  )[0];
});

// chart viewer
const calcChart = ref({
  options: {
    chart: {
      type: 'bar',
      stacked: true,
      id: 'calcolatorChart',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: true,
        tools: {
          selection: false,
          zoom: true,
          zoomin: false,
          zoomout: false,
          pan: false,
        },
        export: {
          csv: {
            filename: `historical valuation data of property #${propertyData.value.REFNAQS} - Assetance`,
            headerCategory: 'dates',
            headerValue: 'value',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
          svg: {
            filename: `historical valuation data of property #${propertyData.value.REFNAQS} - Assetance`,
          },
          png: {
            filename: `historical valuation data of property #${propertyData.value.REFNAQS} - Assetance`,
          },
        },
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: [0, 1, 2],
        top: 2,
        blur: 5,
        color: '#0056e0',
        opacity: 0.2,
      },
    },
    /**
     * untill knowing how to fix Apexchars styling in RTL
     */
    // title: {
    //   text: t('property.info-section.financials.returns-calculator.collective-returns'),
    // },
    legend: {
      offsetY: 7,
      itemMargin: {
        vertical: 10,
      },
      markers: {
        fillColors: ['#0056e0', '#0b212e', '#47b6fe'],
      },
    },
    colors: [
      '#0056e0',
      '#0b212e',
      ({ value, seriesIndex, w }) => {
        if (value < 0) return '#ff0000';
        else return '#47b6fe';
      },
    ],
    stroke: {
      show: true,
      width: 0.5,
      curve: ['smooth'],
      colors: ['#fff'],
    },
    xaxis: {
      type: 'category',
      categories: [
        t('property.info-section.financials.returns-calculator.3yrs'),
        t('property.info-section.financials.returns-calculator.6yrs'),
        t('property.info-section.financials.returns-calculator.9yrs'),
        t('property.info-section.financials.returns-calculator.12yrs'),
      ],
      tooltip: { enabled: false },
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MM/yy',
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    },
    yaxis: {
      title: {
        text: currency.value, // localize
      },
      forceNiceScale: true,
      labels: {
        show: false,
        formatter: (value) => {
          // localize this number
          return `${Math.round((value + Number.EPSILON) * 100) / 100}`;
        },
      },
    },
    grid: {
      show: true,
      position: 'back',
      strokeDashArray: 10,
      padding: {
        top: 10,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
        columnWidth: '50',
        rangeBarOverlap: false,
        colors: {
          backgroundBarColors: ['#efefef'],
          backgroundBarOpacity: 0.3,
          backgroundBarRadius: 7,
        },
        dataLabels: {
          total: {
            enabled: true,
            formatter: (value) => {
              return `${n(
                Math.round((value + Number.EPSILON) * 100) / 100,
                'decimal',
                store.getters.getUserLocaleCurrency(),
                { minimumFractionDigits: 0, maximumFractionDigits: 0 }
              )}`;
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return `${n(
            Math.round((value + Number.EPSILON) * 100) / 100,
            'decimal',
            store.getters.getUserLocaleCurrency(),
            { minimumFractionDigits: 0, maximumFractionDigits: 5 }
          )}`;
        },
      },
    },
    dataLabels: {
      formatter: (value, opts) => {
        return getSuffixedNumber(value * 100);
      },
    },
  },
  series: [
    {
      name: t('property.info-section.financials.returns-calculator.investment'),
      data: [
        calcInputs.value.investmentAmount.value,
        calcInputs.value.investmentAmount.value,
        calcInputs.value.investmentAmount.value,
        calcInputs.value.investmentAmount.value,
      ],
    },
    {
      name: t('property.info-section.financials.returns-calculator.income'),
      data: [
        yearlyIncome.value * 3, // assuming the same net rent yield
        yearlyIncome.value * 6, // for the whole hold period
        yearlyIncome.value * 9, //
        yearlyIncome.value * 12, //
      ],
    },
    {
      name: t('property.info-section.financials.returns-calculator.appreciation'),
      data: [
        calculate.appreciation(
          calcInputs.value.investmentAmount.value,
          calcInputs.value.appreciationRate.value,
          3
        ),
        calculate.appreciation(
          calcInputs.value.investmentAmount.value,
          calcInputs.value.appreciationRate.value,
          6
        ),
        calculate.appreciation(
          calcInputs.value.investmentAmount.value,
          calcInputs.value.appreciationRate.value,
          9
        ),
        calculate.appreciation(
          calcInputs.value.investmentAmount.value,
          calcInputs.value.appreciationRate.value,
          12
        ),
      ],
    },
  ],
});

// lazy loading for calculation inputs
let timerId = null;
const delay = 750;
watch(calcInputs.value, () => {
  if (!timerId) {
    timerId = setTimeout(() => {
      calcChart.value.series = [
        {
          name: 'investment',
          data: [
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
          ],
        },
        {
          name: 'income',
          data: [
            yearlyIncome.value * 3, // times hold period
            yearlyIncome.value * 6, //
            yearlyIncome.value * 9, //
            yearlyIncome.value * 12, //
          ],
        },
        {
          name: 'appreciation',
          data: [
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              3
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              6
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              9
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              12
            ),
          ],
        },
      ];
      timerId = null;
    }, delay);
  } else {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      calcChart.value.series = [
        {
          name: 'investment',
          data: [
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
            calcInputs.value.investmentAmount.value,
          ],
        },
        {
          name: 'income',
          data: [
            yearlyIncome.value * 3, // times hold period
            yearlyIncome.value * 6, //
            yearlyIncome.value * 9, //
            yearlyIncome.value * 12, //
          ],
        },
        {
          name: 'appreciation',
          data: [
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              3
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              6
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              9
            ),
            calculate.appreciation(
              calcInputs.value.investmentAmount.value,
              calcInputs.value.appreciationRate.value,
              12
            ),
          ],
        },
      ];
      timerId = null;
    }, delay);
  }
});
</script>

<style lang="scss" scoped>
article.propertyMainInfo {
  display: flex;
  flex-flow: column nowrap;

  h1 {
    margin: 0;
    text-transform: capitalize;
    font-size: 1.7rem;
  }

  .offeringDtails {
    display: flex;
    flex-flow: column nowrap;

    .historicals {
      display: flex;
      flex-flow: row wrap;
      margin: 1rem 0;

      h2 {
        flex: 1 1 100%;
      }

      .historicalData {
        flex: 1 1 45%;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        padding: 0.5rem;
        box-shadow: var(--medium-shadow);
        &:nth-of-type(1) {
          margin-inline-end: 0.5rem;
        }

        @media #{$mq-820-down} {
          flex: 1 1 100%;

          &:nth-of-type(1) {
            margin-inline-end: unset;
            margin-bottom: 0.5rem;
          }
        }
        h3 {
          margin: 0;
          border-radius: 7px;
          padding: 0.25rem 0.5rem;
          background-color: var(--primary-5);
        }
      }
    }

    .metrics {
      display: flex;
      flex-flow: row wrap;
      margin: 0;
      border: none;
      border-radius: 10px;
      padding: 0.5rem;
      background-color: var(--accent-5);
      width: 100%;

      legend {
        border-radius: 7px;
        padding: 0.25rem 0.5rem;
        background-color: var(--dark);
        color: var(--light);
        text-transform: capitalize;
      }

      .metric {
        flex: 1 1 45%;
        display: flex;
        flex-direction: row;
        margin: 0.25rem;
        border-radius: 7px;
        padding: 0.75rem 0.5rem;
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

    .fundingData {
      display: flex;
      flex-flow: row wrap;
      margin: 1rem 0;
      @media #{$mq-480-down} {
        flex-flow: column nowrap;
      }

      h2 {
        margin: 0;
        margin-bottom: 0.5rem;
        flex: 1 1 100%;
      }

      aside {
        display: flex;
        flex-flow: column nowrap;
        flex: 1 1 25%;
        background-color: var(--accent-5);
        border-radius: 10px;
        margin: 0.25rem;

        .status {
          display: flex;
          align-items: center;
          margin: 0.5rem;
          border-radius: 10px;
          padding: 0.5rem;

          .material-symbols-rounded {
            margin: 0 0.5rem;
            border-radius: 7px;
            padding: 0.25rem;
            background-color: var(--primary-5);
            font-size: 2rem;
          }

          .value {
            color: var(--primary);
          }
        }
      }

      &:deep(.p-panel) {
        flex: 1 1 65%;
        margin: 0.25rem;
        border-radius: 10px;
        height: fit-content;
        overflow: hidden;

        @media #{$mq-480-down} {
          width: 100%;
          margin-top: 0.5rem;
        }
        .p-panel-header {
          span {
            text-transform: capitalize;
            font-weight: 600;
          }
          span.value {
            margin-inline-start: auto;
            margin-inline-end: 0.5rem;
            border-radius: 7px;
            padding: 0.5rem 1rem;
            background-color: var(--primary-5);
            color: var(--primary);
          }
        }

        .p-panel-content {
          border-top: 1px solid var(--dark-20);
          padding: 0;

          // data table
          .p-datatable {
            tr:last-of-type {
              background-color: var(--primary-5);
              font-weight: 600;
              color: var(--primary);
            }
          }
        }
      }
    }

    .returnsCalculator {
      box-shadow: var(--medium-shadow);
      border: 1px solid var(--dark-20);
      border-radius: 10px;
      padding: 0.5rem;

      h2 {
        border-radius: 10px;
        padding: 0.5rem;
        background-color: var(--primary-5);
      }

      .calculator {
        display: flex;
        flex-flow: row nowrap;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
        }
        .chart {
          flex: 1 1 60%;
          display: flex;
          align-items: center;

          .vue-apexcharts {
            width: 100%;
          }
        }

        .inputs {
          flex: 1 1 30%;
          margin: 0.5rem;
          border: 1px solid var(--dark-20);
          border-radius: 10px;
          padding: 0.5rem;

          .result {
            display: flex;
            flex-flow: row nowrap;
            margin: 0.5rem 0;
            border: 1px solid var(--dark-5);
            border-radius: 7px;
            padding: 0.5rem;
            background-color: var(--primary-5);

            &:nth-of-type(5) {
              margin-top: 1rem;
            }

            .value {
              margin-inline-start: auto;
              font-weight: 600;
              color: var(--primary);
            }
          }
        }
      }
    }
  }
}
</style>
