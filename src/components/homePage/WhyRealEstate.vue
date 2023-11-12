<template>
  <section class="wl">
    <header>the supreme investment choice</header>
    <h2>why real estate is king</h2>
    <div class="informatives">
      <img src="@/assets/theme/realEstateInvesting.jpg" alt="image" />
      <div class="col">
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> monitoring </span>
          </div>
          <h3>capital appreciation</h3>
          <p>
            Appreciating over time, providing potential for substantial returns.
          </p>
        </div>
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> payments </span>
          </div>
          <h3>Passive income</h3>
          <p>Ongoing income, creating a source of financial stability.</p>
        </div>
      </div>
      <div class="col">
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> house_with_shield </span>
          </div>
          <h3>Inflation hedge</h3>
          <p>
            Acts like a hedge against inflation, preserving purchasing power.
          </p>
        </div>
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> query_stats </span>
          </div>
          <h3>Low market volatility</h3>
          <p>
            historically shows less volatility compared to other investments.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.wl {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 2rem;
  background-image: url('data:image/svg+xml,<svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(226, 246, 255, 1)" offset="0%"></stop><stop stop-color="rgba(0, 86, 224, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(%23sw-gradient-0)" d="M0,196L120,220.5C240,245,480,294,720,261.3C960,229,1200,114,1440,114.3C1680,114,1920,229,2160,261.3C2400,294,2640,245,2880,236.8C3120,229,3360,261,3600,277.7C3840,294,4080,294,4320,310.3C4560,327,4800,359,5040,367.5C5280,376,5520,359,5760,334.8C6000,310,6240,278,6480,261.3C6720,245,6960,245,7200,253.2C7440,261,7680,278,7920,310.3C8160,343,8400,392,8640,359.3C8880,327,9120,212,9360,171.5C9600,131,9840,163,10080,179.7C10320,196,10560,196,10800,187.8C11040,180,11280,163,11520,155.2C11760,147,12000,147,12240,171.5C12480,196,12720,245,12960,245C13200,245,13440,196,13680,204.2C13920,212,14160,278,14400,318.5C14640,359,14880,376,15120,367.5C15360,359,15600,327,15840,334.8C16080,343,16320,392,16560,351.2C16800,310,17040,180,17160,114.3L17280,49L17280,490L17160,490C17040,490,16800,490,16560,490C16320,490,16080,490,15840,490C15600,490,15360,490,15120,490C14880,490,14640,490,14400,490C14160,490,13920,490,13680,490C13440,490,13200,490,12960,490C12720,490,12480,490,12240,490C12000,490,11760,490,11520,490C11280,490,11040,490,10800,490C10560,490,10320,490,10080,490C9840,490,9600,490,9360,490C9120,490,8880,490,8640,490C8400,490,8160,490,7920,490C7680,490,7440,490,7200,490C6960,490,6720,490,6480,490C6240,490,6000,490,5760,490C5520,490,5280,490,5040,490C4800,490,4560,490,4320,490C4080,490,3840,490,3600,490C3360,490,3120,490,2880,490C2640,490,2400,490,2160,490C1920,490,1680,490,1440,490C1200,490,960,490,720,490C480,490,240,490,120,490L0,490Z"></path></svg>');
  background-repeat: repeat-x;
  background-position: 0 70%;
  background-size: cover;

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
    right: -1px;
    width: 10%;
    height: 100%;
    background: linear-gradient(265deg, var(--light) 5%, transparent 65%);
  }

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
    margin-top: 0.5rem;
    border-radius: 10px;
    box-shadow: var(--primary-larg-shadow);
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

  .informatives {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;

    @media #{$mq-820-down} {
      flex-flow: column nowrap;
    }

    .col {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;

      @media #{$mq-820-down} {
        width: 100%;
      }

      &:nth-child(2) {
        order: 1;
        margin-top: 1rem;
        transform: translateX(30px);

        @media #{$mq-820-down} {
          order: unset;
          transform: unset;
        }
      }
      &:nth-child(3) {
        order: 3;
        transform: translateX(-30px);

        @media #{$mq-820-down} {
          order: unset;
          transform: unset;
        }
      }

      .reasonCard {
        position: relative;
        border: 1px solid var(--dark-5);
        border-radius: 10px;
        box-shadow: var(--larg-shadow);
        margin: 0.8rem 0.5rem;
        padding: 0.5rem;
        padding-top: 1rem;
        background-color: var(--light);

        @media #{$mq-820-down} {
          width: 100%;
        }

        .icon {
          position: absolute;
          top: -15px;
          border-radius: 7px;
          padding: 0.5rem;
          background-color: var(--secondary-40);
          color: var(--primary);
          font-size: 0;
          backdrop-filter: blur(10px);
        }

        h3 {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }

    & > img {
      position: relative;
      order: 2;
      border: 1px solid var(--dark-5);
      border-radius: 10px;
      box-shadow: var(--xlarg-shadow);
      width: 365px;
      object-fit: cover;

      @media #{$mq-820-down} {
        order: unset;
        width: 80%;
      }
    }
  }
}
</style>
