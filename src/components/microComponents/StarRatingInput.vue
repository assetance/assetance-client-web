<template>
  <div class="rating">
    <input
      v-model="selection"
      value="5"
      name="rating"
      id="star5"
      type="radio"
    >
    <label for="star5" />
    <input
      v-model="selection"
      value="4"
      name="rating"
      id="star4"
      type="radio"
    >
    <label for="star4" />
    <input
      v-model="selection"
      value="3"
      name="rating"
      id="star3"
      type="radio"
    >
    <label for="star3" />
    <input
      v-model="selection"
      value="2"
      name="rating"
      id="star2"
      type="radio"
    >
    <label for="star2" />
    <input
      v-model="selection"
      value="1"
      name="rating"
      id="star1"
      type="radio"
    >
    <label for="star1" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// props and emits
const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
    default: 0
  }
});
const selection = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

// checking and updating changes
watch(selection, () => {
  emit('update:modelValue', parseInt(selection.value));
})
</script>

<style lang="scss" scoped>
.rating {
  display: inline-block;

  input {
    display: none;
  }

  label {
    float: right;
    cursor: pointer;
    color: var(--dark-20);
    transition: color 0.3s;

    &:before {
      content: '\2605';
      font-size: 30px;
    }
  }

    & input:checked ~ label,
    & label:hover,
    & label:hover ~ label {
      color: var(--accent);
      transition: color 0.3s;
    }
}

</style>