<template>
    <section class="cta wl">
        <div class="container">
            <div class="informatives">
                <h2>{{ $t('about.cta.title') }}</h2>
                <p>{{ $t('about.cta.description') }}</p>
            </div>
            <div class="action">
                <label for="aboutCta" class="subscribe">
                    <input type="email" name="aboutCta" id="aboutCta" :placeholder="$t('global.email')" />
                    <PrimaryButton @click="addSubscriber" :is-loading="loader">{{
                        subButtonText
                    }}</PrimaryButton>
                </label>
                <sub>{{ $t('about.cta.privacy-policy-agreament') }}</sub>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from '../microComponents/PrimaryButton.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const loader = ref(false);
const subButtonText = ref(t('global.subscribe'));
function addSubscriber() {
    // call the add subscriper api
    loader.value = true;
    setTimeout(() => {
        loader.value = false;
        subButtonText.value = t('global.done');
    }, 1000);
}
</script>

<style lang="scss" scoped>
section.cta {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-self: center;
    margin: 1rem 0;
    color: var(--light);

    .container {
        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;
        border-radius: 10px;
        width: 100%;
        padding: 1rem;
        background: var(--dark);

        @media #{$mq-820-down} {
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .informatives {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            width: 80%;

            h2 {
                margin: 0;
                text-transform: capitalize;
                font-size: 2rem;
            }
        }

        .action {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            margin-inline-start: 1rem;
            width: 80%;

            label.subscribe {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                border-radius: 10px;
                padding: 0.3rem;
                background-color: var(--white);

                @media #{$mq-820-down} {
                    flex-flow: column nowrap;
                }

                input {
                    outline: none;
                    border-radius: 10px;
                    border: none;
                    width: 150%;
                    height: 100%;
                    padding: 0.5rem;
                    color: var(--dark-90);
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    font-size: 0.87rem;

                    @media #{$mq-820-down} {
                        width: 100%;
                    }

                    &::placeholder {
                        color: var(--dark-40);
                        font-weight: 500;
                    }
                }
            }

            sub {
                margin-top: 0.3rem;
                font-size: 0.7rem;
            }
        }
    }
}
</style>