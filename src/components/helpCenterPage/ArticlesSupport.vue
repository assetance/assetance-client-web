<template>
  <section class="articles">
    <h1>{{ $t('help.articles.view-articles') }}</h1>
    <p>{{ $t('help.articles.view-articles-from-knowledge-center') }}</p>

    <SelectInput
      :options="optionObjects"
      :is-searchable="true"
      v-model:selection="selectedObject"
      :error-msg="dropdownStatus.errMsg"
      :status="dropdownStatus.status"
    >
      <template #label>
        <span class="material-symbols-rounded">
          category
        </span>
        <p>
          {{ $t('help.articles.category') }}
        </p>
      </template>
      <template #option="slotProps">
        <!-- accessing the option object from SelectInput.vue via slot prop "slotProps" -->
        <span class="material-symbols-rounded">
          {{ slotProps.option.icon }}
        </span>
        <p>
          {{ slotProps.option.option }}
        </p>
      </template>
    </SelectInput>
    <!-- articles list -->
    <swiper-container
      v-if="!isArticlesLoading"
      slides-per-view="auto"
      free-mode="true"
      scrollbar-hide="false"
    >
      <swiper-slide
        v-for="article in articles"
        :key="article.id"
      >
        <img
          :src="article.image"
          alt="article image"
        >
        <div class="infromatives">
          <div class="tags">
            <TackTag>
              {{ article.category }}
            </TackTag>
            <p>{{ $t('help.articles.read-time', Math.floor(article.readingTime/60), {n: Math.floor(article.readingTime/60) }) }}</p>
          </div>
          <article>
            <h2>{{ article.title }}</h2>
            <p>{{ article.summary }}</p>
          </article>
          <LinkButton>{{ $t('global.read-more') }}</LinkButton>
        </div>
      </swiper-slide>
    </swiper-container>
    <!-- articles skeleton loaders -->
    <swiper-container
      v-else
      slides-per-view="auto"
      free-mode="true"
      scrollbar-hide="true"
    >
      <swiper-slide
        v-for="n in 5"
        :key="n"
        :style="`opacity: ${1 - n/5};`"
      >
        <div 
          class="loadingShader"
        />
        <div class="infromatives loading">
          <div class="tags loadingShader">
            <TackTag>
              loading
            </TackTag>
            <p>loading</p>
          </div>
          <article>
            <h2 class="loadingShader">
              loading
            </h2>
            <p class="loadingShader">
              loading
            </p>
          </article>
          <p class="loadingShader">
            loading
          </p>
        </div>
      </swiper-slide>
    </swiper-container>
    <SecondaryButton
      icon="local_library"
    >
      {{ $t('global.pages.knowledge-base') }}
    </SecondaryButton>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import SecondaryButton from '../microComponents/SecondaryButton.vue';
import SelectInput from '../microComponents/SelectInput.vue';
import TackTag from '../microComponents/TackTag.vue';
import LinkButton from '../microComponents/LinkButton.vue';
import articlesAPI from '../../services/articlesAPI.js';
import { watch } from 'vue';

/* optionObjects is an array of available options formated for the SelectInput componenet*/
const optionObjects = ref([]);
articlesAPI.getCategories().then(response => {
  /* forming the object as required by SelectInput component from the array (assuming an array from server)*/
  optionObjects.value = response.categories.map(category => ({ option: category }));
});

/* user selection model */
const selectedObject = ref('');
const dropdownStatus = ref({
  status: '',
  errMsg: '',
});

/* artilces logic start */
const isArticlesLoading = ref(true); // for skeleton loaders activation
const articles = ref('');
articlesAPI.getSupportRand().then(response => {
  // calling the api and assigning the response
  articles.value = response;
  isArticlesLoading.value = false;
});

/* checking for user selection */
watch(selectedObject, async () => {
  if (selectedObject.value != '') {
    // api call for that category 
    isArticlesLoading.value = true;
    articlesAPI.getByCategory(selectedObject.value.option).then(response => {
      articles.value = response;
      isArticlesLoading.value = false;
    });
  } else {
    /**
     * TODO:: make a Vue composable for api calls caching
     */
    // reset artilces viewd to random
    isArticlesLoading.value = true;
    articles.value = await articlesAPI.getSupportRand();
    isArticlesLoading.value = false;
  }
  
});
</script>

<style lang="scss" scoped>
section.articles {
    position: relative;
    width: 100%;
    padding: 1rem;
    text-align: center;
    z-index: 0;

    @media #{$mq-820-down} {
        padding: 0.5rem 0;
    }

    .selectInputContainer {
      button .label {
        p {
          margin: 0;
        }
        .material-symbols-rounded{
          margin: 0 0.2rem;
          margin-top: -2px;
          font-size: 1rem;
        }
      }

      .dropdownOption {
        .material-symbols-rounded {
          font-size: 1rem;
        }

        p {
          margin: 0;
          margin-inline-start: 0.3rem;
        }
      }
    }

    swiper-container {
      margin-bottom: 1rem;
      width: 100%;
      z-index: 0;

      swiper-slide {
        display: flex;
        flex-flow: column nowrap;
        border-radius: 10px;
        box-shadow: var(--small-shadow);
        margin: 1rem 0.5rem;
        width: 15rem;
        height: auto;
        padding: 0.5rem;
        background-color: var(--white);
        color: var(--dark);

        img {
          border: 1px solid var(--dark-20);
          border-radius: 10px;
          height: 10rem;
          object-fit: cover;
        }

        .infromatives {
          display: flex;
          flex-flow: column nowrap;
          padding: 0.5rem 0;
          height: 100%;

          .tags {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            margin-top: 0.5rem;

            .tackTag {
              margin-inline-end: 1rem;
              padding: 0.3rem 1rem;
              font-size: 0.8rem;
            }
            p {
              margin: 0;
              font-size: 0.8rem;
              color: var(--primary);
            }
          }
          article {
            display: flex;
            flex-flow: column nowrap;
            margin: 0.8rem 0;
            text-align: center;

            & > * {
              margin: 0;
            }
            h2 {
              font-size: 1.2rem;
              font-weight: 600;
            }

          }
          .linkButton {
            justify-content: center;
            margin-top: auto;
            color: var(--primary);

            .text {
              font-size: 1rem;
            }
          }
        }

        // loading css
        .loadingShader {
          margin-bottom: 0.3rem;
          width: 100%;
          height: 10rem;
          color: transparent;
        }
        .infromatives.loading{
          height: unset;
          background-color: transparent;
          .loadingShader {
            height: fit-content;
            margin: 0;
          }

          .tags {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;

            .tackTag {
              background-color: transparent;
              color: transparent;
              padding: 0.1rem 1rem;
              font-size: 0.8rem;
            }
            p {
              margin: 0;
              color: transparent;
            }
          }
        } 
      }
    }
}
</style>