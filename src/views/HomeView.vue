<template>
  <div class="home">
    <main id="main">
      <HeroSection></HeroSection>
      <FractionalBenefitsSection></FractionalBenefitsSection>
      <section></section>
    </main>
  </div>
</template>

<script setup>
import HeroSection from '@/components/homePage/HeroSection.vue';
import FractionalBenefitsSection from '@/components/homePage/FractionalBenefitsSection.vue';
</script>

<style lang="scss">
// home stlying shold not be scoped

div.home {
  & > main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
}
</style>
