<template>
  <main class="wl">
    <PropertyShowcase />
    <FAQAccordion />
  </main>
</template>

<script setup>
import FAQAccordion from '../components/propertyPage/FAQAccordion.vue';
import PropertyShowcase from '../components/propertyPage/propertyShowcase.vue';

</script>

<style lang="scss" scoped>
main.wl {
  display: flex;
  flex-flow: column nowrap;
  margin-top: 4rem;

  @media #{$mq-820-down} {
      text-align: center;
  }
}
</style>