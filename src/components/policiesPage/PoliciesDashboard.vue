<template>
  <section class="policiesDash">
    <aside>
      <h2>{{ $t('policies.policies') }}</h2>
      <hr>
      <menu>
        <li
          v-for="(policy, index) in policies"
          :key="policy.id"
          @click="viewPolicy(index)"
          :class="['policy', index == 0 ? 'selected' : '']"
          ref="policyEls"
        >
          {{ policy.title }}
        </li>
      </menu>
    </aside>
    <article>
      <header>
        <h1>{{ currentPolicy.policyTitle }}</h1>
        <p class="timestamp">
          <span>{{ $t('policies.last-updated') }}</span> <span>{{
            currentPolicy.policyLastUpdated
          }}</span>
        </p>
        <span
          class="material-symbols-rounded"
          @click="download()"
        >
          file_save
        </span>
      </header>
      <p>{{ currentPolicy.policyContent }}</p>
    </article>
  </section>
</template>

<script setup>
import policiesAPI from '@/services/policiesAPI.js';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
    isLoading: {
        type: Boolean,
        required: false
    }
});

const route = useRoute();
const policyEls = ref(null);
const policies = ref(await policiesAPI.get());
const currentPolicy = ref({
    policyId: policies.value[0].id,
    policyTitle: policies.value[0].title,
    policyContent: policies.value[0].content,
    policyLastUpdated: policies.value[0].lastUpdated.slice(0, 10)
});

onMounted(async () => {
    if (route.params.slug) {
        let index = policies.value.findIndex(policy => policy.slug == route.params.slug);
        if (index >= 0) viewPolicy(index);
        // else // TODO:: error toast display
    }
});

function viewPolicy(index) {
    // updating values
    currentPolicy.value.policyId = policies.value[index].id;
    currentPolicy.value.policyTitle = policies.value[index].title;
    currentPolicy.value.policyContent = policies.value[index].content;
    currentPolicy.value.policyLastUpdated = policies.value[index].lastUpdated.slice(0, 10);

    // removing selected style from the old element
    policyEls.value.forEach(el => {
        el.classList.remove('selected');
    });
    policyEls.value[index].classList.add('selected');
}
function download() {
    // downloading logic, (api for blob)
}
</script>

<style lang="scss" scoped>
section.policiesDash {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;

    @media #{$mq-820-down} {
        flex-flow: column nowrap;
    }

    aside {
        position: sticky;
        top: 5rem;
        margin-inline-end: 1rem;
        border-radius: 10px;
        width: 25%;
        max-width: 14rem;
        padding: 1rem;
        background-color: var(--dark);
        color: var(--light);

        @media #{$mq-820-down} {
            position: unset;
            top: unset;
            width: 100%;
            max-width: unset;
        }

        h2 {
            margin: 0;
            font-size: 1.3rem;
        }

        menu {
            padding: 0;
            list-style: none;

            li.policy {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 0.1rem 0;
                border-radius: 7px;
                width: 100%;
                padding: 0.3rem 0.5rem;
                transition-duration: 0.2s;

                &:hover {
                    cursor: pointer;
                    background-color: var(--light-20);
                }

                &.selected {
                    background-color: var(--light-20);

                    &>span {
                        opacity: 1;
                    }
                }

                span {
                    margin-inline-start: auto;
                    border-radius: 5px;
                    font-size: 19px;
                    color: var(--dark);
                    background-color: var(--light);
                    opacity: 0;
                    transition-duration: 0.2s;
                }
            }
        }

    }

    article {
        display: flex;
        flex-flow: column nowrap;
        width: 75%;
        border: 1px solid var(--dark-20);
        padding: 1rem;
        border-radius: 10px;

        @media #{$mq-820-down} {
            width: 100%;
            margin-top: 1rem;
        }

        header {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border-bottom: 1px solid var(--dark-70);
            width: 100%;
            padding-bottom: 0.5rem;

            @media #{$mq-820-down} {
                flex-flow: column nowrap;
                padding-bottom: 0.5rem;
            }

            h1 {
                margin: 0;
            }

            .timestamp {
                margin: 0;
                margin-inline-start: auto;

                @media #{$mq-820-down} {
                    margin-inline-start: unset;
                }

                span {
                    margin: 0 0.2rem;
                }
            }

            &>span {
                margin-inline-start: 1rem;
                transition-duration: 0.2s;

                @media #{$mq-820-down} {
                    margin-inline-start: unset;
                }

                &:hover {
                    cursor: pointer;
                    color: var(--primary);
                }
            }
        }

        p {
            font-size: 0.9rem;
        }
    }
}
</style>