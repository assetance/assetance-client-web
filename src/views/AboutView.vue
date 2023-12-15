<template>
  <div class="about">
    <main>
      <MissionStatement />
      <OurVision />
      <AboutCTA />
      <OurValues />
      <OurSolutions />
    </main>
  </div>
</template>

<script setup>
import AboutCTA from '../components/aboutUsPage/AboutCTA.vue';
import MissionStatement from '../components/aboutUsPage/MissionStatement.vue';
import OurSolutions from '../components/aboutUsPage/OurSolutions.vue';
import OurValues from '../components/aboutUsPage/OurValues.vue';
import OurVision from '../components/aboutUsPage/OurVision.vue';
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