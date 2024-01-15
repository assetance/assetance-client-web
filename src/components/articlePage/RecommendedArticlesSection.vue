<template>
  <div class="recommendedArticles">
    <CardsSlider
      :data-array="recommendedArticles"
    >
      <template #title>
        <sup>{{ $t('article.recommended-articles') }}</sup>
      </template>
      <template #card="slotProps">
        <ArticleCard 
          orientation="vertical"
          :article-data="slotProps.dataOject"
        />
      </template>
    </CardsSlider>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CardsSlider from '@/components/macroComponents/CardsSlider.vue';
import ArticleCard from '@/components/macroComponents/articles/ArticleCard.vue';
import knowledgeAPI from '../../services/knowledgeAPI';

// props
const props = defineProps({
  articleData: {
    type: Object,
    required: true
  }
});

// general logic
const recommendedArticles = ref(await knowledgeAPI.getArticlesByCategory(props.articleData.category));
</script>

<style lang="scss" scoped>
.recommendedArticles {

  sup {
  font-size: 1.2rem;
  }
}
</style>