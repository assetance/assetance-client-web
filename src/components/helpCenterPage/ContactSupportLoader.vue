<template>
  <aside class="contactSupport">
    <ul class="supportOptions">
      <li
        class="supportOption loadingShader"
      />
      <li
        class="supportOption loadingShader"
      />
      <li class="optionsDivider">
        <hr>
        <span>{{ $t('help.contact.or') }}</span>
        <hr>
      </li>
      <li class="emailOption loadingShader" />
    </ul>
  </aside>
</template>
  
<script setup></script>

<style lang="scss" scoped>
aside.contactSupport {
    display: flex;
    flex-flow: column nowrap;
    border-inline-end: 1px solid var(--dark-20);
    width: 30%;

    @media #{$mq-820-down} {
      border-inline-end: unset;
      border-bottom: 1px solid var(--dark-20);
      width: 100%;
    }

    ul.supportOptions {
        padding: 0;
        list-style: none;

        li.supportOption {
            margin: 0.5rem;
            min-height: 5rem;
        }

        li.optionsDivider {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            padding: 0 0.5rem;

            hr {
                width: 30%;
                height: 0;
            }
        }

        li.emailOption {
            margin: 0.5rem;
            min-height: 14rem;
        }
    }
}
</style>