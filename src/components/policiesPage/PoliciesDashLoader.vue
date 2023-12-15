<template>
  <section class="policiesDash">
    <aside>
      <h2 class="loadingShader" />
      <hr>
      <menu>
        <li
          v-for="n in 5"
          :key="n"
          class="loadingShader"
        />
      </menu>
    </aside>
    <article>
      <header class="loadingShader" />
      <p class="loadingShader" />
    </article>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section.policiesDash {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;

    @media #{$mq-820-down} {
        flex-flow: column nowrap;
    }

    aside {
        position: sticky;
        top: 5rem;
        margin-inline-end: 1rem;
        border-radius: 10px;
        width: 25%;
        max-width: 14rem;
        padding: 1rem;
        background-color: var(--dark);
        color: var(--light);

        @media #{$mq-820-down} {
            position: unset;
            top: unset;
            width: 100%;
            max-width: unset;
        }

        h2 {
            margin: 0;
            font-size: 1.3rem;
            width: 100%;
            height: 1.5rem;
        }

        menu {
            padding: 0;
            list-style: none;

            li {
                margin: 0.5rem 0;
                width: 100%;
                height: 2rem;
            }
        }

    }

    article {
        display: flex;
        flex-flow: column nowrap;
        width: 75%;
        border: 1px solid var(--dark-20);
        padding: 1rem;
        border-radius: 10px;

        @media #{$mq-820-down} {
            width: 100%;
            margin-top: 1rem;
        }

        header {
            width: 100%;
            height: 2rem;
        }

        p {
            width: 100%;
            height: 20rem;
        }
    }
}

.loadingShader {
    position: relative;
    border-radius: 5px;
    background-color: var(--dark-5);
    overflow: hidden;

    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(80deg,
                rgba(#fff, 0) 0,
                rgba(#fff, 0.2) 30%,
                rgba(#fff, 0.5) 50%,
                rgba(#fff, 0));
        animation: shimmer 1s infinite;
        content: '';
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}
</style>