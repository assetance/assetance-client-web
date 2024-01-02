<template>
  <div :class="['navContainer', isExpanded || localizer || burgerOn ? 'navContainer__expand' : '']">
    <nav class="wl">
      <div
        :class="[
          'topBar',
          isExpanded ? 'topBar__expand' : '',
          localizer ? 'topBar__expand' : '',
          burgerOn ? 'topBar__burgerOn' : '',
        ]"
      >
        <div class="brand">
          <router-link to="/">
            <img
              src="@/assets/brand/DarkBlue.png"
              alt="Welcome to Assetance"
            >
          </router-link>
          <h1>ASSETANCE</h1>
          <!-- mobile burger menu -->
          <label
            class="bar"
            for="burgerCheck"
            @clickout="burgerOn = false"
          >
            <input
              type="checkbox"
              id="burgerCheck"
              v-model="burgerOn"
            >

            <span class="top" />
            <span class="middle" />
            <span class="bottom" />
          </label>
        </div>

        <menu :class="[burgerOn ? 'burgerOn' : '']">
          <li>
            <router-link to="#">
              {{ $t('global.nav.properties') }}
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              {{ $t('global.nav.about') }}
            </router-link>
          </li>
          <li>
            <button
              class="expandMoreOption"
              @click="
                isExpanded = !isExpanded;
                localizer = false;
              "
            >
              {{ $t('global.nav.more') }}
            </button>
          </li>
        </menu>

        <div :class="['buttons', burgerOn ? 'buttons__burgerOn' : '']">
          <button
            :class="['localizerButton', localizer ? 'localizerOn' : '']"
            @click="
              localizer = !localizer;
              isExpanded = false;
            "
          >
            <span class="material-symbols-rounded"> language </span>
          </button>
          <secondary-button
            icon="login"
            class="button"
            v-if="!userData"
          >
            {{ $t('global.login') }}
          </secondary-button>
          <primary-button
            icon="person_add"
            class="button"
            v-if="!userData"
          >
            {{ $t('global.sign-up') }}
          </primary-button>
          <primary-button
            icon="dashboard"
            class="button"
            v-if="userData"
          >
            {{ $t('global.dashboard') }}
          </primary-button>
        </div>
      </div>
      <!-- More Links dropdown-->
      <div
        :class="['expandedView', isExpanded ? 'expandedView__expand' : '']"
        @clickout="isExpanded = false"
      >
        <button @click="isExpanded = false">
          <span class="material-symbols-rounded"> close </span>
        </button>
        <div class="links">
          <div class="linksGroup">
            <router-link to="/knowledge">
              {{ $t('global.nav.knowledge-center') }}
              <span class="material-symbols-rounded"> open_in_new </span>
            </router-link>
            <menu>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.how-it-works') }}
                  </router-link>
                  <p>{{ $t('global.nav.how-it-works-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.investments-options') }}
                  </router-link>
                  <p>{{ $t('global.nav.investments-options-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.risk-management') }}
                  </router-link>
                  <p>{{ $t('global.nav.risk-management-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.referral-program') }}
                  </router-link>
                  <p>{{ $t('global.nav.referral-program-description') }}</p>
                </div>
              </li>
            </menu>
          </div>
          <div class="linksGroup">
            <router-link to="/help">
              {{ $t('global.nav.help-center') }}
              <span class="material-symbols-rounded"> open_in_new </span>
            </router-link>
            <menu>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.faq') }}
                  </router-link>
                  <p>{{ $t('global.nav.faq-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.feedback') }}
                  </router-link>
                  <p>{{ $t('global.nav.feedback-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.partnerships') }}
                  </router-link>
                  <p>{{ $t('global.nav.partnerships-description') }}</p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded"> radio_button_checked </span>
                <div>
                  <router-link to="#">
                    {{ $t('global.nav.support') }}
                  </router-link>
                  <p>{{ $t('global.nav.support-description') }}</p>
                </div>
              </li>
            </menu>
          </div>
        </div>
        <div class="featuredArticles">
          <p>{{ $t('global.nav.knowledge-center-plugin') }}</p>
          <ul>
            <li
              class="article"
              v-for="article in articles.slice(0, 2)"
              :key="article.id"
            >
              <ArticleCard 
                orientation="horizontal"
              />
            </li>
          </ul>
          <router-link
            to="#"
            class="cta"
          >
            {{ $t('global.view-all') }}
            <span class="material-symbols-rounded"> chevron_right </span>
          </router-link>
        </div>
      </div>
      <!-- locales preferences dropdown-->
      <div
        :class="['localizer', localizer ? 'localizer__expand' : '']"
        @clickout="localizer = false"
      >
        <button @click="localizer = false">
          <span class="material-symbols-rounded"> close </span>
        </button>
        <select-element
          :default-selection="selectedLanguage"
          notice="Language"
          :list="supportedLanguages.slugs"
          @selection="(pref) => {
            updatePrefLang(pref);
          }
          "
        >
          {{ $t('global.nav.selection-language')
          }}
        </select-element>
        <select-element
          :default-selection="selectedCurrency"
          notice="Currency"
          :list="supportedCurrenciesFormatted"
          @selection="(pref) => {
            updatePrefCurr(pref);
          }
          "
        >
          {{ $t('global.nav.selection-currency') }}
        </select-element>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import PrimaryButton from './microComponents/PrimaryButton.vue';
