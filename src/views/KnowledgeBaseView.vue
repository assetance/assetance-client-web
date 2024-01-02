<template>
  <div class="knowledgeBase">
    <main class="wl">
      <HeroSection />
      <NewUserSection />
      <Transition name="fade">
        <Suspense>
          <template #default>
            <ContentViewerSection />
          </template>
          <template #fallback>
            <!-- content viewer skeleton loading effect -->
            <ContentViewerSectionLoader />
          </template>
        </Suspense>
      </Transition>
    </main>
  </div>
</template>

<script setup>
import ContentViewerSection from '../components/knowledgeBasePage/ContentViewerSection.vue';
import ContentViewerSectionLoader from '../components/knowledgeBasePage/ContentViewerSectionLoader.vue';
import HeroSection from '../components/knowledgeBasePage/HeroSection.vue';
import NewUserSection from '../components/knowledgeBasePage/NewUserSection.vue';

</script>

<style lang="scss">
.knowledgeBase {
    padding-top: 5rem;

    &>main {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

    }
}
</style>