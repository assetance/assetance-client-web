<template>
  <div class="helpCenter">
    <main class="wl">
      <div class="container">
        <h1>{{ $t('help.help-center') }}</h1>
        <Transition name="fade">
          <Suspense>
            <template #default>
              <FAQSupport />
            </template>
            <template #fallback>
              <FAQSupportLoader />
            </template>
          </Suspense>
        </Transition>
        <Transition name="fade">
          <Suspense>
            <template #default>
              <ArticlesSupport />
            </template>
            <template #fallback>
              <!-- artilce skeleton loaders are in component -->
              Loading Articles ...
            </template>
          </Suspense>
        </Transition>
      </div>
      <Transition name="fade">
        <Suspense>
          <template #default>
            <ContactSupport />
          </template>
          <template #fallback>
            <ContactSupportLoader />
          </template>
        </Suspense>
      </Transition>
    </main>
  </div>
</template>
  
<script setup>
import ArticlesSupport from '../components/helpCenterPage/ArticlesSupport.vue';
import ContactSupport from '../components/helpCenterPage/ContactSupport.vue';
import ContactSupportLoader from '../components/helpCenterPage/ContactSupportLoader.vue';
import FAQSupport from '../components/helpCenterPage/FAQSupport.vue';
import FAQSupportLoader from '../components/helpCenterPage/FAQSupportLoader.vue';
</script>
  
<style lang="scss">
div.helpCenter {
    &>main {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        margin-top: 5rem;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
          align-items: center;
        }

        &>.container {
          width: 65%;

          @media #{$mq-820-down} {
            width: 100%;
          }

          h1 {
            width: 100%;
            text-transform: capitalize;
            text-align: center;
          }
        }
    }
}
</style>