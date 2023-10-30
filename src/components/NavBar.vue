<template>
  <div
    :class="[
      'navContainer',
      isExpanded || localizer || burgerOn ? 'navContainer__expand' : '',
    ]">
    <nav class="wl">
      <div
        :class="[
          'topBar',
          isExpanded ? 'topBar__expand' : '',
          localizer ? 'topBar__expand' : '',
          burgerOn ? 'topBar__burgerOn' : '',
        ]">
        <div class="brand">
          <router-link to="/"
            ><img src="@/assets/brand/DarkBlue.png" alt="Welcome to Assetance"
          /></router-link>
          <h1>ASSETANCE</h1>
          <!-- mobile burger menu -->
          <label class="bar" for="burgerCheck" @clickout="burgerOn = false">
            <input type="checkbox" id="burgerCheck" v-model="burgerOn" />

            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
          </label>
        </div>

        <menu :class="[burgerOn ? 'burgerOn' : '']">
          <li><router-link to="#">Properties</router-link></li>
          <li><router-link to="/about">About us</router-link></li>
          <li>
            <button
              class="expandMoreOption"
              @click="
                isExpanded = !isExpanded;
                localizer = false;
              ">
              More
            </button>
          </li>
        </menu>

        <div :class="['buttons', burgerOn ? 'buttons__burgerOn' : '']">
          <button
            :class="['localizerButton', localizer ? 'localizerOn' : '']"
            @click="
              localizer = !localizer;
              isExpanded = false;
            ">
            <span class="material-symbols-rounded"> language </span>
          </button>
          <secondary-button icon="login" class="button" v-if="!userData"
            >Login</secondary-button
          >
          <primary-button icon="person_add" class="button" v-if="!userData"
            >Sign Up</primary-button
          >
          <primary-button icon="dashboard" class="button" v-if="userData"
            >Dashboard</primary-button
          >
        </div>
      </div>
      <!-- More Links dropdown-->
      <div
        :class="['expandedView', isExpanded ? 'expandedView__expand' : '']"
        @clickout="isExpanded = false">
        <button @click="isExpanded = false">
          <span class="material-symbols-rounded"> close </span>
        </button>
        <div class="links">
          <div class="linksGroup">
            <router-link to="#"
              >Knowledge Center
              <span class="material-symbols-rounded">
                open_in_new
              </span></router-link
            >
            <menu>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">عنوان اللينك</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
            </menu>
          </div>
          <div class="linksGroup">
            <router-link to="#"
              >Knowledge Center
              <span class="material-symbols-rounded">
                open_in_new
              </span></router-link
            >
            <menu>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
              <li>
                <span class="material-symbols-rounded">
                  radio_button_checked
                </span>
                <div>
                  <router-link to="#">Link Title</router-link>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </li>
            </menu>
          </div>
        </div>
        <div class="featuredArticles">
          <p>Featured from Knowledge center</p>
          <ul>
            <li
              class="article"
              v-for="(article, index) in articles"
              :key="article.id">
              <img :src="article.image" :alt="'article ' + index + 'image'" />
              <article class="articleInfo">
                <p class="articleTitle">{{ article.title }}</p>
                <p class="artivleText">
                  {{ article.summary }}
                </p>
                <router-link :to="'article/' + article.id"
                  >Read more</router-link
                >
              </article>
            </li>
          </ul>
          <router-link to="articles"
            >See all articles
            <span class="material-symbols-rounded"> chevron_right </span>
          </router-link>
        </div>
      </div>
      <!-- locales preferences dropdown-->
      <div
        :class="['localizer', localizer ? 'localizer__expand' : '']"
        @clickout="localizer = false">
        <button @click="localizer = false">
          <span class="material-symbols-rounded"> close </span>
        </button>
        <select-element
          :defaultSelection="selectedLanguage"
          notice="Language"
          :list="supportedLanguages"
          @selection="
            (pref) => {
              selectedLanguage = pref;
              savePreferences();
            }
          "
          ><span class="material-symbols-rounded selectIcon"> translate </span
          >Language</select-element
        >
        <select-element
          :defaultSelection="selectedCurrency"
          notice="Currency"
          :list="supportedCurrencies"
          @selection="
            (pref) => {
              selectedCurrency = pref;
              savePreferences();
            }
          "
          ><bdi>
            <span class="material-symbols-rounded selectIcon iconLtr">
              attach_money
            </span>
          </bdi>
          Currency
        </select-element>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from './microComponents/PrimaryButton.vue';
