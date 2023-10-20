<template>
  <div class="selectElement">
    <p><slot></slot></p>
    <button
      :class="['selectView', isExpanded ? 'selectView__expand' : '']"
      @click="isExpanded = !isExpanded"
      @clickout="isExpanded = false">
      <p v-if="defaultSelection">{{ defaultSelection }}</p>
      <p v-else>select</p>
      <div class="expandIcon">
        <span class="material-symbols-rounded">
          {{ isExpanded ? 'expand_less' : 'expand_more' }}
        </span>
      </div>
    </button>
    <div :class="['selectMenu', isExpanded ? 'selectMenu__expand' : '']">
      <p v-if="notice">{{ notice }}</p>
      <button
        class="selectOption"
        v-for="listElement in list"
        :key="listElement.option"
        @click="
          emit('selection', listElement.option);
          selection = listElement.option;
        ">
        <div class="icon" v-if="listElement.symbol">
          <span> {{ listElement.symbol }} </span>
        </div>
        <p>{{ listElement.option }}</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const isExpanded = ref(false);
const selection = ref('');

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  notice: {
    type: String,
    required: false,
  },
  list: {
    type: Array,
    required: true,
  },
  defaultSelection: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['selection']);
</script>

<style lang="scss" scoped>
.selectElement {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;

  & > p {
    margin: 0;
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
  }

  .selectView {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border: 1.5px solid var(--primary-20);
    border-radius: 10px;
    padding: 0.2rem 0.5rem;

    &__expand {
      border-radius: 10px 10px 0px 0px;
    }
    &:hover {
      cursor: pointer;
    }

    & > p {
      margin: 0;
      color: var(--dark-40);
    }

    .expandIcon {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      margin-left: auto;
      border-radius: 8px;
      color: var(--primary);

      &__rtl {
        margin: 0;
        margin-right: auto;
      }
    }
  }

  .selectMenu {
    position: absolute;
    top: 54px;
    display: flex;
    flex-flow: column nowrap;
    border-radius: 0px 0px 10px 10px;
    max-height: 0px;
    width: 100%;
    transition-duration: 0.1s;
    overflow: auto;
    background-color: var(--light);
    border: none;

    &::-webkit-scrollbar-track {
      // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      height: 90%;
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 8px;
      border-radius: 10px;
      height: 90%;
      background-color: var(--dark-5);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: var(--dark-70);
    }
    &__expand {
      max-height: 200px;
      border: 1.5px solid var(--dark-20);
      box-shadow: var(--small-shadow);
      z-index: 5;
    }

    & > p {
      margin: 0;
      padding: 0.5rem 0.5rem;
      border-bottom: 1.5px solid var(--dark-20);
      color: var(--dark-70);
      text-align: center;
      font-size: 0.9rem;
    }
    .selectOption {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      border: none;
      border-bottom: 1px solid var(--dark-20);
      background-color: var(--light);
      font-size: 1rem;
      padding: 0.2rem 0.5rem;

      &:hover {
        cursor: pointer;
        background-color: var(--dark-5);
      }
      .icon {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
      }
      p {
        margin: 0;
      }
    }
  }
}
</style>
