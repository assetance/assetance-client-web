<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <template #default>
              <div class="container">
                <component :is="Component" />
                <NavBar />
                <FooterComponent />
              </div>
            </template>

            <!-- loading state -->
            <template #fallback>
              <LoadingSlide />
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
import LoadingSlide from './components/LoadingSlide.vue';
import { useHead } from '@unhead/vue';

// global head tags
useHead({
  titleTemplate: (title) => title ? `${title} | Assetance` : 'Assetance' 
});
</script>

<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex-flow: column;
  justify-content: center;

  div.container {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
}
</style>