import SecondaryButton from './microComponents/SecondaryButton.vue';
import SelectElement from './microComponents/SelectElement.vue';
import localsRequest from '@/services/localsRequest.js';
import articlesAPI from '@/services/articlesAPI.js';
import { useStore } from 'vuex';

const store = useStore();
const isExpanded = ref(false);
const localizer = ref(false);
const selectedLanguage = ref(store.getters.getUserLocaleLanguage());
const selectedCurrency = ref(store.getters.getUserLocaleCurrency());
const supportedLanguages = ref(await localsRequest.getSupportedLanguages()); //TODO:: should be dynamically loaded if locales options clicked
const supportedCurrencies = ref(await localsRequest.getSupportedCurrencies()); //TODO:: should be dynamically loaded if locales options clicked
const articles = ref(await articlesAPI.getRand());
const userData = ref(false); // TODO:: connecting SSO functionality
const burgerOn = ref(false);

// getting user data if any
// userData.value = store.getters.getAllUserData()
//   ? store.getters.getAllUserData()
//   : false;

async function savePreferences() {
  // save preferences and update page
  console.log('updating preferences to::');
  console.log('lang: ', selectedLanguage.value);
  console.log('curr: ', selectedCurrency.value);
  // saving changes
  store.dispatch('setUserPrefLanguage', selectedLanguage.value);
  store.dispatch('setuserPrefCurrency', selectedCurrency.value);
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
          input[type]:checked ~ span.top {
            transform: rotate(45deg);
            transform-origin: top left;
            width: 30px;
            left: 3px;
          }

          input[type]:checked ~ span.bottom {
            transform: rotate(-45deg);
            transform-origin: top left;
            width: 30px;
            bottom: -1px;
          }

          input[type]:checked ~ span.middle {
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

        & > * {
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

        & > * {
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

      & > button {
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
        padding: 1rem;
        background-color: var(--dark);
        color: var(--light);

        ul {
          padding: 0;

          li.article {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-content: center;
            margin: 0.5rem 0rem;
            padding: 0.5rem;
            background-color: var(--light-20);
            border-radius: 10px;
            @media #{$mq-365-down} {
              flex-flow: column nowrap;
            }
            img {
              width: 100px;
              height: 100px;
              border-radius: 10px;

              @media #{$mq-365-down} {
                width: auto;
                height: auto;
              }
            }
            .articleInfo {
              margin: 0rem 0.5rem;
              width: 100%;
              @media #{$mq-365-down} {
                margin: 0.5rem 0rem;
              }
              p.articleTitle {
                margin: 0rem;
                margin-bottom: 0.5rem;
              }

              p.artivleText {
                margin: 0rem;
                margin-bottom: 0.5rem;
                font-size: 0.8rem;
              }

              a {
                font-size: 0.8rem;
                text-decoration: underline;
              }
            }
          }
        }
        a {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          color: var(--light);
          text-decoration: none;
          transition-duration: 0.1s;

          &:hover {
            color: var(--accent);
          }
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
      & > * {
        margin: 0rem 0.5rem;
        @media #{$mq-480-down} {
          margin: 0.5rem 0rem;
        }
      }

      & span.selectIcon {
        font-size: 1rem;
        padding: 0 0.5rem;
      }
      & > button {
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
