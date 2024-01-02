<template>
  <section class="contentViewer">
    <!-- inputs box -->
    <form
      class="inputsBox"
      @submit.prevent=""
      novalidate
    >
      <SearchInput
        v-model="searchValue"
        :label="searchInputProps.label"
        :is-icon-visible="searchInputProps.isIconVisible"
        :is-lazy="searchInputProps.isLazy"
      />
      <SelectInput
        :options="selectInputProps.categoriesObjects"
        :is-searchable="selectInputProps.isSearchable"
        :error-msg="selectInputProps.errMsg"
        :status="selectInputProps.status"
        v-model:selection="selectedObjectCategories"
      >
        <template #label>
          <span class="material-symbols-rounded">
            category
          </span>
          <p>
            {{ $t('global.form.category') }}
          </p>
        </template>
        <template #option="slotProps">
          {{ slotProps.option.option }}
        </template>
      </SelectInput>
      <SelectInput
        :options="sortInputProps.methods"
        :is-searchable="sortInputProps.isSearchable"
        :error-msg="sortInputProps.errMsg"
        :status="sortInputProps.status"
        v-model:selection="selectedObjectSort"
      >
        <template #label>
          <span class="material-symbols-rounded">
            sort
          </span>
          <p>
            {{ $t('global.form.order-by') }}
          </p>
        </template>
        <template #option="slotProps">
          {{ slotProps.option.option }}
        </template>
      </SelectInput>
      <button
        type="submit"
        @click="filter"
      >
        <span class="material-symbols-rounded">
          search
        </span>
      </button>
    </form>

    <!-- articles content -->
    <section :class="['contentType', isArticlesMinimized ? 'contentType__minimized' : '']">
      <button
        @click="isArticlesMinimized = !isArticlesMinimized"
      >
        <span class="material-symbols-rounded">
          {{ isArticlesMinimized ? 'expand_more' : 'expand_less' }}
        </span>
      </button>
      <h2>{{ $t('knowledge.content.articles') }}</h2>
      <!-- articles default view -->
      <div
        v-if="isDefault"
        class="defaultViewer"
      >
        <!-- trending articles -->
        <CardsSlider
          :data-array="trendingArticleCardsData"
        >
          <template #title>
            <span>{{ $t('knowledge.content.trending') }}</span>
          </template>
          <template #card="dataObject">
            <ArticleCard
              orientation="vertical"
              :article-data="dataObject"
            />
          </template>
        </CardsSlider>
        <!-- new articles -->
        <CardsSlider
          :data-array="newArticleCardsData"
        >
          <template #title>
            <span>{{ $t('knowledge.content.new') }}</span>
          </template>
          <template #card="dataObject">
            <ArticleCard
              orientation="vertical"
              :article-data="dataObject"
            />
          </template>
        </CardsSlider>
      </div>
      <!-- articles query view -->
      <div
        v-else
        class="searchViewer"
      >
        <!-- articles cards -->
        <div
          v-if="!isLoading && !isArticlesLoading"
          class="searchList"
        >
          <!-- cards list -->
          <div class="cards">
            <ArticleCard
              v-for="article in articleCardsData.data"
              :key="article.id"
              orientation="auto"
              :article-data="article"
            />
          </div>
          <!-- articles pagination -->
          <form
            class="pagination"
            @submit.prevent=""
            novalidate
          >
            <div class="buttons">
              <button
                type="submit"
                class="prev"
                rel="prev"
                @click.prevent="nextArticlesPage(false)"
                :disabled="articleCardsData.pagination.current_page == 1 ? true : false"
              >
                <span class="material-symbols-rounded">
                  arrow_back_ios
                </span>
              </button>
              <p>{{ articleCardsData.pagination.current_page }}</p>
              <button
                type="submit"
                class="next"
                rel="next"
                @click.prevent="nextArticlesPage(true)"
                :disabled="articleCardsData.pagination.current_page == articleCardsData.pagination.last_page ? true : false"
              >
                <span class="material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </button>
            </div>
            <sub>{{ $t('global.pagination.page-location', {n: articleCardsData.pagination.current_page, x: articleCardsData.pagination.last_page}) }}</sub>
          </form>
        </div>
        <!-- articles cards loader -->
        <div
          v-else
          class="searchList"
        >
          <div class="cards">
            <ArticleCardLoader
              v-for="n in searchCardsViewLimit"
              :key="n"
              orientation="auto"
            />
          </div>
          <!-- form loader -->
          <div
            class="pagination pagination__loader"
          >
            <div class="buttons">
              <div class="button">
                <span class="material-symbols-rounded">
                  arrow_back_ios
                </span>
              </div>
              <p class="loadingShader" />
              <div class="button">
                <span class="material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </div>
            </div>
            <sub class="loadingShader" />
          </div>
        </div>
      </div>
    </section>

    <!-- videos content -->
    <section :class="['contentType', isVideosMinimized ? 'contentType__minimized' : '']">
      <button
        @click="isVideosMinimized = !isVideosMinimized"
      >
        <span class="material-symbols-rounded">
          {{ isVideosMinimized ? 'expand_more' : 'expand_less' }}
        </span>
      </button>
      <h2>{{ $t('knowledge.content.videos') }}</h2>
      <!-- videos default view -->
      <div 
        v-if="isDefault"
        class="defaultViewer"
      >
        <!-- trending videos -->
        <CardsSlider
          :data-array="trendingVideoCardsData"
        >
          <template #title>
            <span>{{ $t('knowledge.content.trending') }}</span>
          </template>
          <template #card="dataObject">
            <VideoCard
              :video-data="dataObject"
            />
          </template>
        </CardsSlider>
        <!-- new videos -->
        <CardsSlider
          :data-array="newVideoCardsData"
        >
          <template #title>
            <span>{{ $t('knowledge.content.new') }}</span>
          </template>
          <template #card="dataObject">
            <VideoCard
              :video-data="dataObject"
            />
          </template>
        </CardsSlider>
      </div>
      <!-- videos query view -->
      <div 
        v-else
        class="searchViewer"
      >
        <!-- videos cards -->
        <div
          v-if="!isLoading && !isVideosLoading"
          class="searchList"
          ref="videoListRef"
        >
          <!-- cards list -->
          <div class="cards cards__loader">
            <VideoCard
              v-for="videoObj in videoCardsData.data"
              :key="videoObj.id"
              :video-data="videoObj"
              :full-width="videoCardWidth"
            />
          </div>
          <!-- pagination -->
          <form
            class="pagination"
            @submit.prevent=""
            novalidate
          >
            <div class="buttons">
              <button
                type="submit"
                class="prev"
                rel="prev"
                @click.prevent="nextVideosPage(false)"
                :disabled="videoCardsData.pagination.current_page == 1 ? true : false"
              >
                <span class="material-symbols-rounded">
                  arrow_back_ios
                </span>
              </button>
              <p>{{ videoCardsData.pagination.current_page }}</p>
              <button
                type="submit"
                class="next"
                rel="next"
                @click.prevent="nextVideosPage(true)"
                :disabled="videoCardsData.pagination.current_page == videoCardsData.pagination.last_page ? true : false"
              >
                <span class="material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </button>
            </div>
            <sub>{{ $t('global.pagination.page-location', {n: videoCardsData.pagination.current_page, x: videoCardsData.pagination.last_page}) }}</sub>
          </form>
        </div>
        <!-- video cards loader -->
        <div
          v-else
          class="searchList"
          ref="videoListRef"
        >
          <div class="cards">
            <VideoCardLoader
              v-for="n in searchCardsViewLimit"
              :key="n"
              :full-width="videoCardWidth"
            />
          </div>
          <!-- form loader -->
          <div
            class="pagination pagination__loader"
          >
            <div class="buttons">
              <div class="button">
                <span class="material-symbols-rounded">
                  arrow_back_ios
                </span>
              </div>
              <p class="loadingShader" />
              <div class="button">
                <span class="material-symbols-rounded">
                  arrow_forward_ios
                </span>
              </div>
            </div>
            <sub class="loadingShader" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import SearchInput from '@/components/microComponents/SearchInput.vue';
