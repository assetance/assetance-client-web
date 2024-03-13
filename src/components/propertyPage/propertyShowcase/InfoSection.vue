<template>
  <section class="infoSection">
    <!-- taps view -->
    <TabView
      v-model:active-index="currentTabIndex"
      :scrollable="true"
    >
      <!-- trading tab -->
      <TabPanel>
        <template #header>
          <span
            :class="['material-symbols-rounded', currentTabIndex == 0 ? 'tradingActive' : '']"
            id="tradingOffersSection"
          >
            swap_horiz
          </span>
          <Badge
            v-if="availableTradingShares"
            :value="availableTradingShares"
          />
        </template>
        <TradingShares />
      </TabPanel>
      <!-- financials tab -->
      <TabPanel :header="$t('property.info-section.financials.financials')">
        <PropertyMainInfo />
      </TabPanel>
      <!-- investment timeline tabs -->
      <TabPanel :header="$t('property.info-section.timeline.timeline')">
        <InvestmentTimeline />
      </TabPanel>
      <!-- documents tabs -->
      <TabPanel :header="$t('property.info-section.documents.documents')">
        <InvestmentDocuments />
      </TabPanel>
      <!-- specifications tabs -->
      <TabPanel :header="$t('property.info-section.specifications.specifications')">
        <PropertySpecifications />
      </TabPanel>
      <!-- variable info tabs V1 feature-->
      <!-- <TabPanel header="More">
        <h1>More Info</h1>
      </TabPanel> -->
    </TabView>
  </section>
</template>

<script setup>
import { ref, inject, computed } from 'vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Badge from 'primevue/badge';
import PropertyMainInfo from './PropertyMainInfo.vue';
import InvestmentTimeline from './InvestmentTimeline.vue';
import InvestmentDocuments from './InvestmentDocuments.vue';
import PropertySpecifications from './PropertySpecifications.vue';
import TradingShares from './TradingShares.vue';

const currentTabIndex = ref(1);

// injecting fetched property data from <PropertyShowcase.vue>
const propertyData = await inject('propertyData');
const availableTradingShares = computed(() => {
  if (propertyData.value.tradingOffers) {
    return propertyData.value.tradingOffers > 9 ? '+9' : propertyData.value.tradingOffers;
  } else return false;
});
</script>

<style lang="scss" scoped>
section.infoSection {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  z-index: 0;

  &:deep(.p-tabview) {
    box-shadow: var(--xlarg-shadow);
    border: 1px solid var(--dark-5);
    border-radius: 10px;
    overflow: hidden;

    // ink-bar doesn't work right on load
    li.p-tabview-ink-bar {
      display: none;
    }
    li.p-tabview-header {
      a {
        border-bottom: 1px solid transparent;
        height: 100%;
        transition-duration: 0.3s;
      }
      span.material-symbols-rounded {
        border-radius: 7px;
        padding: 0.25rem;
        background-color: var(--primary-5);
      }

      // trading badge styling
      .p-badge {
        position: absolute;
        top: 0.25rem;
        right: 0.1rem;
        padding: 0;
      }
    }
    li.p-highlight {
      span.tradingActive {
        border-radius: 7px;
        padding: 0.25rem;
        background-color: var(--accent-20);
      }
      a {
        border-bottom: 1px solid var(--primary);
      }
    }
  }
}
</style>
