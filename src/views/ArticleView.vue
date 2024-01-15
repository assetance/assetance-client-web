<template>
  <main class="wl">
    <!-- loaded -->
    <div
      class="loaded"
      v-if="articleData"
    >
      <!-- article start -->
      <article>
        <HeroSection 
          :article-data="articleData"
        />
        <ArticleBodySection 
          :article-body="articleData.body"
        />
      </article>
      <!-- article end -->
      <FeedbackSection />
      <!-- similar articles -->
      <Suspense>
        <template #default>
          <RecommendedArticlesSection 
            :article-data="articleData"
          />
        </template>
        <template #fallback>
          <CardsSliderLoader>
            <template #title>
              {{ $t('article.recommended-articles') }}
            </template>
          </CardsSliderLoader>
        </template>
      </Suspense>
    </div>
    <!-- loading -->
    <div
      class="loading"
      v-else
    >
      <!-- article loader -->
      <article>
        <HeroSectionLoader />
        <ArticleBodySectionLoader />
      </article>
      <FeedbackSection />
    </div>
  </main>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ArticleBodySection from '../components/articlePage/ArticleBodySection.vue';
import HeroSection from '../components/articlePage/HeroSection.vue';
import knowledgeAPI from '@/services/knowledgeAPI.js';
import FeedbackSection from '../components/articlePage/FeedbackSection.vue';
import RecommendedArticlesSection from '../components/articlePage/RecommendedArticlesSection.vue';
import HeroSectionLoader from '../components/articlePage/HeroSectionLoader.vue';
import ArticleBodySectionLoader from '../components/articlePage/ArticleBodySectionLoader.vue';
import CardsSliderLoader from '../components/macroComponents/CardsSliderLoader.vue';

// general logic
const route = useRoute();
const articleData = ref(null);

/* SEO & sharability enhancements */
useSeoMeta({
  title: () => articleData.value ? articleData.value.title : route.meta.title,
  ogTitle: () => articleData.value ? articleData.value.title : route.meta.title,
  twitterTitle: () => articleData.value ? articleData.value.title : route.meta.title,
  description: () => articleData.value ? articleData.value.summary : route.meta.description,
  ogDescription: () => articleData.value ? articleData.value.summary : route.meta.description,
  twitterDescription: () => articleData.value ? articleData.value.summary : route.meta.description,
  ogImage: () => articleData.value ? articleData.value.img : '',
  twitterImage: () => articleData.value ? articleData.value.img : '',
  twitterCard: () => articleData.value ? 'summary' : ''
});

onMounted(async () => {
  // fetching data after mounting to trigger loading status 
  articleData.value = await knowledgeAPI.getArticleById(route.params.id);
});
</script>

<style lang="scss" scoped>
main.wl {
  margin-top: 5rem;

  @media #{$mq-820-down} {
    margin-top: 4rem;
  }

}
</style>