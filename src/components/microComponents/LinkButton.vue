<template>
  <button class="linkButton">
    <p
      v-if="$slots.default"
      class="text"
      :dir="dir"
    >
      <slot />
    </p>
    <span
      class="material-symbols-rounded"
      v-if="icon"
    >{{ icon }}</span>
    <span
      class="material-symbols-rounded"
      v-else-if="dir == 'rtl'"
    >arrow_back</span>
    <span
      class="material-symbols-rounded"
      v-else
    >arrow_forward</span>
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
});
</script>

<style lang="scss" scoped>
button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

button {
  --primary-color: var;
  --hovered-color: #c84747;
  position: relative;
  display: flex;
  font-weight: 600;
  font-size: 20px;
  gap: 0.5rem;
  align-items: center;

  &::after {
    position: absolute;
    content: '';
    width: 0;
    left: 0;
    bottom: -7px;
    background: var(--primary);
    height: 2px;
    transition: 0.2s ease-out;
  }

  &:hover {
    cursor: pointer;
  }

  p.text {
    margin: 0;
    position: relative;
    font-size: 1rem;
  }
  p.text::before {
    position: absolute;
    /*   box-sizing: border-box; */
    content: '';
    width: 0%;
    inset: 0;
    color: var(--primary);
    overflow: hidden;
    transition: 0.2s ease-out;
  }

  &:hover::after {
    width: 100%;
  }

  &:hover p.text::before {
    width: 100%;
  }

  &:hover span {
    transform: translateX(4px);
    color: var(--primary);
  }

  span {
    color: var(--dark);
    transition: 0.2s;
    position: relative;
    width: 15px;
    transition-delay: 0.1s;
  }

  .material-symbols-rounded {
    font-variation-settings: 'wght' 300;
  }
}
</style>
