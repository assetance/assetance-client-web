<template>
  <Suspense>
    <div class="home wl">
      <h1>Home page here</h1>
    </div>

    <template #fallback>Loading Home, ........</template>
  </Suspense>
</template>

<script setup></script>

<style lang="scss" scoped>
div.home {
  margin-top: 80px;
}
</style>
