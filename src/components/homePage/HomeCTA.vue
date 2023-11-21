<template>
  <section class="wl">
    <div class="box">
      <h2>{{ $t('home.home-cta.ready') }}</h2>
      <p>{{ $t('home.home-cta.start-in-minutes') }}</p>
      <button @click="onClick">
        {{ $t('global.get-started') }} <span class="material-symbols-rounded"> in_home_mode </span>
      </button>
    </div>
  </section>
</template>

<script setup>
function onClick() {
  // push to the right page
}
</script>

<style lang="scss" scoped>
section.wl {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: var(--secondary);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 100%;
    background: linear-gradient(92deg, var(--light) 5%, transparent 65%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0px;
    width: 10%;
    height: 100%;
    background: linear-gradient(280deg, var(--light) 5%, transparent 65%);
  }

  .box {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border: 1.5px solid var(--primary-40);
    border-radius: 10px;
    box-shadow: var(--larg-shadow);
    width: 100%;
    padding: 1rem;
    background-color: var(--light);

    h2 {
      margin-bottom: 0.5rem;
      text-align: center;
      text-transform: capitalize;

      @media #{$mq-820-down} {
        font-size: 1.5rem;
      }
    }

    p {
      text-transform: capitalize;
    }

    button {
      display: flex;
      align-items: center;
      border: none;
      border-radius: 7px;
      box-shadow: var(--small-shadow);
      padding: 0.5rem;
      background-color: var(--dark);
      color: var(--light);
      text-transform: capitalize;
      font-weight: 500;
      letter-spacing: 0.5px;
      transition-duration: 0.3s;

      &:hover {
        cursor: pointer;
        scale: 1.02;
        box-shadow: var(--meduim-shadow);
      }

      &:active {
        scale: 0.98;
      }

      span {
        margin: 0rem 0.5rem;
      }
    }
  }
}
</style>
