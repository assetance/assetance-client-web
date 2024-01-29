<template>
  <main class="wl">
    <!-- header -->
    <header>
      <h1>{{ $t('properties.properties') }}</h1>
      <p>{{ $t('properties.explore-out-properties') }}</p>
    </header>
    <Suspense>
      <template #default>
        <PropertiesExplorerSection />
      </template>
      <template #fallback>
        <PropertiesExplorerSectionLoader />
      </template>
    </Suspense>
    <StartInvestingCTA />
  </main>
</template>

<script setup>
import PropertiesExplorerSection from '@/components/propertiesPage/PropertiesExplorerSection.vue';
import PropertiesExplorerSectionLoader from '../components/propertiesPage/PropertiesExplorerSectionLoader.vue';
import StartInvestingCTA from '../components/CTAs/StartInvestingCTA.vue';
</script>

<style lang="scss" scoped>
main.wl {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 4rem;

    @media #{$mq-820-down} {
        text-align: center;
    }

    header {
        
        h1 {
            text-transform: capitalize;
        }

        p::first-letter {
            text-transform: capitalize;
        }
    }
}
</style>