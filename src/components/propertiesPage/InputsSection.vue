<template>
  <!-- inputs -->
  <section class="inputSection">
    <!-- primary options -->
    <form
      class="primaryInputs"
      @submit.prevent=""
    >
      <sup>{{ $t('properties.inputs.filter-options') }}</sup>
      <TextInput 
        :id="searchTextProps.id"
        :label="searchTextProps.label"
        :placeholder="searchTextProps.placeholder"
        v-model="searchedText"
      />
      <SelectInput
        :options="typeSelectProps.optionObjects"
        :is-searchable="false"
        v-model:selection="selectedType"
      >
        <template #label>
          <span>{{ typeSelectProps.label }}</span>
        </template>
        <template #option="slotProps">
          <span>{{ slotProps.option.option }}</span>
        </template>
      </SelectInput>
      <SelectInput
        :options="statusSelectProps.optionObjects"
        :is-searchable="false"
        v-model:selection="selectedStatus"
      >
        <template #label>
          <span>{{ statusSelectProps.label }}</span>
        </template>
        <template #option="slotProps">
          <span>{{ slotProps.option.option }}</span>
        </template>
      </SelectInput>

      <div class="btns">
        <!-- (V1) -->
        <!-- <SecondaryButton
          icon="filter_list"
          @click="expandSecondaryOptions = true;"
        /> -->
        <PrimaryButton
          @click="applyFilters" 
          :is-loading="isButtonLoading"
        >
          <span>{{ $t('global.form.apply') }}</span>
        </PrimaryButton>
      </div>
    </form>
    <!-- filters adjusters -->
    <div class="adjusterInputs">
      <ul class="selectedOptions">
        <li
          class="filteredChip"
          v-for="chip in filteredChips"
          :key="chip"
        >
          <span>{{ chip }}</span>
          <button @click="removeFilterOption(chip)">
            <span class="material-symbols-rounded">
              close
            </span>
          </button>
        </li>
      </ul>
      <form 
        @submit.prevent=""
        class="arrangmentOption"
      >
        <SelectInput
          :options="sortSelectProps.optionObjects"
          :is-searchable="false"
          v-model:selection="selectedSort"
        >
          <template #label>
            <span class="material-symbols-rounded sortIcon">
              sort
            </span>
            <span>{{ sortSelectProps.label }}</span>
          </template>
          <template #option="slotProps">
            <span>{{ slotProps.option.option }}</span>
          </template>
        </SelectInput>
      </form>
    </div>
    <!-- secondary options (V1)-->
    <!-- <div
      class="secondaryInputs fade-in"
      v-if="expandSecondaryOptions"
    >
      <div
        class="overlayOptions"
        @clickout="expandSecondaryOptions = false"
      >
        <h1> more filter options will be available on V1 release </h1>
      </div>
      <button
        class="closeBtn"
        @click="expandSecondaryOptions = false"
      >
        <span class="material-symbols-rounded">
          close
        </span>
      </button>
    </div> -->
  </section>
</template>

<script setup>
import { ref } from 'vue';
import SelectInput from '../microComponents/SelectInput.vue';
import TextInput from '../microComponents/TextInput.vue';
import PrimaryButton from '../microComponents/PrimaryButton.vue';
import { watch } from 'vue';
import propertiesAPI from '../../services/propertiesAPI';
// import SecondaryButton from '../microComponents/SecondaryButton.vue'; // (V1)
import { useI18n } from 'vue-i18n';

/* global */
const { t } = useI18n();
const emit = defineEmits(['filteredQuery']);
// filterable options (provided from backend for dynamic filtering implementaiton)
const selectOptions = ref(await propertiesAPI.getSelectOptions());

/**
 * Props inputs and models
 * currently static, should be dynamic in v1
 */
const typeSelectProps = ref({
  label: selectOptions.value[0].label,
  optionObjects: selectOptions.value[0].options.map(el => ({option: el})),
})
const selectedType = ref('');

const statusSelectProps = ref({
    label: selectOptions.value[1].label,
    optionObjects: selectOptions.value[1].options.map(el => ({option: el})),
})
const selectedStatus = ref('');

const searchTextProps = ref({
    id: 'searchInput', 
    label: t('global.form.search'),
    placeholder: t('properties.inputs.name-or-REFNAQS-id'),
});
const searchedText = ref('');

