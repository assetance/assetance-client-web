<template>
  <div class="about">
    <main>
      <MissionStatement></MissionStatement>
      <OurVision></OurVision>
      <AboutCTA></AboutCTA>
      <OurValues></OurValues>
      <OurSolutions></OurSolutions>
    </main>
  </div>
</template>

<script setup>
import AboutCTA from '../components/aboutUs/AboutCTA.vue';
import MissionStatement from '../components/aboutUs/MissionStatement.vue';
import OurSolutions from '../components/aboutUs/OurSolutions.vue';
import OurValues from '../components/aboutUs/OurValues.vue';
import OurVision from '../components/aboutUs/OurVision.vue';
</script>

<style lang="scss">
div.about {
  &>main {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
}
</style>