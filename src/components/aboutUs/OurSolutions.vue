<template>
    <section class="solutions wl">
        <header>{{ $t('about.solutions.tagline') }}</header>
        <div class="informatives">
            <div class="solution">
                <h2>{{ $t('about.solutions.solution1.title') }}</h2>
                <p>{{ $t('about.solutions.solution1.description') }}</p>
                <div class="cta">
                    <PrimaryButton @click="relocate">{{ $t('global.start-investing') }}</PrimaryButton>
                </div>
            </div>
            <div class="solution">
                <h2>{{ $t('about.solutions.solution2.title') }}</h2>
                <p>{{ $t('about.solutions.solution2.description') }}</p>
                <div class="cta">
                    <PrimaryButton @click="relocate">{{ $t('global.start-pro-account') }}</PrimaryButton>
                </div>
            </div>
            <div class="solution">
                <h2>{{ $t('about.solutions.solution3.title') }}</h2>
                <p>{{ $t('about.solutions.solution3.description') }}</p>
                <div class="cta">
                    <PrimaryButton @click="relocate">{{ $t('global.contact-sales') }}</PrimaryButton>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import PrimaryButton from '../microComponents/PrimaryButton.vue';

/**
 * pushes to the currect router address
 * @param {String} route route link/router
 */
// eslint-disable-next-line no-unused-vars
function relocate(route) {
    // push logic
}
</script>

<style lang="scss" scoped>
section.solutions {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    margin: 2rem 0;
    padding: 1rem;

    header {
        color: var(--primary);
        text-transform: capitalize;
    }

    .informatives {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        min-height: 13rem;

        @media #{$mq-820-down} {
            flex-flow: column nowrap;
        }

        .solution {
            position: relative;
            border-bottom: 2px solid var(--primary);
            border-radius: 10px 10px 0 0;
            box-shadow: var(--larg-shadow);
            margin: 1rem;
            width: 100%;
            padding: 1rem;
            background-color: var(--white);
            transition-duration: 0.3s;

            @media #{$mq-820-down} {
                margin: 0.5rem;
                padding: 2rem 1rem;
                text-align: center;
            }

            &>.cta {
                position: absolute;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                top: 0;
                left: 0;
                border-radius: 10px;
                width: 100%;
                height: 100%;
                padding: 1rem;
                background-color: var(--secondary-70);
                opacity: 0;
                transition-duration: 0.3s;

                @media #{$mq-820-down} {
                    position: unset;
                    opacity: 1;
                }
            }

            &:hover {
                cursor: pointer;
                border-bottom: 2px solid var(--dark);
                border-radius: 10px;
                scale: 1.02;

                &>.cta {
                    opacity: 1;
                }
            }

            &:nth-child(1) {
                margin-top: 1rem;
                margin-bottom: -1rem;
            }

            &:nth-child(2) {
                margin-top: 2rem;
                margin-bottom: -2rem;
            }

            &:nth-child(3) {
                margin-top: 3rem;
                margin-bottom: -3rem;
            }

            h2 {
                margin: 0;
                text-transform: capitalize;
            }
        }
    }
}
</style>