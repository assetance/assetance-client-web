<template>
  <section class="tradingShares">
    <h1>{{ $t('property.info-section.trading-shares.trading-shares') }}</h1>
    <!-- shares viewer -->
    <div class="sharesLister">
      <!-- sort input -->
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
              {{ $t('global.form.sort') }}
            </span>
            <span>{{ sortSelectProps.label }}</span>
          </template>
          <template #option="slotProps">
            <span>{{ slotProps.option.option }}</span>
          </template>
        </SelectInput>
      </form>
      <!-- shares list -->
      <ul class="sharesList">
        <li
          class="share"
          v-for="offer in availableTradingOffers.data"
          :key="offer.offerId"
        >
          <div class="informatives">
            <p class="sharePrice">
              <sup>{{ $t('property.info-section.trading-shares.price') }}</sup>
              {{
                $n(
                  (offer.offerPrice / 100) * store.getters.getExchangeRate(),
                  'currency',
                  store.getters.getUserLocaleCurrency(),
                  { currencyDisplay: 'symbol' }
                )
              }}
              <sub><span
                     :class="[
                       'value',
                       offer.pastMonthPriceActivity / 100 > 0 ? 'value__positive' : 'value__negative',
                     ]"
                   >
                     <span class="material-symbols-rounded">
                       {{ offer.pastMonthPriceActivity / 100 > 0 ? 'expand_less' : 'expand_more' }}
                     </span>
                     {{
                       $n(
                         (offer.pastMonthPriceActivity / 100) * store.getters.getExchangeRate(),
                         'currency',
                         store.getters.getUserLocaleCurrency(),
                         { currencyDisplay: 'symbol' }
                       )
                     }}
                   </span>
                <span>{{ $t('property.info-section.trading-shares.last-30-days') }}</span></sub>
            </p>
            <p class="availableShares">
              <sup>{{ $t('property.info-section.trading-shares.shares') }}</sup>
              {{ offer.availableShares }}
              <sub><span class="value">{{ offer.pastMonthSharesActivity }}</span>
                {{ $t('property.info-section.trading-shares.last-30-days') }}</sub>
            </p>
            <p class="listingDate">
              <sup>{{ $t('property.info-section.trading-shares.listing-date') }}</sup>
              <time :datetime="useDatetime.localizeISO(offer.listDate)">{{
                useDatetime.toLocalDate(offer.listDate)
              }}</time>
              -
              <time
                :datetime="
                  useDatetime.durationUntilDate(offer.listDate, { units: ['days'] }).durationISO
                "
              >
                {{
                  useDatetime.getDiffFromISO(offer.listDate, { units: ['days', 'hours'] }).days >= 1
                    ? $t(
                      'property.info-section.trading-shares.days-ago',
                      useDatetime.getDiffFromISO(offer.listDate, { units: ['days', 'hours'] })
                        .days,
                      {
                        n: useDatetime.getDiffFromISO(offer.listDate, {
                          units: ['days', 'hours'],
                        }).days,
                      }
                    )
                    : $t('property.info-section.trading-shares.today')
                }}
              </time>
            </p>
          </div>
          <div class="actionables">
            <InputNumber
              :max-fraction-digits="0"
              :min="1"
              :max="offer.availableShares"
              v-model="offer.quantity"
              show-buttons
              button-layout="horizontal"
              :input-id="offer.offerId"
            >
              <template #incrementbuttonicon>
                <span class="material-symbols-rounded"> add </span>
              </template>
              <template #decrementbuttonicon>
                <span class="material-symbols-rounded"> remove </span>
              </template>
            </InputNumber>
            <button
              aria-label="add"
              class="addBtn"
              :disabled="offer.isAdded /* in case of any style tampering*/"
              :style="[offer.isAdded ? 'display: none;' : '']"
              @click="addToCart(offer)"
            >
              <span class="material-symbols-rounded"> add_box </span>
            </button>
          </div>
        </li>
      </ul>
      <!-- paginator -->
      <Paginator
        :rows="perPage"
        :total-records="totalOffers"
        v-model:first="firstPage"
        template="FirstPageLink PageLinks LastPageLink"
        @page="updatePage"
      />
    </div>
    <!-- shares basket -->
    <div class="sharesCollector">
      <ul>
        <li
          class="addedShare"
          v-for="offer in cartList"
          :key="offer.offerId"
        >
          <p class="entry">
            <span class="price">{{
              $n(
                (offer.offerPrice / 100) * store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { currencyDisplay: 'symbol' }
              )
            }}</span>
            x <span class="quantity">{{ offer.quantity }}</span>
          </p>
          <button @click="removeFromCart(offer)">
            <span class="material-symbols-rounded"> delete </span>
          </button>
        </li>
      </ul>
      <div class="expenses">
        <div class="subTotal">
          <p class="label">
            {{ $t('property.info-section.trading-shares.sub-total') }}
            <span class="value">{{
              $n(
                subTotal * store.getters.getExchangeRate(),
                'currency',
                store.getters.getUserLocaleCurrency(),
                { currencyDisplay: 'symbol' }
              )
            }}</span>
          </p>
        </div>
      </div>
      <PrimaryButton icon="start">
        {{ $t('global.start-investing') }}
      </PrimaryButton>
      <Panel :toggleable="true">
        <template #header>
          <span class="material-symbols-rounded"> priority_high </span>
          {{ $t('property.info-section.trading-shares.notice') }}
        </template>
        <template #default>
          <sub class="notice">
            {{ $t('property.info-section.trading-shares.notice-body') }}
          </sub>
        </template>
      </Panel>
    </div>
  </section>
