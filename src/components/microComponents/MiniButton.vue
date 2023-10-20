<template>
  <button>
    <span
      :class="['material-symbols-rounded', dir == 'rtl' ? 'rtl' : '']"
      v-if="icon"
      >{{ icon }}</span
    >
  </button>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';

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
});
</script>

<style lang="scss" scoped>
button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 0.3rem;
  max-width: 100%;
  width: fit-content;
  height: auto;
  border: 1px solid var(--primary-20);
  color: var(--primary);
  transition-duration: 0.1s;
  background-color: var(--secondary);
  border-radius: 0.625rem;

  &:hover {
    cursor: pointer;
  }
  &:active {
    box-shadow: none;
    scale: 0.95;
  }

  span.material-symbols-rounded {
    font-size: 24px;
  }
  span.rtl {
    direction: rtl;
  }
}

@keyframes fadeOut {
  0% {
  }
  100% {
    max-width: 0;
    opacity: 0;
  }
}
</style>
