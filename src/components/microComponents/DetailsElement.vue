<template>
  <details :style="props.cssStyle">
    <summary><strong><slot name="summary">Summary</slot></strong></summary>
    <p>
      <slot name="details">
        Details
      </slot>
    </p>
  </details>
</template>

<script setup>
const props = defineProps({
    cssStyle: {
        type: String,
        required: false,
        default: ''
    }
});
</script>

<style lang="scss" scoped>
details {
    border: 1px solid var(--dark-5);
    border-radius: 7px;
    margin-top: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    background-color: var(--dark-5);
    overflow: hidden;
    // max-height: 2.5rem;        // super smooth transitions 
    // transition-duration: 0.1s; // but cuts off summary if long

    summary {
        cursor: pointer;
        position: relative;
        display: block;
        padding-right: 1.2rem;
        transition: margin 0.05s ease;
        
        html[dir="rtl"] & {
            padding-right: unset;
            padding-left: 1.7rem;
        }

        &::before {
            content: '';
            position: absolute;
            border-width: 0.4rem;
            border-style: solid;
            border-color: transparent transparent transparent var(--dark-70);
            top: 0.3rem;
            right: 0.3rem;
            transform: rotate(90deg);
            transform-origin: 0.2rem 50%;
            transition: 0.2s transform ease;

            html[dir="rtl"] & {
                right: unset;
                left: 0.3rem;
            }
        }
    }

    p {
        font-size: 0.85rem;
        margin: 0;
    }

    // &[open] {                //
    //     max-height: 20rem;   // super smooth transitions 
    // }                        // but cuts off summary if long

    &[open]>summary {
        margin-bottom: 1rem;
    }

    &[open]>summary::before {
        transform: rotate(-90deg);
    }
}
</style>