</template>

<script setup>
import InputNumber from 'primevue/inputnumber';
import { inject } from 'vue';
import { ref, computed, watch } from 'vue';
import SelectInput from '@/components/microComponents/SelectInput.vue';
import Paginator from 'primevue/paginator';
import marketAPI from '@/services/marketAPI.js';
import nprogress from 'nprogress';
import PrimaryButton from '../../microComponents/PrimaryButton.vue';
import Panel from 'primevue/panel';
import useDatetime from '@/composables/useDatetime';
import store from '@/store';

const propertyData = ref(await inject('propertyData'));
const cartList = ref([]);
const selectedSort = ref('');
const subTotal = computed(() => {
  let st = 0;
  cartList.value.forEach((item) => {
    st = st + (item.offerPrice / 100) * item.quantity;
  });
  return st;
});

// filterable options (provided from backend for dynamic filtering implementaiton)
const selectOptions = ref(await marketAPI.getSelectionOptions());

/* pagination logic */
/**
 * TODO v1:: fetch requests caching
 * pagination logic doesn't persist changes in page additions (going to already visited pages will make a new API request again)
 *
 */
const firstPage = ref(1); // static for MVP, should take url params if any in v1
const perPage = ref(5); // static for MVP, should be variable upon user changes in v1
const currentPage = ref(1);
const totalOffers = ref(1);
const paginationQuery = computed(() => {
  return `page=${currentPage.value}&per_page=${perPage.value}`;
});

// fetch trading shares of the current property from trading market API
const availableTradingOffers = ref(await getOffers());

// sort input
const sortSelectProps = ref({
  label: 'sort',
  optionObjects: selectOptions.value
    .find((item) => item.name === 'sort')
    .options.map((el) => ({ option: el })),
});

async function updatePage(pageNumber = false) {
  if (pageNumber) {
    currentPage.value = pageNumber.page + 1;
  }

  // fetch trading market api for the correct page
  availableTradingOffers.value = await getOffers(currentPage.value);
}

/**
 *
 * @param {Number} tempNum static demo only, not needed when connected to backend
 */
async function getOffers(tempNum = 1) {
  nprogress.start();

  // inject pagination query (and sort query if any) to the api call
  let query =
    '?' + paginationQuery.value + selectedSort.value ? `&sort=${selectedSort.value.option}` : '';
  // fetch data
  let offersData = await marketAPI.getPropertyOffers(
    { propertyId: propertyData.value.id, query: query },
    tempNum
  );

  // adding the 'quantity' property to the object with the proper binding value
  offersData.data = offersData.data.map((offer) => {
    // checking if already added to cart list.
    const listedOffer = cartList.value.find((offerObject) => {
      return offerObject.offerId == offer.offerId;
    });

    if (listedOffer) {
      // if already in the cart list then add the cart list object, if not then add the quantity with the default value of 1
      return listedOffer;
    } else return { ...offer, quantity: 1, isAdded: false };
  });

  totalOffers.value = offersData.meta.total;
  currentPage.value = offersData.meta.currentPage;

  nprogress.done();
  return offersData;
}

function addToCart(offerObject) {
  // change styling
  offerObject.isAdded = true;

  // check if offer is already added to cart
  const offerIndex = cartList.value.findIndex((object) => object.offerId === offerObject.offerId);

  if (offerIndex == -1) {
    // add if not found
    cartList.value.push(offerObject);
  } else {
    // sync object if found
    cartList.value.splice(offerIndex, 1);
    cartList.value.push(offerObject);
  }
}

function removeFromCart(offerObject) {
  // searching for the offer
  const offerIndex = cartList.value.findIndex((object) => object.offerId == offerObject.offerId);

  if (offerIndex !== -1) {
    // removing if found
    cartList.value.splice(offerIndex, 1);
  } else {
    // error if not found
  }

  // change styling
  offerObject.isAdded = false;
  offerObject.quantity = 1;
}

watch(selectedSort, async () => {
  updatePage();
});
</script>

