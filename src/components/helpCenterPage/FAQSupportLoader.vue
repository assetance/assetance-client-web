<template>
  <section class="faq">
    <h1>FAQs</h1>
    <ul>
      <li
        v-for="n in 5"
        :key="n"
        class="loadingShader"
      />
    </ul>
  </section>
</template>

<script setup></script>

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
          border-radius: 7px;
          margin: 0.5rem 0;
          width: 100%;
          height: 2.375rem;

          @for $i from 1 through 5 {
            &:nth-child(#{$i}) {
              opacity: calc(1 - ($i / 6));
            }
          }
        }
    }

}
</style>