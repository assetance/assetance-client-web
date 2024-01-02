<template>
  <Teleport to="main">
    <div
      class="videoOverlay fade-in"
    >
      <iframe
        ref="iframeRef"
        :src="props.link"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        @clickout="emit('close', true);"
        v-show="iframeLoaded"
      />
      <div
        ref="iframeLoaderRef"
        class="iframeLoader loadingShader"
        v-show="!iframeLoaded"
      />
      <span
        class="material-symbols-rounded iconLtr"
        @click="emit('close', true);"
      >
        close
      </span>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

/* props and emits */
const props = defineProps({
  link: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['close']);

/* component variables and element refrences */
const viewPortWidth = ref(window.innerWidth);
const iframeRef = ref(null);
const iframeLoaderRef = ref(null);
const iframeLoaded = ref(false);
const viewRatio = 16/9;

/* view size logic */
function adjustIframeSize() {
  viewPortWidth.value = window.innerWidth;
  if(viewPortWidth.value > 560) {
    iframeRef.value.style.width = (viewPortWidth.value * 0.6) + 'px';
    iframeRef.value.style.height = ((viewPortWidth.value * 0.6) / viewRatio) + 'px';
    iframeLoaderRef.value.style.width = (viewPortWidth.value * 0.6) + 'px';
    iframeLoaderRef.value.style.height = ((viewPortWidth.value * 0.6) / viewRatio) + 'px';
  } else {
    iframeRef.value.style.width = (viewPortWidth.value * 0.9) + 'px';
    iframeRef.value.style.height = ((viewPortWidth.value * 0.9) / viewRatio) + 'px';
    iframeLoaderRef.value.style.width = (viewPortWidth.value * 0.9) + 'px';
    iframeLoaderRef.value.style.height = ((viewPortWidth.value * 0.9) / viewRatio) + 'px';
  }
}

onMounted(() => {
  // logic
  adjustIframeSize();
  iframeRef.value.onload = function() {
    iframeLoaded.value = true;
  };

  // listeners
  window.addEventListener('resize', adjustIframeSize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustIframeSize);
});
</script>

<style lang="scss" scoped>
.videoOverlay {
    position: fixed;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    top: 4rem;
    left: 0;
    right: 0;
    height: calc(100vh - 4rem);
    background-color: var(--dark-40);

    @media #{$mq-820-down} {
      top: 3rem;
      height: calc(100vh - 3rem);
    }
    iframe {
      box-shadow: var(--xxlarg-shadow);
      border-radius: 10px;
    }
    .iframeLoader {
      box-shadow: var(--xxlarg-shadow);
      border-radius: 10px;
    }
    span.material-symbols-rounded {
      position: absolute;
      top: 2%;
      right: 2%;
      border-radius: 7px;
      padding: 0.2rem;
      color: var(--light);
      font-size: 1.5rem;
      font-weight: 800;
      background-color: var(--dark-70);

      &:hover {
        cursor: pointer;
      }
    }
}
</style>