const sortSelectProps = ref({
    label: selectOptions.value[2].label,
    optionObjects: selectOptions.value[2].options.map(el => ({option: el})),
});
const selectedSort = ref('');

/**
 * components logic
 */
const isButtonLoading = ref(false);

/**
 * inputs logic
 */
// const expandSecondaryOptions = ref(false); // V1

// only primary options are hard coded, secondary should be added dynamically 
const appliedFilters = ref({
    type: [],
    status: [],
    search: [],
    sortBy: ''
});
const filteredChips = ref([]);

/**
 * functions
 */
function applyFilters() {
    // validate and check for changes (if already applied)
    if (!selectedStatus.value && !selectedType.value && !searchedText.value) {
        // do nothing
        return; 
    }
    checkChanges();

    /* construct query and update list (by emitting)*/
    emit('filteredQuery', constructQuery());

    // update filtered options chips 
    editFilterChips();

    // reset inputs
    selectedStatus.value = '';
    selectedType.value = '';
    searchedText.value = '';
}
function editFilterChips() {
    /**
     * -- this approach for MVP only --
     */
    let chipText = '';

    appliedFilters.value.type.forEach((el) => {
        chipText = `${selectOptions.value[0].label} | ${el}`;
        if (!filteredChips.value.includes(chipText)) {
            filteredChips.value.push(chipText);
        }
    });
    appliedFilters.value.status.forEach((el) => {
        chipText = `${selectOptions.value[1].label} | ${el}`;
        if (!filteredChips.value.includes(chipText)) {
            filteredChips.value.push(chipText);
        }
    });
    appliedFilters.value.search.forEach((el) => {
        chipText = `${selectOptions.value[3].label} | ${el}`;
        if (!filteredChips.value.includes(chipText)) {
            filteredChips.value.push(chipText);
        }
    });
}
function checkChanges() {
    /**
     * -- this approach for MVP only --
     * 
     * this function will discard duplications
     */
    if (!appliedFilters.value.type.includes(selectedType.value.option) && selectedType.value.option) {
        appliedFilters.value.type.push(selectedType.value.option);
    }
    if (!appliedFilters.value.status.includes(selectedStatus.value.option) && selectedStatus.value.option) {
        appliedFilters.value.status.push(selectedStatus.value.option);
    }
    if (!appliedFilters.value.search.includes(searchedText.value) && searchedText.value) {
        appliedFilters.value.search.push(searchedText.value);
    }
}
function removeFilterOption(chip) {
    let option = chip.slice(0, chip.indexOf(' |')).toLowerCase();
    let optionValue = chip.slice(chip.indexOf('|') + 2);

    let index = appliedFilters.value[option].indexOf(optionValue);
    if (index > -1) {
        appliedFilters.value[option].splice(index, 1);
    }

    // update properties 
    emit('filteredQuery', constructQuery());
    
    // edit chips 
    filteredChips.value.splice(filteredChips.value.indexOf(chip), 1);
}
function constructQuery() {
    /**
     * -- this approach for MVP only --
     */
    let query = '';
    appliedFilters.value.type.forEach((el) => { 
        query = query + `type=${encodeURIComponent(el)}&`;
    });
    appliedFilters.value.status.forEach((el) => { 
        query = query + `status=${encodeURIComponent(el)}&`;
    });
    appliedFilters.value.search.forEach((el) => { 
        query = query + `search=${encodeURIComponent(el)}&`;
    });
    
    if (appliedFilters.value.sortBy) {
        query = query + `sort=${encodeURIComponent(appliedFilters.value.sortBy)}&`;
    }

    // taking out the last '&' and returning the query
    return query? query.slice(0, -1) : 'reset';
}

watch(selectedSort, () => {
    appliedFilters.value.sortBy = selectedSort.value.option;
    /* construct query and update list (by emitting)*/
    emit('filteredQuery', constructQuery());
});
/**
 * TODO v1:: dynamic filter options
 * the filterable options should be fetched from the server once, 
 * then all secondary options will be added to the "more options" overlay. 
 * 
 * the options json should look something like this: 
 * {
 * // the primary options on the main properties page (options doesn't change dynamically but the options values does)
 *  primary: {
 *    type: [...],
 *    search: ['string', 'REFNAQS'],
 *    status: [...],
 *    sortBy: [...],
 *  },
 * // the secondary options (options and its values can change)
 * // the option type will determine the method to select the option values, ex ('slider' | 'string' | 'multiSelect' | 'number' ...)
 * each type should have it's own values structure, ex (start and end value with optional increaments to the type 'slider', list of values for the type 'multiSelect' ...)
 *  secondary: [
 *    {
 *      optionName: '',
 *      optionDescription: '',
 *      optionType: '', 
 *      optionValues: [] | {} 
 *    }
 *  ]
 * }   
 */