import SecondaryButton from './microComponents/SecondaryButton.vue';
import SelectElement from './microComponents/SelectElement.vue';
import knowledgeAPI from '@/services/knowledgeAPI.js';
import { useStore } from 'vuex';
import Tr from '@/localizer/helper.js';
import { useI18n } from 'vue-i18n';
import ArticleCard from './macroComponents/articles/ArticleCard.vue'

const { locale } = useI18n();
const store = useStore();
const isExpanded = ref(false);
const localizer = ref(false);
const selectedLanguage = computed(() => { return Tr.getLang('id', store.getters.getUserLocaleLanguage()).split('-')[1] });
const selectedCurrency = computed(() => { return Tr.getCurr('id', store.getters.getUserLocaleCurrency()); });
const supportedLanguages = ref(Tr.supportedLanguages());
const supportedCurrencies = ref(Tr.supportedCurrencies());
const supportedCurrenciesFormatted = computed(() => {
  return supportedCurrencies.value.ids.map((element, index) => {
    return element + ' - ' + supportedCurrencies.value.slugs[index];
  });
});
const articles = ref(await knowledgeAPI.getRandArticles(2));
const userData = ref(false); // TODO:: connecting SSO functionality
const burgerOn = ref(false);

// getting user data if any
// userData.value = store.getters.getAllUserData()
//   ? store.getters.getAllUserData()
//   : false;

async function updatePrefLang(lang) {
  // saving changes
  let langId = Tr.getLang('slug', lang).split('-')[0];

  if (Tr.needLanguageReload(langId)) {
    localStorage.setItem('userPrefLanguage', langId);
    location.reload();
  } else {
    await Tr.loadLocale(langId);
    locale.value = langId;

    document.documentElement.setAttribute('lang', langId);
    store.dispatch('setUserPrefLanguage', langId);
  }

}
async function updatePrefCurr(currency) {
  // saving changes
  let currId = currency.slice(0, 3);
  store.dispatch('setUserPrefCurrency', currId);
  store.dispatch('updateRates');
}
</script>