<style lang="scss" scoped>
.tradingShares {
  display: flex;
  flex-flow: row wrap;

  h1 {
    flex: 1 1 100%;
    text-transform: capitalize;
  }

  .sharesLister {
    flex: 1 1 65%;
    margin-top: 0.5rem;
    margin-inline-end: 1rem;
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    padding: 0.5rem;
    height: fit-content;

    @media #{$mq-480-down} {
      margin-inline-end: unset;
    }
    .arrangmentOption {
      display: flex;
      flex-flow: row wrap;
      max-width: 45%;
      width: 100%;

      @media #{$mq-820-down} {
        align-self: flex-end;
        max-width: 50%;
      }
      .sortIcon {
        font-size: 1rem;
      }
    }

    .sharesList {
      display: flex;
      flex-flow: column nowrap;
      list-style: none;
      margin: 0;
      max-height: 100rem;
      padding: 0;

      .share {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0.25rem 0;
        border: 1px solid var(--dark-5);
        padding: 0.5rem;
        background-color: var(--primary-5);
        border-radius: 7px;

        .informatives {
          flex: 1 1 65%;
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          justify-content: flex-start;
          min-width: 170px;

          @media #{$mq-480-down} {
            justify-content: space-between;
          }

          p {
            position: relative;
            margin: 0.5rem;
            padding: 0.5rem;
            padding-bottom: 0;
            border-bottom: 1px solid var(--primary-70);
            text-transform: capitalize;

            sup {
              position: absolute;
              top: -5px;
              left: 0;
              font-size: 0.7rem;
              color: var(--dark-40);
              font-weight: 600;
            }
          }

          .sharePrice {
            display: flex;
            flex-flow: column nowrap;
            color: var(--primary);
            font-weight: 600;

            sub {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              font-size: 0.7rem;
              font-weight: 400;

              .value {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin-inline-end: 0.15rem;
                font-weight: 600;

                .material-symbols-rounded {
                  font-size: 1rem;
                }

                &__positive {
                  color: var(--positive);
                }
                &__negative {
                  color: var(--negative);
                }
              }
            }
          }

          .availableShares {
            display: flex;
            flex-flow: column nowrap;
            margin-inline-end: auto;

            @media #{$mq-480-down} {
              margin-inline-end: unset;
            }

            sub {
              font-size: 0.7rem;
              font-weight: 400;

              .value {
                margin-inline-end: 0.15rem;
                font-weight: 600;
                color: var(--negative);
              }
            }
          }

          .listingDate {
            margin-inline-end: 0.5rem;
            color: var(--dark-40);
            font-size: 0.8rem;
          }
        }

        .actionables {
          flex: 1 1 25%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: flex-end;

          @media #{$mq-480-down} {
            flex: 1 1 100%;
            width: 100%;
          }

          &:deep(.p-inputnumber) {
            margin-inline-end: 0.5rem;
            border-radius: 7px;
            overflow: hidden;

            @media #{$mq-820-down} {
              margin-inline-end: unset;
              margin: 0.5rem 0;
            }
            @media #{$mq-480-down} {
              width: 100%;
            }

            .p-inputtext {
              border: none;
              outline: none;
              max-width: 6.5rem;
              min-width: 3rem;
              width: 100%;
              padding: 0;
              color: var(--dark);
              text-align: center;

              @media #{$mq-480-down} {
                max-width: unset;
                min-width: unset;
              }
            }

            button {
              border: none;
              padding: 0;
              background-color: white;

              .material-symbols-rounded {
                color: var(--primary);
              }
            }
          }

          .addBtn {
            display: flex;
            border: none;
            background-color: transparent;
            transition-duration: 0.2s;
            color: var(--primary-70);

            &:hover {
              cursor: pointer;
              color: var(--primary-90);
            }
            &:active {
              color: var(--dark);
            }
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }

  .sharesCollector {
    flex: 1 0 25%;
    min-width: 185px;
    margin-top: 0.5rem;
    margin-inline-end: 1rem;
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    height: fit-content;
    padding: 0.5rem;

    @media #{$mq-480-down} {
      margin-inline-end: unset;
    }

    ul {
      list-style: none;
      border-bottom: 1px solid var(--dark-20);
      padding: 0;
      max-height: 20rem;
      overflow-y: auto;

      .addedShare {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin: 0.5rem 0;
        border-radius: 10px;

        .entry {
          margin: 0;
          margin-inline-end: 0.25rem;
          border-radius: 7px;
          width: 100%;
          padding: 0.5rem 0.5rem;
          background-color: var(--primary-5);

          .price {
            font-weight: 600;
          }
        }

        button {
          border: none;
          border-radius: 7px;
          margin-inline-start: auto;
          padding-top: 0.25rem;
          background-color: transparent;
          color: var(--negative);
          transition-duration: 0.2s;

          .material-symbols-rounded {
            font-size: 1.2rem;
          }
          &:hover {
            cursor: pointer;
            background-color: var(--negative-5);
          }
          &:active {
            background-color: var(--negative-20);
          }
        }
      }
    }

    .expenses {
      display: flex;
      flex-flow: column nowrap;
      border: 1px solid var(--dark-20);
      border-radius: 10px;
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: var(--primary-5);

      .subTotal {
        padding: 0 0.25rem;

        p.label {
          display: flex;
          flex-flow: row nowrap;
          margin: 0;

          .value {
            margin-inline-start: auto;
            color: var(--primary);
          }
        }
      }
    }

    &:deep(.p-panel) {
      margin: 0.5rem 0;
      border: none;
      .p-panel-header {
        padding: 0;
        justify-content: flex-start;

        .p-panel-icons {
          margin-inline-start: auto;
        }
        .material-symbols-rounded {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
