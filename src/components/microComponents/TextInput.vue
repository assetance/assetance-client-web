<template>
  <div>
    <div
      v-if="props.type != 'textarea'"
      class="inputContainer"
    >
      <input
        ref="inputField"
        :id="props.id"
        :class="['input', statusStyling, isCustomPlaceholder? 'input__customPlaceholder' : '']"
        :type="props.type"
        :value="modelValue"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        @input="emit('update:modelValue', $event.target.value)"
      >
      <label
        :for="props.id"
        :class="[isCustomPlaceholder? 'customPlaceholder' : '']"
      >{{ props.label }}</label>
      <sub>{{ errorMsg }}</sub>
    </div>
    <div
      v-else
      class="inputContainer"
    >
      <textarea
        ref="inputField"
        :id="props.id"
        :class="['input', statusStyling]"
        :value="modelValue"
        :placeholder="props.placeholder"
        :required="props.required"
        :disabled="props.disabled"
        rows="5"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <label :for="props.id">{{ props.label }}</label>
      <sub>{{ errorMsg }}</sub>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';

// props and emits declaration
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'text',
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: 'type here',
        required: false,
    },
    required: {
        type: Boolean,
        default: false,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    status: {
        type: String,
        default: 'default',
    },
    errorMsg: {
        type: String,
        required: false,
        default: ' ',
    }
});
const emit = defineEmits(['update:modelValue']);

// defining the input tag refernce and exposing it to the parent, thus when the parent refrences the component it links to this
const inputField = ref(null);
defineExpose({inputField});

// styling logic
const statusStyling = computed(() => {
    switch (props.status) {
        case 'valid':
            return 'input__valid';
        case 'invalid':
            return 'input__invalid';
        default:
            return '';
    }
});
const isCustomPlaceholder = computed(() => {
    return props.label != props.placeholder ? true : false;
});
</script>

<style lang="scss" scoped>
div.inputContainer {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    min-height: 54px;

    label {
        position: absolute;
        width: fit-content;
        top: 13px;
        left: 9px;
        color: var(--dark-40);
        font-size: 1rem;
        text-transform: capitalize;
        backdrop-filter: blur(0px);
        transition-duration: 0.2s;

        &.customPlaceholder {
            color: transparent;
        }

        html[dir="rtl"] & {
            top: 11px;
            left: unset;
            right: 9px;
        }
    }

    input.input {
        outline: none;
        border-radius: 7px;
        border: 1px solid var(--dark-5);
        width: 100%;
        padding: 0.5rem;
        transition-duration: 0.2s;

        &::placeholder {
            font-size: 1rem;
            color: transparent;
            text-transform: capitalize;
        }
        &__customPlaceholder {
            &::placeholder {
                color: var(--dark-40);
            }
        }

        &:focus,
        &:not(:placeholder-shown),
        &:-webkit-autofill {
            box-shadow: var(--small-shadow);

            &::placeholder {
                color: transparent;
            }

            &+label {
                top: 1px;
                left: 5px;
                font-size: 0.7rem;
                color: var(--dark-70);
                backdrop-filter: blur(5px);

                html[dir="rtl"] & {
                    top: -4px;
                    left: unset;
                    right: 9px;
                }
            }
        }

        &:focus + label {
            color: var(--primary-70);
        }

        &__valid {
            border: 1px solid var(--positive);
        }

        &__invalid {
            border: 1px solid var(--negative);
        }
    }

    textarea.input {
        outline: none;
        border-radius: 7px;
        border: 1px solid var(--dark-5);
        margin-top: 0.4rem;
        width: 100%;
        min-width: 100%;
        padding: 0.5rem;
        padding-top: 0.7rem;
        transition-duration: 0.2s;

        &::placeholder {
            font-size: 1rem;
            color: transparent;
            text-transform: capitalize;
        }

        &:focus,
        &:not(:placeholder-shown),
        &:-webkit-autofill {
            box-shadow: var(--small-shadow);

            &::placeholder {
                color: transparent;
            }

            &+label {
                top: 1px;
                left: 5px;
                font-size: 0.7rem;
                color: var(--dark-70);
                backdrop-filter: blur(5px);
            }
        }

        &:focus + label {
            color: var(--primary-70);
        }

        &__valid {
            border: 1px solid var(--positive);
        }

        &__invalid {
            border: 1px solid var(--negative);
        }
    }

    sub {
        width: 100%;
        font-size: 0.7rem;
        color: var(--negative);
        text-align: end;
        height: 14px;
    }
}
</style>
