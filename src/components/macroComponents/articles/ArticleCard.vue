<template>
  <router-link :to="{name: 'knowledge-article', params: {id: props.articleData.id}}">
    <div
      :class="['articleCard', articleCardOrientation]"
    >
      <img
        :src="props.articleData.img"
        alt="placeholder image"
      >
      <article class="informatives">
        <header class="header">
          <TackTag>{{ props.articleData.category }}</TackTag>
          <span>&#x2022;</span>
          <p><time :datetime="props.articleData.readTime">{{ $t('global.articles.read-time', readTimeDuration,{n:readTimeDuration}) }}</time></p>
        </header>
        <h2>{{ props.articleData.title }}</h2>
        <p>{{ props.articleData.summary }}</p>
        <div class="author">
          <img
            :src="props.articleData.authorImg"
            alt="author image"
          >
          <div class="authorName">
            <h3>{{ props.articleData.authorName }}</h3>
            <p><time :datetime="props.articleData.publishedAt">{{ publishedAtText }}</time></p>
          </div>
        </div>
      </article>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import TackTag from '../../microComponents/TackTag.vue';
import { Duration, DateTime } from 'luxon';

/* props */
const props = defineProps({
    /**
     * orientaion possible values : 'auto', 'vertical', 'horizontal'
     */
    orientation: {
        type: String,
        required: false,
        default: 'auto'
    },
    articleData: {
        type: Object,
        required: false,
        default: () => {return {
            id: 'AB01D',
            img: "https://us.123rf.com/450wm/shushanto/shushanto2209/shushanto220900703/191842443-destruction-of-planets-concept-art-illustration-background-image.jpg?ver=6",
            category: "category",
            readTime: "PT5M23S",
            title: "article title",
            summary: "article body Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!",
            authorImg: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            authorName: "author name",
            publishedAt: "2024-01-01T12:25:22Z"
        }}
    }
});
// prop value modifiers
const readTimeDuration = computed(() => {
    let duration = Duration.fromISO(props.articleData.readTime);
    return duration.as('minutes') < 1 ? 0 : Math.floor(duration.as('minutes'));
});
const publishedAtText = computed(() => {
  let date = DateTime.fromISO(props.articleData.publishedAt);
  return date.toFormat('dd LLL yyyy');
});

/* style logic */
const screenWidth = ref(window.innerWidth);
const articleCardOrientation = computed(() => {
    switch (props.orientation) {
        case 'vertical':
            return 'articleCard__vertical';
        case 'horizontal':
            return 'articleCard__horizontal';
        default:
            if(screenWidth.value < 480)
                return 'articleCard__horizontal';
            else return 'articleCard__vertical'
    }
});
function handleResize() {
    screenWidth.value = window.innerWidth;
}
onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
a {
    display: block;
    color: var(--dark);
    text-decoration: none;
}
.articleCard {
    box-shadow: var(--medium-shadow);
    border: 1px solid var(--dark-5);
    border-radius: 10px;
    padding: 0.5rem;
    background-color: var(--white);
    transition-duration: 0.3s;

    &__vertical {
        display: flex;
        flex-flow: column nowrap;
        max-width: 14rem;
        width: 100%;

        img {
            width: 100%;
            max-height: 10rem;
            height: 100%;
        }

        .informatives {

            .header {
                margin: 0.5rem 0;
            }
            p {
                max-height: 5rem;
                height: 100%;
            }
        }
    }
    &__horizontal {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        max-height: 10rem;
        height: 100%;

        img {
            width: 20%;
        }
        .informatives {
            display: flex;
            flex-flow: column wrap;
            justify-content: flex-start;
            margin: 0 0.5rem;
            .header {
                margin: 0;
                margin-bottom: 0.5rem;
            }
            p {
                height: 100%;
            }
        }
    }

    &:hover {
        box-shadow: var(--larg-shadow);
        scale: 1.03; 
    }
    &:active {
        box-shadow: var(--small-shadow);
        scale: 0.97;
    }

    img {
        border-radius: 7px;
        object-fit: cover;
    }

    .informatives {
        display: flex;
        flex-flow: column nowrap;

        .header {
            display: flex;
            flex-flow: row wrap;
            align-items: baseline;
            font-size: 0.8rem;
            
            span {
                margin: 0 0.5rem;
            }

            p {
                margin: 0;
                color: var(--primary);
            }
        }

        &>h2 {
            margin: 0;
            margin-bottom: 0.2rem;
            font-size: 1.1rem;
        }
        &>p {
            position: relative;
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.07;
            overflow: hidden;
            text-overflow: ellipsis;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 1rem;
                background: linear-gradient(180deg, transparent 0%, var(--white) 90%);
            }
        }

        .author {
            display: flex;
            flex-flow: row nowrap;
            align-items:  center;
            margin-top: 0.5rem;

            img {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
            }

            .authorName {
                display: flex;
                flex-flow: column nowrap;
                margin-inline-start: 0.5rem;

                h3 {
                    margin: 0;
                    font-size: 0.9rem;
                }
                p {
                    margin: 0;
                    font-size: 0.7rem;
                }
            }
        }
    }
}
</style>