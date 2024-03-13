<template>
  <section class="showcase">
    <HeroSection :property-data="showcaseData" />
    <InfoSection :property-data="showcaseData" />
  </section>
</template>

<script setup>
import { ref, provide } from 'vue';
import HeroSection from './propertyShowcase/HeroSection.vue';
import InfoSection from './propertyShowcase/InfoSection.vue';

const showcaseData = ref({
  id: 'AB01D1',
  REFNAQS: 'AB01CD1',
  govId: 'AB01CD1',
  name: 'property name',
  description:
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas nulla eius accusantium fuga modi veniam? Est natus iure accusamus cum labore quos ducimus soluta, nemo dolores et, consequatur saepe fugit!',
  views: 1235,
  fundingPrice: 45000000,
  incomeReturns: 2400000,
  sharePrice: 1000,
  fundingClosingDate: '2024-03-25T15:25:00Z',
  fundingProgress: 48,
  category: 'category 1',
  isTrending: true,
  isNew: true,
  isTrade: true,
  availableShares: 13123,
  totalShares: 45000,
  investors: 124,
  tradingOffers: 7,
  originCurrency: 'USD',
  status: 'funding',
  yearBuilt: '2023-01-01T00:00:00Z',
  developer: 'development company',
  constructor: 'construction company',
  agent: 'realtor agency / agent',
  rentalGuarantee: 'P12M',
  location: {
    locationId: '1234567',
    region: 'asia', // ['asia', 'africa', 'europe', 'north america', 'oceania', 'south america']
    country: 'SA',
    state: 'al-sharqiah', // for countries with no states
    city: 'jeddah',
    zipcode: '123456',
    propertyNumber: 34,
    buildingNumber: 14,
    address: 'address string',
    geo: {
      lng: 10.0,
      lat: 10.0,
    },
    poly: {
      // geo polly data V1 featuer
    },
  },
  rentalStartDate: {
    date: '2024-03-10',
    isSolid: false,
  },
  exitEstimation: {
    from: '2029-01-01T00:00:00Z',
    to: '2032-01-01T00:00:00Z',
  },
  metrics: [
    {
      lable: 'NRY',
      description: 'Net Rent Yield is the total annual rent profits',
      value: 12,
      type: 'percent',
    },
    {
      lable: 'ZIP10YAR',
      description:
        "the historical yearly appreciation rate for the past 10 years of the properties' ZIP code",
      value: 15.6,
      type: 'percent',
    },
    {
      lable: 'AROI',
      description: 'the anticipated Annual Return On Investment for the investment',
      value: 12,
      type: 'percent',
    },
  ],
  images: [
    {
      link: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
      alt: 'property front image',
    },
    {
      link: 'https://www.karmod.com/media/projects/261/prefab-homes-turkey-istanbul-89197.jpg',
      alt: 'property side image',
    },
    {
      link: 'https://seyler.ekstat.com/img/max/800/E/ErTDFvmCHFcCdCG2-636594883263860324.jpg',
      alt: 'property living room image',
    },
    {
      link: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU',
      alt: 'property kitchen room image',
    },
    {
      link: 'https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/studio-apartment.jpg?itok=Qf7awsJ4',
      alt: 'property living room image',
    },
  ],
  offeringDetails: [
    {
      name: 'purchase price',
      description: 'original property purchase pirce',
      amount: 40000000,
    },
    {
      name: 'acquisition fees',
      description: 'realtors and agents acquisition expenses',
      amount: 2000000,
    },
    {
      name: 'property maintenance & reserve',
      description: 'property maintenance & reserve',
      amount: 2000000,
    },
    {
      name: 'property holding fee',
      description:
        'fee for holding the property to be listed in the market during the funding period',
      amount: 200000,
    },
    {
      name: 'Assetance sourcing fee',
      description: 'Assetance sourcing fee',
      amount: 800000,
    },
    {
      isResult: true,
      name: 'total',
      description: 'total funding amount',
      amount: 45000000,
    },
  ],
  rentalReturns: [
    {
      name: 'Gross Rental Return',
      description: 'total annual returns before deducting expenses',
      amount: 2400000,
    },
    {
      name: 'Property Taxes',
      description: 'taxes like ...',
      amount: -350000,
    },
    {
      name: 'Home Insurance',
      description: 'home insurance covers ...',
      amount: -170000,
    },
    {
      name: 'HOA Fees',
      description: 'HOA Fees description',
      amount: -80000,
    },
    {
      name: 'Property Management Fee',
      description: 'Property Management Fee description',
      amount: -240000,
    },
    {
      name: 'Assetance AUM Fee',
      description: 'Assetance AUM Fee description',
      amount: -120000,
    },
    {
      isResult: true,
      name: 'total',
      description: 'total annual rent to be distriputed',
      amount: 2400000,
    },
  ],
  documents: [
    {
      title: 'document 1 title',
      description: 'document 1 description',
      downloadLink: 'bloblink1',
    },
    {
      title: 'document 2 title',
      description: 'document 2 description',
      downloadLink: 'bloblink2',
    },
    {
      title: 'document 3 title',
      description: 'document 3 description',
      downloadLink: 'bloblink3',
    },
    {
      title: 'document 4 title',
      description: 'document 4 description',
      downloadLink: 'bloblink4',
    },
  ],
  timeline: [
    {
      name: 'event 1',
      date: '2024-01-25T15:25:00Z',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo distinctio corrupti magnam! Minima repellat ipsa id sunt culpa doloremque facere.',
    },
    {
      name: 'event 2',
      date: '2024-02-22T15:25:00Z',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo distinctio corrupti magnam! Minima repellat ipsa id sunt culpa doloremque facere.',
    },
    {
      name: 'event 3',
      date: '2024-03-25T15:25:00Z',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo distinctio corrupti magnam! Minima repellat ipsa id sunt culpa doloremque facere.',
    },
    {
      name: 'event 4',
      date: '2024-04-25T15:25:00Z',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo distinctio corrupti magnam! Minima repellat ipsa id sunt culpa doloremque facere.',
    },
    {
      name: 'event 5',
      date: '2024-05-25T15:25:00Z',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo distinctio corrupti magnam! Minima repellat ipsa id sunt culpa doloremque facere.',
    },
  ],
  layout: {
    bedrooms: '1',
    bathrooms: '1',
    livingArea: '300',
    landArea: '500',
    floors: '1',
    level: '1',
  },
  features: [
    {
      title: 'amenities',
      featureList: ['pool', '2 cars parking', 'gated comunity'],
    },
    {
      title: 'utils',
      featureList: ['AC', 'heater'],
    },
    {
      title: 'flooring',
      featureList: ['carpet', 'engineered hardwood'],
    },
  ],
  valuationData: {
    dataPoints: [
      '2024-07-01',
      '2024-08-01',
      '2024-09-01',
      '2024-10-01',
      '2024-11-01',
      '2024-12-01',
      '2025-01-01',
      '2025-02-01',
      '2025-03-01',
      '2025-04-01',
      '2025-05-01',
      '2025-06-01',
      '2025-07-01',
      '2025-08-01',
    ],
    propertyData: [
      16000000, 16000000, 16500000, 17000000, 17000000, 17500000, 19000000, 18500000, 18500000,
      18000000, 18500000, 19000000, 19500000, 20000000,
    ],
    zipAvgData: [
      15000000, 14500000, 15000000, 14500000, 15000000, 15500000, 16000000, 16500000, 16500000,
      17000000, 17500000, 18000000, 17500000, 18000000,
    ],
    stateAvgData: [
      24500000, 24500000, 24000000, 24000000, 24000000, 24500000, 24500000, 25000000, 24500000,
      25000000, 25500000, 26000000, 26000000, 26500000,
    ],
  },
  rentalData: {
    dataPoints: [
      '2011-01-01',
      '2012-01-01',
      '2013-01-01',
      '2014-01-01',
      '2015-01-01',
      '2016-01-01',
      '2017-01-01',
      '2018-01-01',
      '2019-01-01',
      '2020-01-01',
      '2021-01-01',
      '2022-01-01',
      '2023-01-01',
      '2024-01-01',
    ],
    propertyData: [
      1100000, 1200000, 1250000, 1300000, 1350000, 1450000, 1500000, 1550000, 1550000, 1600000,
      1650000, 1700000, 1850000, 2000000,
    ],
    zipAvgData: [
      1300000, 1300000, 1350000, 1350000, 1450000, 1450000, 1450000, 1550000, 1600000, 1650000,
      1700000, 1700000, 1650000, 1700000,
    ],
    stateAvgData: [
      1800000, 1800000, 1850000, 1800000, 1800000, 1850000, 1850000, 1900000, 1950000, 2000000,
      2050000, 2100000, 2150000, 2150000,
    ],
  },
});

// providing the property data to all children and nested components
provide('propertyData', showcaseData);
</script>

<style lang="scss" scoped>
section.showcase {
  display: flex;
  flex-flow: column nowrap;

  @media #{$mq-820-down} {
    text-align: center;
  }
}
</style>
