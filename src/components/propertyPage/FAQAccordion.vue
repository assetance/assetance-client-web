<template>
  <section class="faqAccordion">
    <h2>{{ $t('property.faq') }}</h2>
    <!-- faq -->
    <Accordion>
      <!-- faq cards -->
      <AccordionTab>
        <template #header>
          <span>Question 1</span>
        </template>
        <template #default>
          <p>Answer 1</p>
        </template>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <span>Question 2</span>
        </template>
        <template #default>
          <p>Answer 2</p>
        </template>
      </AccordionTab>
      <AccordionTab>
        <template #header>
          <span>Question 3</span>
        </template>
        <template #default>
          <p>Answer 3</p>
        </template>
      </AccordionTab>
    </Accordion>
  </section>
</template>

<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

/**
 * proerty FAQs :
 * - api request from knowledge base api
 * - populate the same FAQs for all properties
 */
</script>

<style lang="scss" scoped>
section.faqAccordion {
  margin: 2rem 0;
  text-align: center;
  z-index: 0;
  &:deep(.p-accordion) {
    box-shadow: var(--medium-shadow);
    border: 1px solid var(--dark-5);
    border-radius: 10px;
    overflow: hidden;

    .p-accordion-tab {
      background-color: var(--white);

      .p-accordion-content {
        margin: 0.5rem;
        border-radius: 10px;
        padding: 1rem;
        text-align: start;
        background-color: var(--primary-5);

        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
