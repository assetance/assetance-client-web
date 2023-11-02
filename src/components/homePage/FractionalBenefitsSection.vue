<template>
  <section class="fractionalBenefits wl">
    <img
      src="@/assets/theme/vector_arrow.png"
      alt="background img"
      class="background" />
    <header>the power of fractional investing</header>
    <h2>Benefit From Fractional Real Estate Investing</h2>
    <ul>
      <li>
        <figure>
          <span class="material-symbols-rounded iconLtr"> price_check </span>
        </figure>
        <article>
          <h3>Lower Entry Costs</h3>
          <p>Begin with a fraction of the full property cost.</p>
        </article>
      </li>
      <li>
        <figure>
          <span class="material-symbols-rounded iconLtr">
            holiday_village
          </span>
        </figure>
        <article>
          <h3>Diversification</h3>
          <p>Spread risk across multiple properties.</p>
        </article>
      </li>
      <li>
        <figure>
          <span class="material-symbols-rounded iconLtr">
            sync_saved_locally
          </span>
        </figure>
        <article>
          <h3>Effortless</h3>
          <p>No involvement in property management.</p>
        </article>
      </li>
      <li>
        <figure>
          <span class="material-symbols-rounded iconLtr"> diversity_3 </span>
        </figure>
        <article>
          <h3>Investing For All Levels</h3>
          <p>Open to all investors, newcomers and experts.</p>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.fractionalBenefits {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding-top: 3rem;
  text-align: center;

  & > header {
    border-radius: 10px;
    padding: 0.5rem 1rem;
    color: var(--primary);
    font-size: 1rem;
    text-transform: capitalize;
    backdrop-filter: blur(5px);
    background-color: var(--light-70);
  }

  & > h2 {
    border-radius: 10px;
    margin-top: 0.5rem;
    padding: 1rem 1.5rem;
    text-transform: capitalize;
    font-size: 2rem;
    font-weight: 700;
    backdrop-filter: blur(5px);
    box-shadow: var(--primary-larg-shadow);
    background-color: var(--light-70);
  }

  & > ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    list-style: none;
    padding: 0rem;

    li {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      border: 1px solid var(--dark-5);
      border-radius: 10px;
      box-shadow: var(--medium-shadow);
      margin: 0.7rem;
      max-width: 240px;
      width: 100%;
      background-color: var(--white);

      @media #{$mq-480-down} {
        max-width: unset;
      }
      & > * {
        margin: 0;
      }

      figure {
        position: absolute;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        left: -10px;
        border-radius: 7px;
        border: 1.5px solid var(--primary-5);
        box-shadow: var(--larg-shadow);
        width: fit-content;
        height: 85%;
        padding: 0.5rem;
        background-color: var(--secondary);
        color: var(--accent);
        font-size: 0rem;

        html[dir='rtl'] & {
          left: unset;
          right: -10px;
        }

        & > span.material-symbols-rounded {
          font-size: 2rem;
        }
      }

      article {
        margin-inline-start: 2.5rem;
        padding: 0.5rem;
        text-align: start;

        & > * {
          margin: 0.2rem 0rem;
        }

        h3 {
          font-size: 1rem;
        }
      }
    }
  }

  & > img.background {
    position: absolute;
    width: 90%;
    top: 20%;
    z-index: -1000;

    @media #{$mq-820-down} {
      // top: 0%;
      content: url('@/assets/theme/vector_arrow_tablet.png');
      object-fit: scale-down;
    }
    @media #{$mq-480-down} {
      top: 0%;
      content: url('@/assets/theme/vector_arrow_mobile.png');
      object-fit: scale-down;
    }
  }
}
</style>
