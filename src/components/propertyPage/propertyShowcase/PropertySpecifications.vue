<template>
  <article class="propertySpecifications">
    <h1>{{ $t('property.info-section.specifications.general-specifications') }}</h1>
    <!-- details -->
    <Fieldset
      legend="Header"
      :toggleable="true"
      class="details"
    >
      <template #legend>
        <span>{{ $t('property.info-section.specifications.details.details') }}</span>
        <span class="material-symbols-rounded"> wysiwyg </span>
      </template>
      <template #default>
        <!-- details cards -->
        <div class="detailField">
          <span class="material-symbols-rounded"> home_work </span>
          <p>
            {{ $t('property.info-section.specifications.details.type') }} :
            <span class="value">{{ propertyData.category }}</span>
          </p>
        </div>
        <div class="detailField">
          <span class="material-symbols-rounded"> event </span>
          <p>
            {{ $t('property.info-section.specifications.details.date-built') }} :
            <time
              :datetime="propertyData.yearBuilt"
              class="value"
            >{{
              useDatetime.toLocalDate(propertyData.yearBuilt)
            }}</time>
          </p>
        </div>
        <div class="detailField">
          <span class="material-symbols-rounded"> home_pin </span>
          <p>
            {{ $t('property.info-section.specifications.details.address') }} :
            <span class="value">{{ propertyData.address }}</span>
          </p>
        </div>
        <div class="detailField">
          <span class="material-symbols-rounded"> fact_check </span>
          <p>
            {{ $t('property.info-section.specifications.details.identifier') }} :
            <span class="value">{{ propertyData.govId }}</span>
          </p>
        </div>
        <div class="detailField">
          <span class="material-symbols-rounded"> real_estate_agent </span>
          <p>
            {{ $t('property.info-section.specifications.details.developer') }} :
            <span class="value"> {{ propertyData.developer }}</span>
          </p>
        </div>
        <div class="detailField">
          <span class="material-symbols-rounded"> real_estate_agent </span>
          <p>
            {{ $t('property.info-section.specifications.details.agent') }} :
            <span class="value"> {{ propertyData.agent }}</span>
          </p>
        </div>
      </template>
    </Fieldset>
    <!-- layout -->
    <Fieldset
      legend="Header"
      :toggleable="true"
      class="layout"
    >
      <template #legend>
        <span>{{ $t('property.info-section.specifications.layout.layout') }}</span>
        <span class="material-symbols-rounded"> nest_multi_room </span>
      </template>
      <template #default>
        <!-- layout cards -->
        <div class="layoutField">
          <span class="material-symbols-rounded"> bed </span>
          <p>
            {{ $t('property.info-section.specifications.layout.beds') }} :
            <span class="value">{{ propertyData.layout.bedrooms }}</span>
          </p>
        </div>
        <div class="layoutField">
          <span class="material-symbols-rounded"> bathtub </span>
          <p>
            {{ $t('property.info-section.specifications.layout.baths') }} :
            <span class="value">{{ propertyData.layout.bathrooms }}</span>
          </p>
        </div>
        <div class="layoutField">
          <span class="material-symbols-rounded"> pivot_table_chart </span>
          <p>
            {{ $t('property.info-section.specifications.layout.living-area') }} :
            <span class="value">{{ propertyData.layout.livingArea }} m<sup>2</sup>/sqr</span>
          </p>
        </div>
        <div class="layoutField">
          <span class="material-symbols-rounded"> picture_in_picture_center </span>
          <p>
            {{ $t('property.info-section.specifications.layout.land-area') }} :
            <span class="value">{{ propertyData.layout.landArea }} m<sup>2</sup>/sqr</span>
          </p>
        </div>
        <div class="layoutField">
          <span class="material-symbols-rounded"> layers </span>
          <p>
            {{ $t('property.info-section.specifications.layout.floors') }} :
            <span class="value">{{ propertyData.layout.floors }}</span>
          </p>
        </div>
        <div class="layoutField">
          <span class="material-symbols-rounded"> floor </span>
          <p>
            {{ $t('property.info-section.specifications.layout.level') }} :
            <span class="value">{{ propertyData.layout.level }}</span>
          </p>
        </div>
      </template>
    </Fieldset>
    <!-- features -->
    <Fieldset
      legend="Header"
      :toggleable="true"
      class="featuers"
    >
      <template #legend>
        <span>{{ $t('property.info-section.specifications.features') }}</span>
      </template>
      <template #default>
        <div
          class="featureField"
          v-for="(feature, index) in propertyData.features"
          :key="index"
        >
          <p>{{ feature.title }} :</p>
          <span class="value">
            <ul>
              <li
                v-for="(featureItem, jIndex) in feature.featureList"
                :key="jIndex"
              >
                {{ featureItem }}
              </li>
            </ul>
          </span>
        </div>
      </template>
    </Fieldset>
  </article>
</template>

<script setup>
import Fieldset from 'primevue/fieldset';
import { inject } from 'vue';
import { ref } from 'vue';
import useDatetime from '@/composables/useDatetime';

const propertyData = ref(await inject('propertyData'));
</script>

<style lang="scss" scoped>
.propertySpecifications {
  display: flex;
  flex-flow: row wrap;

  h1 {
    flex: 1 1 100%;

    text-transform: capitalize;
  }

  &:deep(.p-fieldset) {
    margin: 0.5rem;
    border-radius: 10px;
    height: fit-content;

    .p-fieldset-legend {
      text-transform: capitalize;
      span {
        padding: 0 0.5rem;
      }
    }

    &.details {
      flex: 1 1 45%;

      .p-fieldset-content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;

        .detailField {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 0.5rem;
          flex: 0 1 auto;

          .material-symbols-rounded {
            border-radius: 10px;
            padding: 0.5rem;
            background-color: var(--primary-5);
          }

          p {
            margin: 0 0.5rem;

            &::first-letter {
              text-transform: uppercase;
            }

            .value {
              color: var(--primary);
            }
          }
        }
      }
    }

    &.layout {
      flex: 1 1 45%;

      .p-fieldset-content {
        display: flex;
        flex-flow: column nowrap;

        .layoutField {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          padding: 0.5rem;
          flex: 0 1 auto;

          .material-symbols-rounded {
            border-radius: 10px;
            padding: 0.5rem;
            background-color: var(--primary-5);
          }

          p {
            margin: 0 0.5rem;

            &::first-letter {
              text-transform: uppercase;
            }

            .value {
              color: var(--primary);
            }
          }
        }
      }
    }

    &.featuers {
      flex: 1 1 100%;

      .p-fieldset-content {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;

        .featureField {
          display: flex;
          flex-flow: row nowrap;
          align-items: flex-start;
          padding: 0.5rem;
          flex: 1 1 auto;

          p {
            margin: 0 0.5rem;
            font-weight: 600;

            &::first-letter {
              text-transform: uppercase;
            }
          }

          .value {
            display: block;
            border-radius: 10px;
            padding: 0.5rem 1rem;
            background-color: var(--primary-5);

            ul {
              padding-inline-start: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