import SelectInput from '@/components/microComponents/SelectInput.vue';
import ArticleCard from '@/components/macroComponents/articles/ArticleCard.vue';
import ArticleCardLoader from '@/components/macroComponents/articles/ArticleCardLoader.vue';
import VideoCard from '@/components/macroComponents/videos/VideoCard.vue';
import CardsSlider from '@/components/macroComponents/CardsSlider.vue';
import knowledgeAPI from '@/services/knowledgeAPI';
import VideoCardLoader from '../macroComponents/videos/VideoCardLoader.vue';
import { useI18n } from 'vue-i18n';

/* component global logic */
const { t } = useI18n();
const isDefault = ref(true);
const isLoading = ref(false);
const isArticlesLoading = ref(false);
const isVideosLoading = ref(false);
const isArticlesMinimized = ref(false);
const isVideosMinimized = ref(false);
const videoListRef = ref(null);
const videoCardWidth = ref(false);
const searchCardsViewLimit = ref(6); // controls how many cards shown per page in search list

// parallel api requests
const [trendingArticles, newArticles, trendingVideos, newVideos, categories] = await Promise.all([
  knowledgeAPI.getArticlesByQuery(['sort=trending', 'limit=15']), 
  knowledgeAPI.getArticlesByQuery(['sort=new', 'limit=15']), 
  knowledgeAPI.getVideosByQuery(['sort=trending', 'limit=15']),
  knowledgeAPI.getVideosByQuery(['sort=new', 'limit=15']),
  knowledgeAPI.getCategories()
]);

