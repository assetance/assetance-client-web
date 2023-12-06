<template>
    <div class="policies">
        <main class="wl">
            <Suspense>
                <template #default>
                    <PoliciesDashboard></PoliciesDashboard>
                </template>
                <template #fallback>
                    <PoliciesDashLoader></PoliciesDashLoader>
                </template>
            </Suspense>
        </main>
    </div>
</template>
  
<script setup>
import PoliciesDashboard from '../components/policies/PoliciesDashboard.vue';
import PoliciesDashLoader from '../components/policies/PoliciesDashLoader.vue';
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