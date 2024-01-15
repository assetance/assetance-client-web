<template>
  <!-- hero / banner section -->
  <section class="hero">
    <!-- article information -->
    <div class="informatives">
      <div class="breadcrumbs">
        <p>
          <router-link :to="{name: 'knowledge'}">
            {{ $t('article.hero.knowledge-base') }}
          </router-link> > <span>{{ $t('article.hero.articles') }}</span> - <span>{{ articleData.category }}</span>
        </p>
      </div>
      <!-- title -->
      <h1>{{ articleData.title }}</h1>
      <!-- author & date and read time -->
      <p>
        {{ $t('article.hero.by') }} <span class="authorName">{{ articleData.authorName }}</span> 
        <br> 
        <sub><time :datetime="articleData.publishedAt">{{ publishedAtText }}</time> <span>&#x2022;</span> <time :datetime="articleData.readTime">{{ $t('global.articles.read-time', readTimeDuration, {n:readTimeDuration}) }}</time></sub>
      </p>
      <!-- social sharing links -->
      <div class="social">
        <p>{{ $t('article.hero.share-this-article') }}</p> 
        <ul class="socialPlatforms">
          <li>
            <button 
              @click="copyLink"
            >
              <span class="material-symbols-rounded img">
                link
              </span>
            </button>
          </li>
          <!-- TODO post-ready templates for each social media platform (if applicable) -->
          <li
            aria-hidden="true"
            class="divider"
          >
            |
          </li>
          <li>
            <button 
              @click="shareArticle('x')"
            >
              <img
                src="@/assets/social/twitterx.png"
                :alt="$t('article.hero.share-on-x')"
              >
            </button>
          </li>
          <!-- <li>
            <button>
              <img
                src="@/assets/social/instagram.png"
                alt="share on Instagram"
              >
            </button>
          </li>
          <li>
            <button>
              <img
                src="@/assets/social/facebook.png"
                alt="share on Facebook"
              >
            </button>
          </li>
          <li>
            <button>
              <img
                src="@/assets/social/tiktok.png"
                alt="share on Tiktok"
              >
            </button>
          </li>
          <li>
            <button>
              <img
                src="@/assets/social/linkedin.png"
                alt="share on Linkedin"
              >
            </button>
          </li> -->
        </ul>
      </div>
    </div>
    <!-- article image -->
    <div class="visual">
      <img
        src="https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6"
        :alt="articleData.summary"
      >
    </div>
    <toast-element v-if="showToast">
      {{ $t('article.hero.copied') }}
    </toast-element>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router';
import ToastElement from '../microComponents/ToastElement.vue';
import { ref, computed } from 'vue';
import { Duration, DateTime } from 'luxon';
import { useI18n } from 'vue-i18n';

// general logic
const { t } = useI18n();
const route = useRoute();
const showToast = ref(false);

// props 
const props = defineProps({
  articleData: {
    type: Object,
    required: true
  }
});

// props modifiers
const readTimeDuration = computed(() => {
    let duration = Duration.fromISO(props.articleData.readTime);
    return duration.as('minutes') < 1 ? 0 : Math.floor(duration.as('minutes'));
});
const publishedAtText = computed(() => {
  let date = DateTime.fromISO(props.articleData.publishedAt);
  return date.toFormat('dd LLL yyyy');
});

// functions
function copyLink() {
  // copy link to clipboard and alert the user
  navigator.clipboard.writeText(window.location.origin + route.path)
    .then(() => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 2000);
    });
}

function shareArticle(platform) {
  /**
   * TODO v1:: make a post-ready shareable templates for each social media platform 
   */
  switch (platform) {
    case 'x':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t('article.hero.check-out-this-article'))}&url=${encodeURIComponent(import.meta.env.VITE_BASE_URL + route.path)}`, '_blank');
      break;
  
    default:
      break;
  }
}
</script>

<style lang="scss" scoped>
section.hero {
  display: flex;
  flex-flow: row nowrap;
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--primary-5);

  @media #{$mq-820-down} {
    flex-direction: column;
  }

  .informatives {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    @media #{$mq-820-down} {
      order: 2;
      align-items: center;
      text-align: center;
    }
    .breadcrumbs {
      font-size: 0.9rem;

      a {
        color: var(--primary);
        text-decoration: none;
      }
    }

    h1 {
      text-transform: capitalize;
      @media #{$mq-820-down} {
        margin: 0.3rem 0;
      }
    }

    & > p {
      margin-top: auto;
      color: var(--primary);
      font-size: 0.9rem;
      font-weight: 600;

      .authorName {
        text-transform: capitalize;
      }

      sub {
        font-weight: 500;
      }
    }

    .social {
      display: flex;
      flex-flow: row wrap;
      align-items: center;

      & > * {
        margin: 0;
      }
      p {
        font-weight: 500;
      }
      .socialPlatforms {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin-inline-start: 0.5rem;
        padding: 0;
        list-style: none;

        li {
          margin: 0.2rem;

          button {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            border: none;
            border-radius: 50%;
            padding: 0;
            background-color: transparent;
            transition-duration: 0.2s;

            &:hover {
              cursor: pointer;
              scale: 1.07;

              & > img {
                box-shadow: var(--medium-shadow);
              }
            }

            img {
              border-radius: 50%;
              width: 24px;
              transition-duration: 0.2s;
            }
          }
        }
        li.divider {
          user-select: none;
        }
      }
    }
  }

  .visual {

    @media #{$mq-820-down} {
      order: 1;
      width: 100%;
    }

    img {
      box-shadow: var(--larg-shadow);
      border-radius: 10px;
      object-fit: cover;
      
      @media #{$mq-820-down} {
        width: 100%;
      }
    }
  }
}
</style>