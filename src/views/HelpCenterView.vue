<template>
  <div class="helpCenter">
    <main class="wl">
      <div class="container">
        <header>{{ $t('help.header') }}</header>
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
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: 65%;

          @media #{$mq-820-down} {
            width: 100%;
          }

          &>header {
            border-radius: 10px;
            padding: 0.5rem 1rem;
            color: var(--primary);
            font-size: 1rem;
            text-transform: capitalize;
            backdrop-filter: blur(5px);
            background-color: var(--light-70);
          }

          &>h1 {
            border-radius: 10px;
            margin-top: 0.5rem;
            padding: 1rem 1.5rem;
            text-transform: capitalize;
            text-align: center;
            font-size: 2rem;
            font-weight: 700;
            backdrop-filter: blur(5px);
            box-shadow: var(--primary-larg-shadow);
            background-color: var(--light-70);

            @media #{$mq-820-down} {
              font-size: 1.5rem;
            }
          }
        }
    }
}
</style>