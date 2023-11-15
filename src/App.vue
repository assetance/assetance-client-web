<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <template #default>
              <div class="container">
                <component :is="Component"></component>
                <NavBar></NavBar>
                <FooterComponent></FooterComponent>
              </div>
            </template>

            <!-- loading state -->
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
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
