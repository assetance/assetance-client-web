<template>
  <li
    class="dropdownOption"
    role="option"
  >
    <slot name="option" />
  </li>
</template>

<script setup></script>

<style lang="scss" scoped>
li.dropdownOption {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    padding: 0.5rem;
    transition-duration: 0.2s;

    &:hover {
        cursor: pointer;
        background-color: var(--dark-5);
    }
}
</style>