/* content variables */
const articleCardsData = ref(null);
const trendingArticleCardsData = ref(trendingArticles.data);
const newArticleCardsData = ref(newArticles.data);
const videoCardsData = ref(null);
const trendingVideoCardsData = ref(trendingVideos.data);
const newVideoCardsData = ref(newVideos.data);

/* search input logic */
// prop feeder
const searchInputProps = ref({
  label: t('global.form.search'),
  isIconVisible: false,
  isLazy: false
});
// search query
const searchValue = ref('');

/* select input logic */
// options object
const categoriesObjects = ref(categories.categories.map(category => ({option: category})));
// prop feeder
const selectInputProps = ref({
    categoriesObjects: categoriesObjects.value,
    isSearchable: true,
    errMsg: '',
    status: 'default'
});
// category option selection
const selectedObjectCategories = ref('');

/* sort input logic */
const sortInputProps = ref({
    methods: [
        {
          option: t('global.form.order-by-options.latest')
        },
        {
          option: t('global.form.order-by-options.oldest')
        },
        {
          option: t('global.form.order-by-options.shortest')
        },
        {
          option: t('global.form.order-by-options.longest')
        },
    ],
    isSearchable: false,
    errMsg: '',
    status: 'default'
});
// sort option selection
const selectedObjectSort = ref('');

/* component global logic */
async function filter() {
  if (searchValue.value != '' || selectedObjectCategories.value != '' || selectedObjectSort.value != '') {
      // component arrangment changer
      isDefault.value = false;
      // loading style start 
      isLoading.value = true;

      // query construction 
      let queryArray = [];
      queryArray.push(`limit=${searchCardsViewLimit.value}`);
      if (searchValue.value) {
          queryArray.push(`search=${searchValue.value}`);
      }
      if (typeof selectedObjectCategories.value == 'object') {
          queryArray.push(`category=${selectedObjectCategories.value.option}`);
      }
      if (typeof selectedObjectSort.value == 'object') {
          queryArray.push(`sort=${selectedObjectSort.value.option}`);
      }

      // request articels and videos with custom queries
      const [newArticles, newVideos] = await Promise.all([
          knowledgeAPI.getArticlesByQuery(queryArray),
          knowledgeAPI.getVideosByQuery(queryArray),
      ]);
      articleCardsData.value = newArticles;
      videoCardsData.value = newVideos;

      // loading style end
      isLoading.value = false;
  } else {
      // loading style start 
      isLoading.value = true;

      // reset categories selection 
      articleCardsData.value = null;
      videoCardsData.value = null;

      // loading style end and resetting component arrangment to default
      isDefault.value = true;
      isLoading.value = false;
  }
}
// pagination logic 
async function nextArticlesPage(isNext) {
  // check if next or prev and validate logic
  if (isNext && articleCardsData.value.pagination.current_page < articleCardsData.value.pagination.last_page) {
    // start progress indcators 
    isArticlesLoading.value = true;

    // query construction and requesting 
    let query = [];
    query.push(`page=${articleCardsData.value.pagination.current_page+1}&limit=${searchCardsViewLimit.value}`)
    articleCardsData.value = await knowledgeAPI.getArticlesByQuery(query);

    // end progress indcators 
    isArticlesLoading.value = false;

  } else if (!isNext && articleCardsData.value.pagination.current_page > 1) {
    // start progress indcators 
    isArticlesLoading.value = true;

    // query construction and requesting 
    let query = [];
    query.push(`page=${articleCardsData.value.pagination.current_page-1}&limit=${searchCardsViewLimit.value}`)
    articleCardsData.value = await knowledgeAPI.getArticlesByQuery(query);

    // end progress indcators 
    isArticlesLoading.value = false;
  }
}
async function nextVideosPage(isNext) {
  // check if next or prev and validate logic
  if (isNext && videoCardsData.value.pagination.current_page < videoCardsData.value.pagination.last_page) {
    // start progress indcators 
    isVideosLoading.value = true;

    // query construction and requesting 
    let query = [];
    query.push(`page=${videoCardsData.value.pagination.current_page+1}&limit=${searchCardsViewLimit.value}`)
    videoCardsData.value = await knowledgeAPI.getVideosByQuery(query);

    // end progress indcators 
    isVideosLoading.value = false;

  } else if (!isNext && videoCardsData.value.pagination.current_page > 1) {
    // start progress indcators 
    isVideosLoading.value = true;

    // query construction and requesting 
    let query = [];
    query.push(`page=${videoCardsData.value.pagination.current_page-1}&limit=${searchCardsViewLimit.value}`)
    videoCardsData.value = await knowledgeAPI.getVideosByQuery(query);

    // end progress indcators 
    isVideosLoading.value = false;
  }
}
// styling logic 
// video card styling logic
watch(videoListRef, () => {
  if(videoListRef.value) videoCardWidth.value = videoListRef.value.getBoundingClientRect().width;
});
onMounted(() => {
    window.addEventListener('resize', function () {
      if (videoListRef.value) {
        videoCardWidth.value = videoListRef.value.getBoundingClientRect().width;
      }
    });
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', function () {
      if (videoListRef.value) {
        videoCardWidth.value = videoListRef.value.getBoundingClientRect().width;
      }
    });
});
</script>

