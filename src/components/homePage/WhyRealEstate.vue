<template>
  <section class="wl">
    <header>{{ $t('home.why-real-estate.tagline') }}</header>
    <h2>{{ $t('home.why-real-estate.title') }}</h2>
    <div class="informatives">
      <img
        src="@/assets/theme/realEstateInvesting.jpg"
        alt="image"
      >
      <div class="col">
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> monitoring </span>
          </div>
          <h3>{{ $t('home.why-real-estate.reason1.title') }}</h3>
          <p>{{ $t('home.why-real-estate.reason1.description') }}</p>
        </div>
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> payments </span>
          </div>
          <h3>{{ $t('home.why-real-estate.reason2.title') }}</h3>
          <p>{{ $t('home.why-real-estate.reason2.description') }}</p>
        </div>
      </div>
      <div class="col">
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> house_with_shield </span>
          </div>
          <h3>{{ $t('home.why-real-estate.reason3.title') }}</h3>
          <p>{{ $t('home.why-real-estate.reason3.description') }}</p>
        </div>
        <div class="reasonCard">
          <div class="icon">
            <span class="material-symbols-rounded"> query_stats </span>
          </div>
          <h3>{{ $t('home.why-real-estate.reason4.title') }}</h3>
          <p>{{ $t('home.why-real-estate.reason4.description') }}</p>
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
  padding-bottom: 1rem;
  background-image: url('@/assets/theme/llline.png');
  background-repeat: repeat-x;
  background-position: 0 70%;
  background-size: cover;

  @media #{$mq-820-down} {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: unset;
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

  &>h2 {
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
    z-index: 0;

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
        z-index: 1;

        @media #{$mq-820-down} {
          order: unset;
          transform: unset;
          z-index: unset;
        }
      }

      &:nth-child(3) {
        order: 3;

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
          margin: 1rem 0.3rem;
          margin-bottom: 0rem;
          font-size: 1.3rem;
          font-weight: 700;
        }

        p {
          margin: 0.3rem;
          margin-top: 0.5rem;
        }
      }
    }

    &>img {
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
