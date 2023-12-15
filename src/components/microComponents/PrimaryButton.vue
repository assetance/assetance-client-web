<template>
  <button>
    <div
      class="loader"
      v-if="isLoading"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
    <span
      class="material-symbols-rounded"
      v-if="icon && !isLoading"
    >{{ icon }}</span>
    <p
      v-if="$slots.default && !isLoading"
      :class="[
        icon ? 'text' : 'text_only',
        dir === 'rtl' ? 'text__right_padding' : 'text__left_padding',
      ]"
    >
      <slot />
    </p>
  </button>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const dir = ref('');

onMounted(async () => {
  // check and set styling depending on language direction
  if (document.documentElement.hasAttribute('dir') == true) {
    dir.value = document.documentElement.getAttribute('dir');
  }
});

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
  isLoading: {
    type: Boolean,
    required: false,
  },
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  box-shadow: var(--small-shadow);
  max-width: 100%;
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 0.625rem;
  font-weight: var(--medium-text);
  color: var(--light);
  background: var(--primary-accent);
  transition-duration: 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: var(--medium-shadow);
    scale: 1.02;
  }

  &:active {
    box-shadow: var(--small-shadow);
    scale: 1;
  }

  .text {
    margin: 0;
    padding: 0rem 1rem; // fallback padding for animation
    max-width: 500px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: var(--meduim-text);
    color: whitesmoke;
    transition-duration: 0.2s;

    &__left_padding {
      padding: 0;
      padding-left: 1rem;
    }

    &__right_padding {
      padding: 0;
      padding-right: 1rem;
    }
  }

  &:hover .text {
    padding: 0;
    animation: fadeOut 0.1s linear forwards;
  }

  .text_only {
    margin: 0;
    padding: 0rem 1rem;
    max-width: 500px;
    overflow: hidden;
    white-space: nowrap;
    font-weight: var(--meduim-text);
    color: whitesmoke;
    transition-duration: 0.2s;
  }

  span.material-symbols-rounded {
    width: fit-content;
    transition-duration: 0.2s;
  }

  // laoder
  .loader {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }

  .loader div {
    position: absolute;
    top: 38px;
    width: 12px;
    height: 6px;
    border-radius: 30%;
    background: var(--light);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  .loader div:nth-child(1) {
    left: 10px;
    animation: flip1 0.6s infinite;
  }

  .loader div:nth-child(2) {
    left: 10px;
    animation: flip2 0.6s infinite;
  }

  .loader div:nth-child(3) {
    left: 34px;
    animation: flip2 0.6s infinite;
  }

  .loader div:nth-child(4) {
    left: 58px;
    animation: flip3 0.6s infinite;
  }
}

@keyframes fadeOut {
  0% {}

  100% {
    max-width: 0;
    opacity: 0;
  }
}

// loader animation
@keyframes flip1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes flip3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes flip2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
