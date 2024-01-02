<template>
  <router-link
    to="#"
    :class="[articleCardOrientation == 'articleCard__horizontal' ? 'horizontal' : '']"
  >
    <div
      :class="['articleCard', articleCardOrientation]"
    >
      <div
        class="img loadingShader"
      />
      <div class="informatives">
        <div class="header loadingShader" />
        <h2 class="loadingShader" />
        <p class="loadingShader" />
        <div class="author">
          <div
            class="img loadingShader" 
          />
          <div class="authorName">
            <h3 class="loadingShader" />
            <p class="loadingShader" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
  
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

/* props */
const props = defineProps({
  /**
   * orientaion possible values : 'auto', 'vertical', 'horizontal'
   */
    orientation: {
        type: String,
        required: false,
        default: 'auto'
    }
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

    &.horizontal{ 
      width: 100%;
    }
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
        height: 318px;
        width: 14rem;

        .img {
          border-radius: 10px;
          width: 100%;
          height: 7.5rem;
        }

        .informatives {
          margin: 0.5rem 0;
            .header {
                margin: 0;
                height: 1rem;
            }
        }
    }
    &__horizontal {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        max-height: 10rem;
        height: 100%;

        .img {
          border-radius: 7px;
          width: 20%;
        }
        .informatives {
          display: flex;
          flex-flow: column wrap;
          justify-content: flex-start;
          width: 75%;
          margin: 0 0.5rem;

          .header {
            margin: 0;
            height: 2rem;
          }
          h2 {
            height: 3rem;
          }
          p {
            height: 100%;
          }
        }
    }

    &:hover {
        cursor:progress;
    }

    .informatives {
        display: flex;
        flex-flow: column nowrap;
      
        &>h2 {
          margin: 0.5rem 0;
          height: 2rem;
        }
        &>p {
          margin:  0;
          height: 4rem;
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
            }

            .authorName {
              display: flex;
              flex-flow: column nowrap;
              margin-inline-start: 0.5rem;
              width: 100%;

              h3 {
                margin: 0;
                height: 0.9rem;
                width: 100%;
              }
              p {
                margin: 0.2rem 0;
                height: 0.7rem;
                width: 100%;
              }
            }
        }
    }
}
</style>