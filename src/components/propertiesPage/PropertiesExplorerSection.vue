<template>
  <!-- properties listing sections -->
  <section class="propertiesExplorer">
    <Suspense>
      <template #default>
        <InputsSection 
          @filtered-query="updateList"
        />
      </template>
      <template #fallback>
        <InputsSectionLoader />
      </template>
    </Suspense>
    <!-- properties list -->
    <ul
      class="cardsList"
      v-if="propertiesData && !isLoading"
    >
      <li
        v-for="property in propertiesData.data" 
        :key="property.id"
      >
        <PropertyCard
          :property-data="property"
        />
      </li>
    </ul>
    <section
      class="cardsList"
      v-if="!propertiesData || isLoading"
    >
      <PropertyCardLoader 
        v-for="n in 10" 
        :key="n"
      />
    </section>
    <!-- pagination nav menu -->
    <Paginator
      :total-records="totalProperties"
      v-model:first="firstPage"
      :rows="perPage"
      :template="{
        default: 'FirstPageLink PrevPageLink JumpToPageInput CurrentPageReport NextPageLink LastPageLink'
      }"
      :current-page-report-template="'/ {totalPages}'"
      @page="updatePage"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import propertiesAPI from '../../services/propertiesAPI';
import InputsSection from './InputsSection.vue';
import PropertyCard from '@/components/macroComponents/properties/PropertyCard.vue';
import PropertyCardLoader from '../macroComponents/properties/PropertyCardLoader.vue';
import Paginator from 'primevue/paginator';
import { computed } from 'vue';
import InputsSectionLoader from './InputsSectionLoader.vue';

/* global */
const isLoading = ref(false);


/* pagination logic -- start --*/ 
/**
 * TODO v1:: pagination logic should be more dynamic upon user changes 
 * - properties per page 
 */
// pagination default values
const firstPage = ref(1); // static for MVP, should take url params if any in v1
const perPage = ref(9); // static for MVP, should be variable upon user changes in v1
const currentPage = ref(1); 
const totalProperties = ref(0);
const paginationQuery = computed(() => {
  return `page=${currentPage.value}&per_page=${perPage.value}`;
});

// query data
const query = ref(`?${paginationQuery.value}`);

/* Data fetching (should use 'getSnippertsByQuery' only in live prod, this is only for dev) */
const propertiesData = ref(await propertiesAPI.getSnippets(query.value));

// updating pagination vars
currentPage.value = propertiesData.value.meta.current_page;
totalProperties.value = propertiesData.value.meta.total;

// pagination function
function updatePage(pageNumber) {
  currentPage.value = pageNumber.page + 1;
  updateList('nav');
}
/* pagination logic -- end -- */

async function updateList(newQuery) {
  // start loading state
  isLoading.value = true;

  // updating list
  switch (newQuery) {
    case 'nav':
      // for pagination only
      query.value = '?' + paginationQuery.value;
      propertiesData.value = await propertiesAPI.getSnippetsByQuery(query.value);
    break;

    default:
      // if filteres changed 
      currentPage.value = 1;
      query.value = '?' + newQuery + '&' + paginationQuery.value;
      firstPage.value = newQuery ? currentPage.value : firstPage.value;
      propertiesData.value = await propertiesAPI.getSnippetsByQuery(query.value);
      totalProperties.value = propertiesData.value.meta.total;
    break;
  }

  // end loading state
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.propertiesExplorer {
  margin: 1rem 0rem;
  .cardsList {
    display: flex;
    flex-flow: row wrap;
    padding: 0;
    list-style: none;

    li {
      margin: 0.5rem;
      flex: 1 1 30%;
    }
  }
  nav:has(> .p-paginator) {
    width: 100%;
  }
  
  :deep(.p-paginator) {
    border: 1px solid var(--dark-20);
  
    .p-inputnumber {
      margin-inline-end: 0;
      width: 3rem;
      & > .p-inputtext {
        max-width: unset;
        width: 100%;
      }
    }
  }
  :deep(.p-paginator .p-paginator-current) {
    padding: 0;
  }
}
</style>