<template>
  <div class="investmentDocuments">
    <h1>{{ $t('property.info-section.documents.investment-documents') }}</h1>
    <!-- docs list -->
    <ul class="documentsList">
      <!-- doc card -->
      <li
        class="document"
        v-for="(doc, index) in propertyData.documents"
        :key="index"
      >
        <article>
          <h1>{{ doc.title }}</h1>
          <p>{{ doc.description }}</p>
        </article>
        <button
          class="downloadBtn"
          @click="downloadDocument(doc.downloadLink)"
        >
          <span class="material-symbols-rounded"> file_save </span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { ref } from 'vue';

const propertyData = ref(await inject('propertyData'));

function downloadDocument(link) {
  /**
   * TODO:: add downloading link functionality
   * take a look at this
   * https://plainenglish.io/blog/how-to-download-a-file-using-javascript-fec4685c0a22
   */
}
</script>

<style lang="scss" scoped>
.investmentDocuments {
  display: flex;
  flex-flow: column nowrap;

  .documentsList {
    display: flex;
    flex-flow: row wrap;
    padding: 0;
    list-style: none;

    @media #{$mq-820-down} {
      flex-flow: column nowrap;
    }
    .document {
      flex: 1 1 45%;
      display: flex;
      flex-flow: row nowrap;
      margin: 0.5rem;
      box-shadow: var(--medium-shadow);
      border: 1px solid var(--dark-5);
      border-radius: 10px;
      height: fit-content;

      article {
        flex: 1 1 auto;
        margin: 0.5rem;
        border-radius: 10px;
        padding: 0.5rem;
        background-color: var(--primary-5);

        h1 {
          margin: 0;
        }

        p {
          margin-bottom: 0;
        }
      }

      .downloadBtn {
        border: none;
        background-color: none;
        margin: 0.5rem;
        border-radius: 10px;
        padding: 0 0.5rem;
        background-color: transparent;
        transition-duration: 0.2s;

        &:hover {
          cursor: pointer;
          background-color: var(--primary-5);
        }
        &:active {
          background-color: var(--primary-20);
        }

        .material-symbols-rounded {
          padding: 0.25rem;
          color: var(--primary);
        }
      }
    }
  }
}
</style>
