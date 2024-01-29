<template>
  <sub class="tackTag"><slot /></sub>
</template>

<style lang="scss" scoped>
sub.tackTag {
  background-color: var(--dark);
  color: var(--light);
  padding: 0.2rem 0.3rem;
  border-radius: 5px;
  text-transform: capitalize;
}
</style>
