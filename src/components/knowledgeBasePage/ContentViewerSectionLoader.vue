<template>
  <div class="contentViewerSectionLoader">
    <div class="inputsBoxLoader loadingShader" />
    
    <!-- scroll anchors -->
    <div id="articles_hash" />
    <div id="videos_hash" />

    <ArticleCardLoader 
      v-for="n in 15"
      :key="n"
      orientation="auto"
    />
  </div>
</template>

<script setup>
import ArticleCardLoader from '@/components/macroComponents/articles/ArticleCardLoader.vue';
</script>

<style lang="scss" scoped>
.contentViewerSectionLoader {
  display: flex;
  flex-flow: row wrap;
  margin-top: 3rem;
  width: 100%;

  & > * {
    margin: 0rem;
  }

  .inputsBoxLoader {
    border-radius: 10px;
    height: 60px;
    width: 100%;
  }

  a {
    margin: 0.5rem;
  }
}
</style>