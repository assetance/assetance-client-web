<template>
  <div class="container">
    <div
      :class="['videoCard', cardWidth]"
    >
      <div class="video loadingShader">
        <span class="material-symbols-rounded">
          play_arrow
        </span>
        <div class="time loadingShader" />
      </div>
      <div class="informatives">
        <div class="header loadingShader" />
        <h2 class="loadingShader" />
        <p class="loadingShader" />
        <div class="author">
          <div
            class="img loadingShader"
          />
          <div class="authorName loadingShader" />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
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
    width: 224px;
    padding: 0.5rem;
    background-color: var(--white);
    transition-duration: 0.3s;

      &__wide {
        width: 100%;
      }


      &:hover {
        cursor: progress;
      }

      .video {
        position: relative;
        border-radius: 10px;
        width: 100%;
        height: 140px;
        overflow: hidden;
        
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

        .time {
            position: absolute;
            bottom: 10px;
            right: 5px;
            border-radius: 7px;
            width: 3rem;
            height: 1.5rem;
            padding: 0.2rem 0.5rem;
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
              height: 1rem;
              width: 3rem;

          }

          &>h2 {
              margin: 0;
              margin-bottom: 0.2rem;
              height: 1.1rem;
              width: 100%;
          }
          &>p {
              position: relative;
              margin: 0;
              margin-top: 0.2rem;
              width: 100%;
              height: 2.6rem;
              overflow: hidden;
          }

          .author {
              display: flex;
              flex-flow: row nowrap;
              align-items:  center;
              margin-top: 0.5rem;

              .img {
                  border-radius: 50%;
                  width: 2.5rem;
                  height: 2rem;
                  object-fit: cover;
              }

              .authorName {
                  display: flex;
                  flex-flow: column nowrap;
                  margin-inline-start: 0.5rem;
                  height: 2rem;
                  width: 100%;
              }
          }
      }
  }
</style>