<template>
  <article class="investmentTimeline">
    <h1>
      {{ $t('property.info-section.timeline.investment-timeline') }}
    </h1>
    <Timeline
      :value="propertyData.timeline"
      :align="timelienAlignment"
      :pt="{
        opposite: { style: timelienAlignment ? '' : 'display:none;' },
      }"
    >
      <!-- timeline cards -->
      <template #content="slotProps">
        <Panel toggleable>
          <template #header>
            <div class="informatives">
              <h2>{{ slotProps.item.name }}</h2>
              <time
                :datetime="useDatetime.localizeISO(slotProps.item.date)"
                v-if="!timelienAlignment"
              >
                {{ useDatetime.toLocalDate(slotProps.item.date) }}
              </time>
            </div>
          </template>
          <p>
            {{ slotProps.item.description }}
          </p>
        </Panel>
      </template>
      <!-- timeline card opposits (dates in desktop) -->
      <template #opposite="slotProps">
        <time :datetime="useDatetime.localizeISO(slotProps.item.date)">{{
          useDatetime.toLocalDate(slotProps.item.date)
        }}</time>
      </template>
      <!-- timeline marker circles -->
      <template #marker="slotProps">
        <div
          :class="[
            'marker',
            !useDatetime.durationUntilDate(slotProps.item.date).isValid ? 'marker__done' : '',
          ]"
        />
      </template>
      <!-- timeline marker connectors -->
      <template #connector="slotProps">
        <div
          :class="[
            'p-timeline-event-connector',
            !useDatetime.durationUntilDate(propertyData.timeline[slotProps.index + 1].date).isValid
              ? 'connectorActive'
              : '',
          ]"
        />
      </template>
    </Timeline>
  </article>
</template>

<script setup>
import { inject, onBeforeUnmount, onMounted, computed, ref } from 'vue';
import Panel from 'primevue/panel';
import Timeline from 'primevue/timeline';
import useDatetime from '@/composables/useDatetime';

// injecting property data from <PropertyShowcase.vue>
const propertyData = ref(await inject('propertyData'));

const screenWidth = ref(window.innerWidth);
const timelienAlignment = computed(() => {
  return screenWidth.value > 560 ? 'alternate' : '';
});

function handleResize() {
  screenWidth.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
article.investmentTimeline {
  display: flex;
  flex-flow: column nowrap;

  h1 {
    text-transform: capitalize;
    text-align: center;
    font-size: 1.3rem;
  }

  &:deep(.p-timeline) {
    .p-timeline-event-opposite {
      padding: 0.5rem 1rem;
      time {
        margin: 0.5rem 0;
        color: var(--primary);
      }
    }
    .p-timeline-event-content {
      margin: 1rem 0;

      .p-panel {
        border-radius: 10px;

        .p-panel-header {
          padding: 0.5rem;

          .informatives {
            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
            margin-inline-end: 1rem;
            border-radius: 10px;
            width: 100%;
            padding: 0.5rem;
            background-color: var(--primary-5);

            h2 {
              margin: 0;
              font-size: 1.2rem;
              text-transform: capitalize;
            }
            time {
              margin: 0.5rem 0;
              color: var(--primary);
            }
          }
        }

        .p-panel-content {
          padding: 1rem;

          p {
            margin: 0;
          }
        }
      }
    }
    .marker {
      border: 2px dashed var(--dark-5);
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      background-color: var(--dark-5);

      &__done {
        border: none;
        background: var(--accent-primary);
      }
    }

    .connectorActive {
      background-color: var(--primary-40);
    }
  }
}
</style>