</script>

<style lang="scss" scoped>
section.inputSection {

    .primaryInputs {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        padding: 0.5rem;
        background-color: var(--white);

        @media #{$mq-820-down} {
            flex-flow: column nowrap;
        }

        & > sup {
            position: absolute;
            top: -0.6rem;
            left: 0.5rem;
            padding: 0 0.2rem;
            backdrop-filter: blur(5px);
            font-size: 0.9rem;
            text-transform: capitalize;

            html[dir = 'rtl'] & {
                left: unset;
                right: 0.5rem;
            } 
        }

        .selectInputContainer {
            margin-inline-end: 0.5rem;
            margin-top: 0.5rem;
            width: 21rem;
            
            @media #{$mq-820-down} {
                width: 100%;
                margin-top: unset;
            }
        }
        .textInput {
            margin-inline-end: 0.5rem;
            margin-top: 0.5rem;
            width: 100%;

            @media #{$mq-820-down} {
                margin-top: unset;
            }
        }
        .btns {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            button.primaryButton {
              width: 6rem;
                background: unset;
                background-color: var(--primary);

                @media #{$mq-820-down} {
                    width: 100%;
                }

                span  {
                    color: var(--light);
                    text-transform: capitalize;
                    font-size: 1rem;
                }
            }
            .secondaryButton {
                margin-inline-end: 0.5rem;
                width: fit-content;
            }
        }
    }
    
    .adjusterInputs {
        display: flex;
        flex-flow: row wrap;
        margin-top: 0.2rem;

        @media #{$mq-820-down} {
            flex-flow: column  nowrap;
            align-items: center;
        }
        .selectedOptions {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin: 0.3rem 0;
            max-width: 70%;
            width: 100%;
            padding: 0;
            list-style: none;

            @media #{$mq-820-down} {
                max-width: unset;
            }
            .filteredChip {
                display: flex;
                align-items: center;
                margin: 0.3rem;
                border: 1px solid var(--dark-5);
                border-radius: 10px;
                max-width: 10rem;
                width: fit-content;
                padding: 0.3rem 0.5rem;
                background-color: var(--primary-5);

                & > span {
                    font-size: 0.9rem;
                }

                button {
                    border: none;
                    border-radius: 7px;
                    margin-inline-start: 0.3rem;
                    padding: 0 0.1rem;
                    background-color: var(--primary-20);
                    transition-duration: 0.2s;

                    &:hover {
                        cursor: pointer;
                    }
                    &:active {
                        background-color: var(--primary-70);

                        span {
                            color: var(--secondary);
                        }
                    }
                    span {
                        padding: 0;
                        margin-top: 0.15rem;
                        font-size: 1rem;
                        color: var(--primary);
                    }
                }
            }
        }

        .arrangmentOption {
            display: flex;
            flex-flow: row wrap;
            max-width: 30%;
            width: 100%;

            @media #{$mq-820-down} {
              align-self: flex-end;
              max-width: 50%;
            }
            .sortIcon {
                font-size: 1rem;
            }
        }
    }

    .secondaryInputs {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: start;
        align-items: start;
        background-color: var(--dark-40);

        @media #{$mq-820-down} {
            justify-content: center;
            align-items: baseline;
        }

        .overlayOptions {
            margin-top: 5rem;
            border-radius: 0 10px 10px 0;
            width: 50%;
            padding: 0.5rem;
            background-color: var(--light);
            
            @media #{$mq-820-down} {
                border-radius: 10px;
                width: 90%;
            }
        }

        .closeBtn {
            position: absolute;
            top: 5rem;
            right: 5%;
            border: none;
            border-radius: 7px;
            padding-top: 0.2rem;
            background-color: var(--light-90);
            color: var(--dark-70);

            &:hover {
                cursor: pointer;
            }
        }

    }
}
</style>