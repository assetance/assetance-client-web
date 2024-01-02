<template>
  <section :class="['newUserSection', isMini ? 'minimized' : '']">
    <!-- close button not a <Button> element as it's only intended to be a visual minimizer only -->
    <span
      class="material-symbols-rounded closeBtn"
      @click="isMini = !isMini;"
    >
      {{ !isMini ? 'expand_less' : 'expand_more' }}
    </span>

    <article class="informatives">
      <header :class="[isMini ? 'minimized' : '']">
        {{ $t('knowledge.new-user.new-user-path') }}
      </header>
      <h2>{{ $t('knowledge.new-user.starter-level-articles') }}</h2>
      <p>{{ $t('knowledge.new-user.description') }}</p>
    </article>
    
    <ul class="articles">
      <li
        v-for="article in newUsersArtilces"
        :key="article.id"
      >
        <ArticleCard
          :article-data="article"
          orientation="horizontal"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ArticleCard from '../macroComponents/articles/ArticleCard.vue';

const isMini = ref(false);

/* 
static articles data for new useres articles.

this can be either be made dynamic later on although the articles won't be changing much, thus it can be as a default data in 'public' directory
*/
const newUsersArtilces = ref([
  {
    "id": "AB01D",
    "img": "https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6",
    "category": "category 1",
    "readTime": "PT23S",
    "title": "article title",
    "summary": "article body Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!",
    "authorImg": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    "authorName": "author name",
    "publishedAt": "2024-01-01T12:25:22Z"
  },
  {
    "id": "AC01D",
    "img": "https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6",
    "category": "category 2",
    "readTime": "PT1M23S",
    "title": "article title",
    "summary": "article body Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!",
    "authorImg": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    "authorName": "author name",
    "publishedAt": "2024-01-01T12:25:22Z"
  },
  {
    "id": "AD01D",
    "img": "https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6",
    "category": "category 2",
    "readTime": "PT5M23S",
    "title": "article title",
    "summary": "article body Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!",
    "authorImg": "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    "authorName": "author name",
    "publishedAt": "2024-01-01T12:25:22Z"
  },
]);
</script>

<style lang="scss" scoped>
section.newUserSection {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  box-shadow: var(--medium-shadow);
  border: 1px solid var(--primary-40);
  border-radius: 10px;
  max-height: 200rem; // for transition 
  padding: 2rem 1rem;
  background: url("/src/assets/theme/sssurface-blue.png") -30% -21%, url("/src/assets/theme/sssurface-dark.png") 40% -97%;
  background-repeat: no-repeat;
  background-size: 70%, 50%;
  transition-duration: 0.7s;
  overflow: hidden;

  @media #{$mq-820-down} {
    flex-flow: column nowrap;
  }

  &.minimized {
    max-height: 10px;
    padding: 0;
    padding-top: 2rem;
  }

  html[dir="rtl"] & {
    background: url("/src/assets/theme/sssurface-blue.png") 151% 10%, url("/src/assets/theme/sssurface-dark.png") 40% -50%;
  }

  &>span.closeBtn {
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 7px;
    background-color: var(--secondary);
    transition-duration: 0.2s;

    &:hover{
      cursor: pointer;
      color: var(--primary);
    }

    html[dir='rtl'] & {
      right: unset;
      left: 5px;
    }
  }

  &>.informatives {
    display: flex;
    flex-flow: column nowrap;
    margin-inline-end: 1rem;
    border-radius: 10px;
    width: 100%;
    padding: 1rem;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);

    @media #{$mq-820-down} {
      margin-inline-end: unset;
      margin-bottom: 0.5rem;
    }

    &>header {
      border-radius: 10px;
      color: var(--primary);
      font-size: 1rem;
      text-transform: capitalize;
      transition-duration: 0.5s;

      @media #{$mq-820-down} {
        text-align: center;
      }

      &.minimized {
        position: absolute;
        top: -25px;
      }
    }

    &>h2 {
      margin: 0.5rem 0rem;
      border-radius: 10px;
      text-transform: capitalize;
      font-size: 2rem;
      font-weight: 700;

      @media #{$mq-820-down} {
        font-size: 1.5rem;
        text-align: center;
      }
    }

  }

  .articles {
    display: flex;
    flex-flow: column nowrap;
    margin: 0;
    width: 100%;
    padding: 0;
    list-style: none;

    a {
      margin-bottom: 0.7rem;
    }
  }
}
</style>
