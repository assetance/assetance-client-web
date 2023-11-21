<template>
  <section class="wl">
    <div class="titles">
      <header>{{ $t('home.income-sources.tagline') }}</header>
      <h2>{{ $t('home.income-sources.title') }}</h2>
    </div>
    <div class="incomeSource">
      <div class="icon">
        <span class="material-symbols-rounded"> payments </span>
      </div>
      <h3>{{ $t('home.income-sources.source1.title') }}</h3>
      <p>{{ $t('home.income-sources.source1.description') }}</p>
    </div>
    <div class="incomeSource">
      <div class="icon">
        <span class="material-symbols-rounded"> monitoring </span>
      </div>
      <h3>{{ $t('home.income-sources.source2.title') }}</h3>
      <p>{{ $t('home.income-sources.source2.description') }}</p>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.wl {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
  margin: 3rem 0rem;
  padding: 1rem;

  .incomeSource {
    align-self: flex-start;
    border: 1px solid var(--dark-5);
    border-radius: 10px;
    box-shadow: var(--medium-shadow);
    background-color: var(--light);
    margin: 1rem 0.5rem;
    padding: 1rem;
    width: 46%;

    @media #{$mq-820-down} {
      max-width: unset;
      width: 100%;
    }

    &:nth-child(2) {
      order: 1;

      @media #{$mq-820-down} {
        order: 2;
      }
    }

    &:nth-child(3) {
      order: 3;
    }

    .icon {
      display: flex;
      justify-content: center;
      border-radius: 7px;
      background-color: var(--primary-5);
      font-size: 0;
      padding: 0.2rem;
      color: var(--primary);

      span {
        font-size: 2rem;
      }
    }
  }

  .titles {
    order: 1;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;
    width: 100%;

    &>header {
      border-radius: 10px;
      padding: 0.5rem 1rem;
      color: var(--primary);
      font-size: 1rem;
      text-transform: capitalize;
      backdrop-filter: blur(5px);
      background-color: var(--light-70);
    }

    &>h2 {
      border-radius: 10px;
      box-shadow: var(--primary-larg-shadow);
      margin-top: 0.5rem;
      padding: 1rem 1.5rem;
      text-transform: capitalize;
      font-size: 2rem;
      font-weight: 700;
      backdrop-filter: blur(5px);
      background-color: var(--light-70);

      @media #{$mq-820-down} {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
