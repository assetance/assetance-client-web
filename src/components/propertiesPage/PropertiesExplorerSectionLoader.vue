<template>
  <section class="propertiesExplorer">
    <InputsSectionLoader />
    <section
      class="cardsList"
    >
      <PropertyCardLoader 
        v-for="n in 9" 
        :key="n"
      />
      <div class="paginator loadingShader" />
    </section>
  </section>
</template>

<script setup>
import PropertyCardLoader from '../macroComponents/properties/PropertyCardLoader.vue';
import InputsSectionLoader from './InputsSectionLoader.vue';

</script>

<style lang="scss" scoped>
.cardsList {
  display: flex;
  flex-flow: row wrap;

  .paginator {
    width: 100%;
    height: 62px;
  }
}
</style>