<template>
  <div class="sliderInput">
    <div class="selectorInformatives">
      <label
        :for="props.id"
        class="selectorMetric"
      >
        <slot name="label">
          label
          <span class="material-symbols-rounded"> info </span>
        </slot>
      </label>
      <p class="selectorValue">
        <slot name="value">
          {{ props.value }}
        </slot>
      </p>
    </div>
    <input
      type="range"
      :name="props.name"
      :id="props.id"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="props.value"
      @input="emit('update:value', +$event.target.value)"
      :ref="refInput"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    value: {
        type: Number,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: false,
        default: (Math.random() + 1).toString(36).substring(7)
    },
    step: {
        type: Number,
        required: false,
        default: 1
    }
});

const emit = defineEmits(['update:value']);

const refInput = ref(null);

defineExpose({
    refInput
});
</script>

<style lang="scss" scoped>
.sliderInput {
    display: flex;
    flex-flow: column nowrap;
    margin: 0.2rem 0rem;
    width: 100%;

    .selectorInformatives {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;

    .selectorMetric {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        padding: 0.2rem 0.5rem;
        font-size: 1rem;
        font-weight: 500;

        span.material-symbols-rounded {
        margin-inline-start: 0.5rem;
        font-size: 1rem;
        color: var(--dark-70);

        &:hover {
            cursor: pointer;
        }
        }
    }

    .selectorValue {
        margin: 0;
        margin-inline-start: auto;
        border: 1px solid var(--dark-5);
        border-radius: 7px;
        padding: 0.5rem;
        font-weight: 500;
        background-color: var(--primary-5);
        color: var(--primary);
    }
    }

    input[type='range'] {
    appearance: none;
    margin-top: 0.5rem;
    outline: none;
    border-radius: 5px;
    width: 100%;
    height: 0.5rem;
    background-color: var(--dark-5);
    transition-duration: 0.3s;

    &:hover {
        background-color: var(--primary-20);
        cursor: pointer;
    }

    // webkit
    &::-webkit-slider-thumb {
        appearance: none;
        cursor: grab;
        border-radius: 100%;
        width: 1.5rem;
        height: 1.5rem;
        background: var(--primary);
    }

    &:hover::-webkit-slider-thumb {
        background: var(--accent-primary);
    }

    &:active::-webkit-slider-thumb {
        cursor: grabbing;
    }

    // moz
    &::-moz-range-thumb {
        appearance: none;
        cursor: grab;
        border-radius: 100%;
        width: 1.5rem;
        height: 1.5rem;
        background: var(--primary);
    }

    &:hover::-moz-range-thumb {
        background: var(--accent-primary);
    }

    &:active::-moz-range-thumb {
        cursor: grabbing;
    }
    }
}
</style>