<style lang="scss" scoped>
section.contentViewer {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 3rem;
    width: 100%;

    .inputsBox {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        padding-top: 0.3rem;

        @media #{$mq-820-down} {
            flex-wrap: wrap;
            justify-content: space-evenly;
            padding-bottom: 0.3rem;
        }

        & > * {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
        }
        .searchInput {
            width: 80%;

            @media #{$mq-820-down} {
                width: 100%;
            }
        }
        .selectInputContainer {
            width: 29%;

            @media #{$mq-820-down} {
                width: 45%;
            }
            @media #{$mq-365-down} {
                width: 100%;
            }
            button .label {
                p {
                    margin: 0;
                }
                .material-symbols-rounded {
                    margin: 0 0.2rem;
                    margin-top: -2px;
                    font-size: 1rem;
                }
            }
        }

        button {
          margin-top: -7px;
          border: 1px solid var(--dark-20);
          border-radius: 10px;
          padding: 0.4rem;
          background-color: var(--primary-5);
          color: var(--primary-90);
          transition-duration: 0.1s;

          @media #{$mq-820-down} {
            margin: 0.5rem;
            margin-top: 0.2rem;
            width: 100%;
          }
          &:hover {
            cursor: pointer;
            color: var(--primary);
          }
          &:active {
            border-color: var(--primary-70);
            scale: 0.95;
          }
        }
    }

    .contentType {
      position: relative;
      max-height: 200rem;
      transition-duration: 0.2s;

      &__minimized {
        max-height: 3.5rem;
        overflow: hidden;
      }
      & > button {
        position: absolute;
        top: 20px;
        right: 0;
        border: 1px solid var(--dark-20);
        border-radius: 7px;
        background-color: var(--dark-5);
        transition-duration: 0.2s;

        &:hover {
          cursor: pointer;
          background-color: var(--primary-5);
          color: var(--primary);
        }
        &:active {
          scale: 0.95;
        }
        html[dir='rtl'] & {
          right: unset;
          left: 0;
        }
      }
      h2 {
        margin-bottom: 0;
        text-transform: capitalize;
      }
      .defaultViewer {
          display: flex;
          flex-flow: column nowrap;
          margin-top: 0.5rem;
      }
  
      .searchViewer {

        .searchList {
          display: flex;
          flex-flow: column nowrap;

          .cards {
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            width: 100%;

            @media #{$mq-480-down} {
              justify-content: center;
              flex-direction: column;
            }
            & > * {
              margin: 0.5rem;
            }
          }

          .pagination {
            display: flex;
            flex-flow: column nowrap;
            margin: 0.5rem;

            &__loader {
              
              .buttons {
                p {
                height: 1rem;
                width: 1rem;
                }

                .button {
                  border: none;
                  padding: 0 0.2rem;
                  background-color: transparent;
                  color: var(--dark-20);
                  transition-duration: 0.2s;

                  &:hover {
                    cursor: progress;
                  }
                }
              }

              sub {
                height: 1rem;
                width: 5rem;
              }
            }

            .buttons {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;

              p {
                margin: 0;
                margin-inline-end: 0.3rem;
              }
              button {
                border: none;
                background-color: transparent;
                color: var(--dark);
                transition-duration: 0.2s;

                &:hover {
                  cursor: pointer;
                  color: var(--primary-70);
                }
                &:disabled {
                  cursor: unset;
                  color: var(--dark-20);
                }
              }
            }
          }
        }
      }
    }
}
</style>