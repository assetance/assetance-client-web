<template>
  <section class="wl">
    <!-- feedback section -->
    <p>{{ $t('article.feedback.was-this-helpful') }}</p>
    <form @submit.prevent="sendReview">
      <StarRatingInput
        v-model="rating"
      />
    </form>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import StarRatingInput from '../microComponents/StarRatingInput.vue';
import knowledgeAPI from '../../services/knowledgeAPI';
import { useRoute } from 'vue-router';

// general logic
const rating = ref(0);
const route = useRoute();

// functions
async function sendReview() {
  await knowledgeAPI.setArticleRating(route.params.id);
}

// check and update values
watch(rating, () => {
  sendReview();
});
</script>

<style lang="scss" scoped>
section.wl {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 3rem 0;
  border-radius: 10px;
  padding: 3rem 0;
  background-color: var(--secondary-70);
  width: 100%;

  p {
    margin: 0;
  }
  form {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: 100%;

    button {
      margin: 0.2rem;
      max-width: 12rem;
      width: 100%;
    }
  }
}
</style>