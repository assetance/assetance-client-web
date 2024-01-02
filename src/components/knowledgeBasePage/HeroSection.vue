<template>
  <section class="heroSection">
    <header>{{ $t('knowledge.hero.knowledge-is-key') }}</header>
    <h1>{{ $t('knowledge.hero.knowledge-base') }}</h1>
    <p>{{ $t('knowledge.hero.description') }}</p>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.heroSection {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

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
    margin-top: 0.5rem;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 700;
    backdrop-filter: blur(5px);
    box-shadow: var(--primary-larg-shadow);
    background-color: var(--light-70);

    @media #{$mq-820-down} {
      font-size: 1.5rem;
    }
  }

  &>p {
    margin: 0;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    text-align: center;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);
  }
}
</style>