<template>
  <Teleport to="body">
    <!-- toast element -->
    <div class="toastElement fade-in">
      <p>
        <slot name="default" />
      </p>
    </div>
  </Teleport>
</template>

<script setup></script>

<style lang="scss" scoped>
.toastElement {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 10px;
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--dark-70);
    color: var(--light-70);
    user-select: none;
    animation-duration: 0.2s;

    p {
        margin: 0;
    }
}
</style>