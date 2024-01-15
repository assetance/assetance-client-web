<template>
  <!-- article body -->
  <section
    class="articleBodyLoader loadingShader"
  />
</template>

<script setup></script>

<style lang="scss" scoped>
section.articleBodyLoader {
  margin: 1rem 10%;
  border-radius: 10px;
  width: 100;
  height: 20rem;

  @media #{$mq-820-down} {
    margin: 1rem 0;
  }
}
</style>