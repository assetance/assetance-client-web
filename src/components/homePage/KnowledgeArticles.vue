<template>
  <section class="wl">
    <div class="informatives">
      <header>{{ $t('home.knowledge-articles.tagline') }}</header>
      <h2>{{ $t('home.knowledge-articles.title') }}</h2>
      <p>{{ $t('home.knowledge-articles.description') }}</p>
      <div class="ctaButton">
        <SecondaryButton @click="viewAll">
          {{ $t('global.view-all') }}
        </SecondaryButton>
      </div>
    </div>
    <div class="articles">
      <div class="articleCard">
        <img
          src="https://placehold.co/400"
          alt="article image"
        >
        <article class="informatives">
          <div class="tags">
            <TackTag>Category</TackTag>
            <span>{{ $t('home.knowledge-articles.read-time', 5, { n: 5 }) }}</span>
          </div>
          <h3>article title</h3>
          <p>
            article body Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, eum.
          </p>

          <LinkButton @click="viewArticle('article id')">
            {{ $t('global.read-more') }}
          </LinkButton>
        </article>
      </div>
      <div class="articleCard">
        <img
          src="https://placehold.co/400"
          alt="article image"
        >
        <article class="informatives">
          <div class="tags">
            <TackTag>Category</TackTag>
            <span>{{ $t('home.knowledge-articles.read-time', 1, { n: 1 }) }}</span>
          </div>
          <h3>article title</h3>
          <p>
            article body Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, eum.
          </p>

          <LinkButton @click="viewArticle('article id')">
            {{ $t('global.read-more') }}
          </LinkButton>
        </article>
      </div>
      <div class="articleCard">
        <img
          src="https://placehold.co/400"
          alt="article image"
        >
        <article class="informatives">
          <div class="tags">
            <TackTag>Category</TackTag>
            <span>{{ $t('home.knowledge-articles.read-time', 1, { n: 1 }) }}</span>
          </div>
          <h3>article title</h3>
          <p>
            article body Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, eum.
          </p>

          <LinkButton @click="viewArticle('article id')">
            {{ $t('global.read-more') }}
          </LinkButton>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import LinkButton from '../microComponents/LinkButton.vue';
import SecondaryButton from '../microComponents/SecondaryButton.vue';
import TackTag from '../microComponents/TackTag.vue';

// try to make the links work as a link
function viewAll() {
  // push to knowledge center
}
// eslint-disable-next-line no-unused-vars
function viewArticle(id) {
  // push to article page
}
</script>

<style lang="scss" scoped>
section.wl {
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  padding-top: 2rem;
  background: url("/src/assets/theme/sssurface-blue.png") 151% 10%, url("/src/assets/theme/sssurface-dark.png") 40% -50%;
  background-repeat: no-repeat;
  background-size: 70%, 50%;

  @media #{$mq-820-down} {
    flex-flow: column nowrap;
  }

  &>.informatives {
    display: flex;
    flex-flow: column nowrap;
    border-radius: 10px;
    margin-inline-end: 1rem;
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

      @media #{$mq-820-down} {
        text-align: center;
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

    &>p {
      margin: 2rem 0;
    }

    .ctaButton {
      width: 40%;
    }
  }

  .articles {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    .articleCard {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 1rem;
      border-radius: 10px;
      box-shadow: var(--medium-shadow);
      padding: 1rem;
      background-color: var(--light);

      img {
        width: 35%;
        object-fit: cover;
        border-radius: 10px;
      }

      &>.informatives {
        display: flex;
        flex-flow: column nowrap;
        margin-inline-start: 1rem;
        width: 100%;

        .tags {
          display: flex;
          flex-flow: row wrap;
          justify-content: flex-start;
          width: 100%;

          span {
            margin-inline-start: 0.5rem;
            color: var(--primary);
          }
        }

        h3 {
          margin: 0.5rem 0;
        }

        p {
          margin: 0.5rem 0;
          max-height: 2.5rem;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
