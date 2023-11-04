<template>
  <section class="wl" aria-label="assetance featuers">
    <header>Investing Simplified With Assetance</header>
    <h2>Why Assetance ?</h2>
    <ul class="features">
      <li>
        <div class="icon" aria-label="check mark">
          <span class="material-symbols-rounded"> check </span>
        </div>
        <div class="info">
          <h3>Shares on your terms</h3>
          <p>Put your property shares for sale anytime you want.</p>
        </div>
      </li>
      <li>
        <div class="icon" aria-label="check mark">
          <span class="material-symbols-rounded"> check </span>
        </div>
        <div class="info">
          <h3>Expert Property Management</h3>
          <p>
            Enjoy the benefits of ownership & leave management on our experts
          </p>
        </div>
      </li>
      <li>
        <div class="icon" aria-label="check mark">
          <span class="material-symbols-rounded"> check </span>
        </div>
        <div class="info">
          <h3>No boundaries</h3>
          <p>Invest from anywhere in the world, we support +150 countries.</p>
        </div>
      </li>
      <li>
        <div class="icon" aria-label="check mark">
          <span class="material-symbols-rounded"> check </span>
        </div>
        <div class="info">
          <h3>Easy diversification</h3>
          <p>
            Easley diversify your portfolio with our multi market properties.
          </p>
        </div>
      </li>
    </ul>
    <div class="ctaButton">
      <SecondaryButton>Start Investing</SecondaryButton>
    </div>
  </section>
</template>

<script setup>
import SecondaryButton from '../microComponents/SecondaryButton.vue';
</script>

<style lang="scss" scoped>
section.wl {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 3rem 0rem;
  overflow: hidden;

  @media #{$mq-820-down} {
    align-items: center;
  }

  & > header {
    margin-inline-start: 2rem;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: var(--primary);
    font-size: 1rem;
    text-transform: capitalize;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);

    @media #{$mq-820-down} {
      margin-inline-start: unset;
    }
  }

  & > h2 {
    margin-inline-start: 2rem;
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
      margin-inline-start: unset;
    }
  }

  ul.features {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    list-style: none;
    padding: 0;

    &::before {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      z-index: -1;
      background: url('@/assets/theme/whirle.png') 0 0 repeat;
      background-size: 35rem;
      background-position: center;
      background-repeat: no-repeat;
      transform: rotate(100deg);

      @media #{$mq-820-down} {
        transform: rotate(0deg);
      }
    }
    li {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      box-shadow: var(--medium-shadow);
      border: 1px solid var(--dark-5);
      border-radius: 10px;
      margin: 1rem;
      padding: 1.5rem 0.5rem 1rem 0.5rem;
      max-width: 400px;
      width: 100%;
      background-color: var(--light-20);
      backdrop-filter: blur(5px);

      @media #{$mq-820-down} {
        margin: 1rem 0rem;
      }

      .icon {
        position: absolute;
        top: -15px;
        box-shadow: var(--small-shadow);
        border-radius: 5px;
        color: var(--accent);
        background-color: var(--secondary);
        padding: 0.1rem;
        font-size: 0rem;

        span {
          font-size: 2rem;
        }
      }
      .info {
        display: flex;
        flex-flow: column nowrap;
        border-radius: 7px;
        width: 100%;
        padding: 0.5rem 0.5rem;
        background-color: var(--light);

        h3 {
          margin: 0.3rem 0;
        }
        p {
          margin: 0.2rem;
        }
      }
    }
  }

  & > .ctaButton {
    align-self: center;
    max-width: 200px;
    width: 100%;
    padding-bottom: 1rem;
  }
}
</style>
