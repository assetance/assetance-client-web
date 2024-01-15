<template>
  <!-- hero / banner section -->
  <section class="hero">
    <!-- information -->
    <div class="informatives">
      <div class="breadcrumbs loadingShader" />
      <div class="h1 loadingShader" />
      <div class="p loadingShader" />
      <div class="social loadingShader" />
    </div>
    <!-- article image -->
    <div class="visual loadingShader" />
  </section>
</template>
  
<script setup></script>

<style lang="scss" scoped>
section.hero {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 10px;
    padding: 0.5rem;
    background-color: var(--primary-5);

    @media #{$mq-820-down} {
        flex-direction: column;
    }

    .informatives {
        display: flex;
        flex-flow: column nowrap;
        width: 100%;

        @media #{$mq-820-down} {
        order: 2;
        align-items: center;
        text-align: center;
        }
        .breadcrumbs {
            margin: 0.8rem 0;
            border-radius: 7px;
            height: 1rem;
            max-width: 20rem;
            width: 100%;
        }

        .h1 {
            margin: 1.2rem 0;
            border-radius: 7px;
            height: 1.5rem;
            max-width: 10rem;
            width: 100%;
        }

        & > .p {
            margin: 1rem 0;
            min-height: 40px;
            max-width: 15rem;
            width: 100%;
            color: var(--primary);
        }

        .social {
            margin: 1rem 0;
            height: 2rem;
            max-width: 12rem;
            width: 100%;

        }
    }

    .visual {
        border-radius: 10px;
        max-width: 425px;
        width: 100%;
        height: 257px;

        @media #{$mq-820-down} {
            order: 1;
            width: 100%;
        }
    }
}
</style>