<style lang="scss" scoped>
.navContainer {
  position: fixed;
  top: 0px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  align-self: center;
  width: 100%;
  box-shadow: var(--primary-larg-shadow);
  background-color: var(--light-90);
  transition-duration: 1s;

  &__expand {
    box-shadow: unset;
  }

  nav.wl {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    align-self: center;
    width: 100%;

    .topBar {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      border-radius: 0px 0px 10px 10px;
      padding: 0.5rem 0.5rem;
      width: 100%;
      transition-duration: 0.1s;

      @media #{$mq-820-down} {
        flex-flow: column nowrap;
        background-color: var(--light);
      }

      &__expand {
        border-radius: 0px;
        border-bottom: 1.5px solid var(--primary-20);
      }

      &__burgerOn {
        box-shadow: var(--larg-shadow);
      }

      .brand {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        @media #{$mq-820-down} {
          width: 100%;
        }

        a {
          display: flex;

          img {
            width: 32px;
            height: 32px;
          }
        }

        h1 {
          margin: 0 0.5rem;
          font-style: italic;
          font-size: larger;
        }

        .bar {
          display: none;
          position: relative;
          margin-inline-start: auto;
          width: 24px;
          height: 24px;
          cursor: pointer;

          @media #{$mq-820-down} {
            display: block;
          }

          input[type='checkbox'] {
            -webkit-appearance: none;
            display: none;
            visibility: hidden;
          }

          span {
            position: absolute;
            width: 24px;
            height: 4px;
            background: var(--dark);
            border-radius: 100px;
            display: inline-block;
            transition-duration: 0.3s;
            left: 0;

            @media #{$mq-480-down} {
              transition-duration: unset;
            }
          }

          span.top {
            top: 0;
          }

          span.middle {
            top: 10px;
          }

          span.bottom {
            bottom: 0;
          }

          input[type]:checked~span.top {
            transform: rotate(45deg);
            transform-origin: top left;
            width: 30px;
            left: 3px;
          }

          input[type]:checked~span.bottom {
            transform: rotate(-45deg);
            transform-origin: top left;
            width: 30px;
            bottom: -1px;
          }

          input[type]:checked~span.middle {
            transform: translateX(-20px);
            opacity: 0;
          }
        }
      }

      menu {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin: 0;
        width: fit-content;
        list-style: none;
        transition-duration: 0.2s;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
          padding: 0;
          max-height: 0px;
          overflow: hidden;

          &.burgerOn {
            max-height: 200px;
          }
        }

        &>* {
          margin: 0.5rem;
        }

        a {
          text-decoration: none;
          color: var(--dark);
          transition-duration: 0.2s;

          &:hover {
            color: var(--accent);
          }
        }

        li button.expandMoreOption {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          border: none;
          background-color: transparent;
          transition-duration: 0.2s;
          font-size: 1rem;

          &:hover {
            cursor: pointer;
            color: var(--accent);
          }
        }
      }

      .buttons {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-inline-start: auto;
        max-width: 264px;
        width: 100%;
        transition-duration: 0.2s;

        @media #{$mq-820-down} {
          flex-flow: column nowrap;
          margin: 0;
          max-height: 0px;
          overflow: hidden;

          &__burgerOn {
            max-height: 300px;
            overflow: unset;
          }
        }

        &>* {
          margin: 0.25rem 0.25rem;
        }

        button.localizerButton {
          border: none;
          color: var(--dark);
          background-color: transparent;

          &:hover {
            cursor: pointer;
          }
        }

        button.localizerOn {
          color: var(--accent);
        }
      }
    }

    .expandedView {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      box-shadow: var(--medium-shadow);
      border-radius: 0px 0px 10px 10px;
      max-height: 0px;
      width: 100%;
      overflow: hidden;
      height: fit-content;
      transition-duration: 0.2s;
      background-color: var(--light);

      @media #{$mq-820-down} {
        flex-flow: column nowrap;
        overflow-y: scroll;
      }

      &__expand {
        max-height: 375px;
      }

      &>button {
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        border: none;
        background-color: transparent;

        html[dir='rtl'] & {
          left: unset;
          right: 0.3rem;
        }

        &:hover {
          color: var(--accent);
          cursor: pointer;
        }
      }

      .links {
        display: flex;
        flex-flow: row nowrap;
        padding: 2rem 1rem 1rem 1rem;

        @media #{$mq-820-down} {
          flex-flow: row wrap;
          justify-content: center;
        }

        .linksGroup {
          display: flex;
          flex-flow: column nowrap;
          margin: 0rem 1rem;

          @media #{$mq-820-down} {
            max-width: 238px;
          }

          a {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            text-decoration: none;
            color: var(--dark);
            transition-duration: 0.1s;

            &:hover {
              color: var(--accent);
            }

            span {
              margin: 0 0.5rem;
              font-size: 18px;
            }
          }

          menu {
            display: flex;
            flex-flow: column nowrap;
            padding: 0;
            list-style: none;

            li {
              display: flex;
              flex-flow: row nowrap;
              margin: 0.5rem 0rem;

              span {
                margin: 0rem 0.5rem;
                font-size: 18px;
              }

              a {
                font-size: 1rem;
                font-weight: var(--medium-text);
              }

              p {
                margin: 0;
                font-size: 0.8rem;
              }
            }
          }
        }
      }

      .featuredArticles {
        flex-grow: 1;
        flex-shrink: 0;
        width: 33%;
        padding: 1rem;
        background-color: var(--dark);
        color: var(--light);
        overflow-y: scroll;

        @media #{$mq-820-down} {
          width: 100%;
          overflow-y: unset;;
        }
        ul {
          padding: 0;

          li.article {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-content: center;
            margin: 0rem;

            @media #{$mq-365-down} {
              flex-flow: column nowrap;
            }
            
            a {
              margin: 0.3rem 0;
            }
          }
        }

        a.cta{
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          text-decoration: none;
          color: var(--light);
          transition-duration: 0.1s;
        }
      }
    }

    .localizer {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      width: 100%;
      box-shadow: var(--medium-shadow);
      border-radius: 0px 0px 10px 10px;
      max-height: 0px;
      height: fit-content;
      transition-duration: 0.2s;
      background-color: var(--light);
      overflow: hidden;

      @media #{$mq-480-down} {
        flex-flow: column nowrap;
      }

      &__expand {
        padding: 2rem 0.5rem;
        max-height: 300px;
        overflow: unset;
      }

      &>* {
        margin: 0rem 0.5rem;

        @media #{$mq-480-down} {
          margin: 0.5rem 0rem;
        }
      }

      & span.selectIcon {
        font-size: 1rem;
        padding: 0 0.5rem;
      }

      &>button {
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
        border: none;
        background-color: transparent;

        html[dir='rtl'] & {
          left: unset;
          right: 0.3rem;
        }

        &:hover {
          color: var(--accent);
          cursor: pointer;
        }
      }

      .saveButton {
        max-width: 80px;
        width: 100%;
      }
    }
  }
}
</style>
