<template>
  <section class="faq">
    <h1>{{ $t('help.faqs.faq') }}</h1>
    <ul>
      <li
        v-for="n in 5"
        :key="n"
      >
        <DetailsElement>
          <template #summary>
            {{ $t(`help.faqs.faq${n}.question`) }}
          </template>
          <template #details>
            {{ $t(`help.faqs.faq${n}.answer`) }}
          </template>
        </DetailsElement>
      </li>
    </ul>
  </section>
</template>

<script setup>
import DetailsElement from '../microComponents/DetailsElement.vue';
</script>

<style lang="scss" scoped>
section.faq {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    padding: 1rem;

    @media #{$mq-820-down} {
        padding: 0.5rem 0rem;
    }

    &>h1 {
        margin: 0;
        margin-top: 0.5rem;
        text-align: center;
    }

    ul {
        padding: 0;
        list-style: none;
        width: 100%;

        li {
            width: 100%;
        }
    }

}
</style>