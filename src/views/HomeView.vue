<template>
  <div class="home">
    <main id="main">
      <HeroSection />
      <FractionalBenefitsSection />
      <HowItWorks />
      <IncomeSources />
      <AssetanceFeatures />
      <ReturnsSnippet />
      <WhyRealEstate />
      <HomeCTA />
      <KnowledgeArticles />
    </main>
  </div>
</template>

<script setup>
import HeroSection from '@/components/homePage/HeroSection.vue';
import FractionalBenefitsSection from '@/components/homePage/FractionalBenefitsSection.vue';
import HowItWorks from '@/components/homePage/HowItWorks.vue';
import AssetanceFeatures from '@/components/homePage/AssetanceFeatures.vue';
import IncomeSources from '@/components/homePage/IncomeSources.vue';
import ReturnsSnippet from '@/components/homePage/ReturnsSnippet.vue';
import WhyRealEstate from '@/components/homePage/WhyRealEstate.vue';
import HomeCTA from '@/components/homePage/HomeCTA.vue';
import KnowledgeArticles from '@/components/homePage/KnowledgeArticles.vue';
</script>

<style lang="scss">
// home stlying shold not be scoped

div.home {
  &>main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
}
</style>
