<template>
  <footer class="wl">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="brand">
            <router-link to="/">
              <img src="@/assets/brand/LightBlue.png" alt="assetance brand" />
            </router-link>
            <h1>assetance</h1>
          </div>
          <p>{{ $t('global.footer.join-newsletter') }}</p>
          <label for="subscribe" class="subscribe">
            <input type="email" name="subscribe" id="subscribe" :placeholder="$t('global.email')" />
            <PrimaryButton @click="addSubscriber" :is-loading="loader">{{
              subButtonText
            }}</PrimaryButton>
          </label>
          <sub>{{ $t('global.footer.newsletter-agreement') }}
          </sub>
        </div>
        <div class="col">
          <h2>{{ $t('global.footer.quick-links') }}</h2>
          <ul>
            <li>
              <router-link to="/">{{ $t('global.footer.properties') }}</router-link>
            </li>
            <li><router-link to="/">{{ $t('global.footer.knowledge-base') }}</router-link></li>
            <li>
              <router-link to="/">{{ $t('global.footer.help-center') }}</router-link>
            </li>
            <li>
              <router-link to="/">{{ $t('global.footer.about-us') }}</router-link>
            </li>
            <li>
              <router-link to="/">{{ $t('global.footer.sing-up-or-login') }}</router-link>
            </li>
          </ul>
        </div>
        <div class="col">
          <h2><span class="material-symbols-rounded"> share </span>{{ $t('global.footer.follow-us') }}</h2>
          <ul>
            <li>
              <router-link to="/"><img src="@/assets/social/facebook-white.png" alt="facebook" />
                {{ $t('global.footer.facebook') }}</router-link>
            </li>
            <li>
              <router-link to="/"><img src="@/assets/social/twitterx-holow-white.png" alt="x" /> {{ $t('global.footer.x')
              }}</router-link>
            </li>
            <li>
              <router-link to="/"><img src="@/assets/social/instagram-white.png" alt="instagram" />
                {{ $t('global.footer.instagram') }}</router-link>
            </li>
            <li>
              <router-link to="/"><img src="@/assets/social/linkedin-white.png" alt="linkedin" />
                {{ $t('global.footer.linkedin') }}</router-link>
            </li>
            <li>
              <router-link to="/"><img src="@/assets/social/tiktok-white.png" alt="tiktok" /> {{
                $t('global.footer.tiktok') }}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <span>&copy; {{ $t('global.footer.assetance-rights-reserved') }}</span>
        <router-link to="/policies/privacy">{{ $t('global.footer.privacy-policy') }}</router-link>
        <router-link to="/policies/terms-and-conditions">{{ $t('global.footer.terms-of-service') }}</router-link>
        <router-link to="/policies/cookies">{{ $t('global.footer.cookies-policy') }}</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from './microComponents/PrimaryButton.vue';
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
footer.wl {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  padding: 1rem;
  color: var(--light);

  .container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: var(--larg-shadow);
    padding: 1rem;
    background-color: var(--dark);

    .row {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      width: 100%;

      @media #{$mq-820-down} {
        flex-flow: column nowrap;
        align-items: center;
        text-align: center;
      }

      &:nth-child(2) {
        margin-top: 0.5rem;
      }

      .col {
        display: flex;
        flex-flow: column nowrap;
        width: 30%;
        padding: 1rem;

        @media #{$mq-820-down} {
          width: 100%;
          text-align: center;
        }

        &:nth-child(1) {
          width: 50%;

          @media #{$mq-820-down} {
            width: 100%;
            text-align: center;
          }

          .brand {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;

            @media #{$mq-820-down} {
              width: 100%;
              justify-content: center;
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
              text-transform: uppercase;
            }
          }

          p {
            font-size: 0.9rem;
          }

          label.subscribe {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            border-radius: 10px;
            padding: 0.3rem;
            background-color: var(--light);

            @media #{$mq-820-down} {
              flex-flow: column nowrap;
            }

            input {
              width: 150%;
              height: 100%;
              outline: none;
              border-radius: 10px;
              border: none;
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

        &:nth-child(2) {
          margin-inline-start: 2rem;

          @media #{$mq-820-down} {
            margin-inline-start: unset;
          }

          h2 {
            margin: 0.5rem 0rem;
            font-size: 1rem;
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0.3rem 0;

            li {
              margin: 0.3rem 0;

              a {
                text-decoration: none;
                color: var(--light);
                transition-duration: 0.3s;
                font-size: 0.89rem;

                &:hover {
                  color: var(--secondary);
                }
              }
            }
          }
        }

        &:nth-child(3) {
          h2 {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            margin: 0.5rem 0rem;
            font-size: 1rem;

            @media #{$mq-820-down} {
              width: 100%;
              justify-content: center;
            }

            span {
              margin: 0rem 0.5rem;
              font-size: 1rem;
            }
          }

          ul {
            list-style: none;
            padding: 0;
            margin: 0.3rem 0;

            li {
              margin: 0.3rem 0;

              a {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                text-decoration: none;
                color: var(--light);
                transition-duration: 0.3s;
                font-size: 0.89rem;

                @media #{$mq-820-down} {
                  width: 100%;
                  justify-content: center;
                }

                &:hover {
                  color: var(--secondary);
                }

                img {
                  width: 20px;
                  object-fit: cover;
                  margin: 0rem 0.5rem;
                }
              }
            }
          }
        }
      }

      &>a {
        color: var(--light);
        font-size: 0.7rem;
        margin: 0 0.5rem;

        @media #{$mq-820-down} {
          margin: 0.5rem;
        }

        &:nth-child(2) {
          margin-inline-start: auto;

          @media #{$mq-820-down} {
            margin-inline-start: 0.5rem;
          }
        }
      }

      &>span {
        font-size: 0.7rem;

        @media #{$mq-820-down} {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
