<template>
  <div class="container">
    <div
      :class="['videoCard', cardWidth]"
      @click="isClosed = false"
    >
      <!-- thumbnail -->
      <div class="video">
        <img
          :src="props.videoData.thumbnailUrl"
          alt="thumbnail image"
        >
        <span class="material-symbols-rounded">
          play_arrow
        </span>
        <time :datetime="props.videoData.duration">{{ durationText }}</time>
      </div>
      <!-- description -->
      <div class="informatives">
        <div class="header">
          <TackTag>{{ props.videoData.category }}</TackTag>
        </div>
        <h2>{{ props.videoData.title }}</h2>
        <p>{{ props.videoData.description }}</p>
        <div class="author">
          <img
            :src="props.videoData.authorImg"
            alt="author image"
          >
          <div class="authorName">
            <h3>{{ props.videoData.authorName }}</h3>
            <p><time :datetime="props.videoData.publishedAt">{{ publishedAtText }}</time></p>
          </div>
        </div>
      </div>
    </div>
    <!-- player component -->
    <VideoOverlay
      @close="(value) => {isClosed = value;}"
      v-if="!isClosed"
      :link="props.videoData.videoLink"
    />
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import TackTag from '../../microComponents/TackTag.vue';
import VideoOverlay from './VideoOverlay.vue';
import { Duration, DateTime } from 'luxon';

const isClosed = ref(true);

/* props */
const props = defineProps({
    videoData: {
        type: Object,
        required: true,
        default: () => {return {
          id: 'AB01D',
          yid: 'xSrjtJ2AZqw',
          category: 'category',
          title: 'title',
          description: 'video description Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, voluptate aspernatur pariatur culpa eaque dolor. Totam, cumque. Deserunt, at sed!',
          authorName: 'author name',
          authorImg: 'https://cdn.vox-cdn.com/thumbor/Y97pdEOBw39qZ2SdbIo_dKkHOmY=/0x0:4000x6000/1200x0/filters:focal(0x0:4000x6000):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/9637713/Fillipovic__Jill__cr_Gary_He_.jpeg',
          duration: 'PT5M23S',
          publishedAt: '2024-01-01T12:25:22Z',
          thumbnailUrl: 'https://images.crowdspring.com/blog/wp-content/uploads/2017/08/23163415/pexels-binyamin-mellish-106399.jpg',
          videoLink: 'https://www.youtube.com/embed/xSrjtJ2AZqw?si=tnYCzpGFPpwyiVhA'
        }}
    },
    fullWidth: {
      /**
       * Boolean : [true, false] always on or off
       *  - or -
       * Number : [<Number>] parent width
       *  - or -
       * String : [<String>(any)] (window width, NOT RECOMMENDED)
       */
      type: [Boolean, Number, String],
      required: false,
      default: false
    }
});
// prop value modifires
const durationText = computed(() => {
  let time = Duration.fromISO(props.videoData.duration);
  return time.as('hours') < 1 ? time.toFormat("m:ss") : time.toFormat("h:mm:ss");
});
const publishedAtText = computed(() => {
  let date = DateTime.fromISO(props.videoData.publishedAt);
  return date.toFormat('dd LLL yyyy');
});

/* styling logic */
const screenWidth = ref(window.innerWidth);
const cardWidth = computed(() => {
  switch (typeof props.fullWidth) {
    case 'boolean':
      if(props.fullWidth) return 'videoCard__wide';
      else return '';

    case 'number':
      if(props.fullWidth < 480 ) return 'videoCard__wide';
      else return '';

    case 'string':
      if(screenWidth.value < 480 ) return 'videoCard__wide';
      else return '';

    default:
      return '';
  }
});
</script>
  
<style lang="scss" scoped>
a {
    margin: 0.5rem;
    color: var(--dark);
    text-decoration: none;
}
.videoCard {
  display: flex;
  flex-flow: column nowrap;
  box-shadow: var(--medium-shadow);
  border: 1px solid var(--dark-5);
  border-radius: 10px;
  max-width: 14rem;
  width: 100%;
  padding: 0.5rem;
  background-color: var(--white);
  transition-duration: 0.3s;

    &__wide {
      max-width: unset;
    }


    &:hover {
      cursor: pointer;
      box-shadow: var(--larg-shadow);
      scale: 1.03; 
    }
    &:active {
      box-shadow: var(--small-shadow);
      scale: 0.97;
    }

    .video {
      position: relative;
      border-radius: 10px;
      width: 100%;
      max-height: 10rem;
      overflow: hidden;
      
      img {
        border-radius: 7px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span.material-symbols-rounded {
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 10px;
        padding: 0.5rem;
        transform: translate(-50%, -50%);
        color: var(--light-70);
        background-color: var(--dark-70);
      }
      time {
        position: absolute;
        bottom: 10px;
        right: 5px;
        border-radius: 7px;
        padding: 0.2rem 0.5rem;
        color: var(--light-90);
        background-color: var(--dark-70);

      }
    }

    .informatives {
        display: flex;
        flex-flow: column nowrap;

        .header {
            display: flex;
            flex-flow: row wrap;
            align-items: baseline;
            margin: 0.5rem 0;
            font-size: 0.8rem;
        }

        &>h2 {
            margin: 0;
            margin-bottom: 0.2rem;
            font-size: 1.1rem;
        }
        &>p {
            position: relative;
            margin: 0;
            max-height: 2rem;
            height: 100%;
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
                object-fit: cover;
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