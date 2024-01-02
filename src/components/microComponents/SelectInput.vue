<template>
  <div
    :class="[isSelected ? 'selectInputContainer__selected' : '', isExpanded ? 'selectInputContainer__expanded' : '', 'selectInputContainer' ]"
    @clickout="isExpanded = false;"
  >
    <div class="buttonsContainer">
      <button
        role="combobox"
        aria-labelledby="select button"
        aria-haspopup="listbox"
        :aria-expanded="isExpanded"
        aria-controls="select-dropdown"
        @click="isExpanded == false ? searchInput = '' : null; isExpanded = !isExpanded;"
        :class="[statusStyling]"
      >
        <div class="label">
          <slot name="label">
            Label
          </slot>
        </div>
        <p>{{ selection }}</p>
        <span class="material-symbols-rounded">
          expand_more
        </span>
      </button>
      <button
        :class="['reset', isSelected && isResettable? 'reset__active' : '']"
        @click="emit('update:selection', '')"
      >
        <span class="material-symbols-rounded">
          close
        </span>
      </button>
    </div>
    <sub class="errMsg">{{ errorMsg }}</sub>
    <div class="listBox">
      <input
        v-if="isSearchable"
        type="text"
        name="search"
        :id="'search_' + Math.floor(Math.random() * 100)"
        :placeholder="$t('global.form.search')"
        :value="searchInput"
        @input="searchInput = $event.target.value;"
      >
      <ul
        class="list"
        role="listbox"
      >
        <DropdownOption
          v-for="option in filteredOptions"
          :key="option.option"
          @click="emit('update:selection', option); isExpanded = false;"
        >
          <!-- {{ option.option }} -->
          <template #option>
            <slot
              name="option"
              :option="option"
            />
          </template>
        </DropdownOption>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import DropdownOption from './DropdownOption.vue';
import { useI18n } from 'vue-i18n';
/**
 * porp 'options' have to follow the following structure
 * options = [
 *  {
 *    option: '', // (required) option name, to be viewd
 *    // additional properties can be added 
 *  },
 *  // ...
 * ]
 * 
 * emit 'update:selection' will return the selected object with all its properties
 */
// props and emits declaration
const props = defineProps({
  options: {
    type: Array, 
    required: true,
  },
  selection: {
    type: [String, Object],
    required: false,
    default: 'select'
  },
  isSearchable: {
    type: Boolean,
    required: false,
    default: true,
  },
  isResettable: {
    type: Boolean, 
    required: false,
    default: true,
  },
  status: {
    type: String,
    required: false,
    default: 'default'
  },
  errorMsg: {
    type: String,
    required: false,
    default: '',
  }
});
const emit = defineEmits(['update:selection']);


const { t } = useI18n();
const searchInput = ref(''); // text input value binder
const isExpanded = ref(false);
const selection = computed(() => {
  return typeof props.selection == 'object' ? props.selection.option : t('global.form.select');
});
const isSelected = computed(() => {
  return selection.value == t('global.form.select')? false : true;
}); 

const statusStyling = computed(() => {
    switch (props.status) {
        case 'valid':
            return 'valid';
        case 'invalid':
            return 'invalid';
        default:
            return '';
    }
});

/* -- search logic start -- */

const filteredOptions = computed(() => {
  if (searchInput.value) {
    let arr = props.options.filter((cat) => {
      if (cat.option.includes(searchInput.value)) {
        return cat;
      }
    });
    return arr.length ? arr : [{option: t('global.form.no-options-found')}];
      
  } else {
    return props.options;
  }
});

/* -- search logic end -- */
</script>

<style lang="scss" scoped>
.selectInputContainer {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding-top: 0.4rem;

  .buttonsContainer {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    background-color: var(--white);

    button {
      position: relative;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      border: none;
      border-radius: 10px;
      width: 100%;
      padding: 0.3rem 0.5rem;
      background-color: transparent;
      text-transform: capitalize;
      transition-duration: 0.2s;
  
      &:hover {
        cursor: pointer;
      }
  
      &.valid {
        border: 1px solid var(--positive);
      }
  
      &.invalid {
        border: 1px solid var(--negative);
      }
  
      .label {
        position: absolute;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        top: 4px;
        left: 0.5rem;
        height: 75%;
        color: var(--dark-40);
        transition-duration: 0.2s;
  
        html[dir="rtl"] & {
          left: unset;
          right: 0.5rem;
        }
        
      }
  
      &>p {
        margin: 0;
        margin-inline-end: auto;
        text-transform: capitalize;
        color: transparent;
        transition-duration: 0.2s;
      }
  
      &>.material-symbols-rounded {
        border-radius: 50%;
        background: var(--primary-5);
        color: var(--primary);
        transition-duration: 0.2s;
      }
  
    }

    .reset {
      max-width: 0px;
      border: none;
      background-color: transparent;
      overflow: hidden;
      padding: 0;

      .material-symbols-rounded {
        padding: 1px;
        font-size: 1.3rem;
      }
      &:hover .material-symbols-rounded{
        background-color: var(--negative-5);
        color: var(--negative);
      }

      &__active {
        padding: 0.3rem 0.5rem;
        padding-inline-start: 0;
        max-width: fit-content;
      }
    }
  }

  sub.errMsg {
    margin: 0 0.5rem;
    min-height: 14px;
    color: var(--negative);
    font-size: 0.7rem;
    text-align: end;
  }
  .listBox {
    position: absolute;
    display: flex;
    flex-flow: column nowrap;
    top: 3rem;
    box-shadow: var(--small-shadow);
    border: none;
    border-radius: 10px;
    width: 100%;
    max-height: 0rem;
    background-color: var(--white);
    text-align: start;
    overflow: hidden;
    z-index: 1;
    transition-duration: 0.2s;

    input {
      outline: none;
      border: 1px solid var(--dark-5);
      border-radius: 7px;
      margin: 0.3rem;
      padding: 0.2rem;

      &::placeholder {
        text-transform: capitalize;
      }

    }
    .list {
      display: flex;
      flex-flow: column nowrap;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow-y: auto;
    }
  }

  &__selected {
    .buttonsContainer {
      box-shadow: var(--small-shadow);
      
      button {
  
        .label {
          top: -8px;
          left: 1px;
          height: unset;
          font-size: 0.7rem;
          backdrop-filter: blur(5px);
  
          html[dir="rtl"] & {
            left: unset;
            right: 1px;
          }
        }
        p {
          color: var(--dark);
        }
      }
    }

  }

  &__expanded {
    .buttonsContainer {
      box-shadow: var(--small-shadow);

      button {
  
        .label {
          top: -8px;
          left: 1px;
          height: unset;
          font-size: 0.7rem;
          backdrop-filter: blur(5px);
          color: var(--primary-70);
  
          html[dir="rtl"] & {
            left: unset;
            right: 1px;
          }
        }
        p {
          color: var(--dark);
        }
        &>.material-symbols-rounded {
          transform: rotate(180deg);
        }
      }

      .reset {
        .material-symbols-rounded {
          transform: rotate(0deg);
        }
      }
    }

    .listBox {
    position: absolute;
    top: 3rem;
    box-shadow: var(--small-shadow);
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    width: 100%;
    max-height: 13rem;
    background-color: var(--white);
    text-align: start;
    overflow: hidden;
    }
  }
}
</style>