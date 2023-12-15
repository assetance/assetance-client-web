<template>
  <div class="policies">
    <main class="wl">
      <Suspense>
        <template #default>
          <PoliciesDashboard />
        </template>
        <template #fallback>
          <PoliciesDashLoader />
        </template>
      </Suspense>
    </main>
  </div>
</template>
  
<script setup>
import PoliciesDashboard from '../components/policiesPage/PoliciesDashboard.vue';
import PoliciesDashLoader from '../components/policiesPage/PoliciesDashLoader.vue';
</script>
  
<style lang="scss">
div.policies {
    &>main {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        margin-top: 6rem;
    }
}
</style>