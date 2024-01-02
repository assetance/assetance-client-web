<template>
  <div class="searchInput">
    <div :class="['inputContainer', statusStyling, isDisabled ? 'inputContainer__disabled' : '']">
      <input
        ref="inputField"
        :id="id"
        :class="['input', isCustomPlaceholder? 'input__customPlaceholder' : '']"
        type="text"
        :value="modelValue"
        :placeholder="placeholder"
        :required="props.required"
        :disabled="props.disabled"
        @input="!isLazy ? emit('update:modelValue', $event.target.value) : '';"
      >
      <label
        :for="id"
        :class="[isCustomPlaceholder? 'customPlaceholder' : '']"
      >{{ props.label }}</label>
      <span
        v-show="isIconVisible"
        :class="['material-symbols-rounded', isDisabled ? 'material-symbols-rounded__disabled' : '']"
        @click="emit('update:modelValue', inputField.value)"
      >
        search
      </span>
    </div>
    <sub>{{ errorMsg }}</sub>
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
    id: {
        type: String,
        required: false,
        default: 'id',
    },
    placeholder: {
        type: String,
        required: false,
        default: 'placeholder',
    },
    required: {
        type: Boolean,
        required: false,
        default: false,
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false,
    },
    status: {
        type: String,
        required: false,
        default: 'default',
    },
    errorMsg: {
        type: String,
        required: false,
        default: ' ',
    },
    isLazy: {
        type: Boolean,
        required: false,
        default: true,
    },
    isIconVisible: {
        type: Boolean,
        required: false,
        default: true
    }
});
const emit = defineEmits(['update:modelValue']);

// computed props 
const id = computed(() => {
    return props.id != 'id' ? props.id : 'id_' + props.label
});
const placeholder = computed(() => {
    return props.placeholder != 'placeholder' ? props.placeholder : props.label;
});

// defining the input tag refernce and exposing it to the parent, thus when the parent refrences the component it links to this
const inputField = ref(null);
defineExpose({inputField});

// styling logics
const statusStyling = computed(() => {
    switch (props.status) {
        case 'valid':
            return 'inputContainer__valid';
        case 'invalid':
            return 'inputContainer__invalid';
        default:
            return '';
    }
});
const isCustomPlaceholder = computed(() => {
    return props.label != props.placeholder ? true : false;
});
const isDisabled = computed(() => {
    return props.disabled ? true : false;
});
</script>

<style lang="scss" scoped>
.searchInput {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;

    .inputContainer {
        position: relative;
        display:  flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-top: 0.4rem;
        width: 100%;
        min-height: 33.5px;
        padding: 0.25rem 0.3rem;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        background-color: var(--white);
        transition-duration: 0.3s;

        label {
            position: absolute;
            width: fit-content;
            top: 6px;
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
            border: none;
            border-radius: 7px; // autofill styling
            width: 100%;
            padding-inline-start: 0.2rem;
            font-size: 1rem;
            color: var(--dark-90);
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
    
                &::placeholder {
                    color: transparent;
                }
    
                &+label {
                    top: -7px;
                    left: 5px;
                    font-size: 0.7rem;
                    color: var(--dark-70);
                    backdrop-filter: blur(5px);
    
                    html[dir="rtl"] & {
                        left: unset;
                        right: 9px;
                    }
                }

                &~span.material-symbols-rounded {
                    border-radius: 8px;
                }
            }
    
            &:focus + label {
                color: var(--primary-70);
            }

        }

        span.material-symbols-rounded {
            border-radius: 100%;
            border: 1px solid var(--dark-5);
            padding: 0.2rem;
            font-size: 1.1rem;
            color: var(--primary);
            background-color: var(--primary-5);
            transition-duration: 0.2s;

            &:hover {
                cursor: pointer;
            }
            &:active {
                scale: 0.95;
                border-color: var(--primary-70);
            }

            &__disabled {
                background-color: var(--dark-20);
                color: var(--dark-20);
                pointer-events: none;
            }
        }

        &__valid {
            border: 1px solid var(--positive);
        }

        &__invalid {
            border: 1px solid var(--negative);
        }

        &__disabled {
            opacity: 0.7;
        }
    }

    sub {
        margin-top: -2px;
        width: 100%;
        font-size: 0.7rem;
        color: var(--negative);
        text-align: end;
        height: 14px;
    }
}
</style>