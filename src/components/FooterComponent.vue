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
          <p>
            Join our newsletter to stay up to date on features and releases.
          </p>
          <label for="subscribe" class="subscribe">
            <input
              type="email"
              name="subscribe"
              id="subscribe"
              placeholder="Email" />
            <PrimaryButton @click="addSubscriber" :is-loading="loader">{{
              subButtonText
            }}</PrimaryButton>
          </label>
          <sub
            >By subscribing you agree to our Privacy Policy and provide consent
            to receive updates from our company.
          </sub>
        </div>
        <div class="col">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <router-link to="/">Properties</router-link>
            </li>
            <li><router-link to="/">Knowledge Base</router-link></li>
            <li>
              <router-link to="/">Help Center</router-link>
            </li>
            <li>
              <router-link to="/">About Us</router-link>
            </li>
            <li>
              <router-link to="/">Sign Up / Login</router-link>
            </li>
          </ul>
        </div>
        <div class="col">
          <h2>
            <span class="material-symbols-rounded"> share </span>Follow Us
          </h2>
          <ul>
            <li>
              <router-link to="/"
                ><img src="@/assets/social/facebook-white.png" alt="facebook" />
                Facebook</router-link
              >
            </li>
            <li>
              <router-link to="/"
                ><img src="@/assets/social/twitterx-holow-white.png" alt="x" />
                X</router-link
              >
            </li>
            <li>
              <router-link to="/"
                ><img
                  src="@/assets/social/instagram-white.png"
                  alt="instagram" />
                Instagram</router-link
              >
            </li>
            <li>
              <router-link to="/"
                ><img src="@/assets/social/linkedin-white.png" alt="linkedin" />
                LinkedIn</router-link
              >
            </li>
            <li>
              <router-link to="/"
                ><img src="@/assets/social/tiktok-white.png" alt="tiktok" />
                TikTok</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <span>&copy; 2023 Assetance. All rights reserved.</span>
        <router-link to="/">Privacy Policy</router-link>
        <router-link to="/">Terms of Service</router-link>
        <router-link to="/">Cookies Settings</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import PrimaryButton from './microComponents/PrimaryButton.vue';

const loader = ref(false);
const subButtonText = ref('Subscribe');
function addSubscriber() {
  // call the add subscriper api
  loader.value = true;
  setTimeout(() => {
    loader.value = false;
    subButtonText.value = 'DONE';
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
    flex-flow: row nowrap;
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
              margin-inline-end: 0.3rem;
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
                  margin-inline-end: 0.2rem;
                }
              }
            }
          }
        }
      }

      & > a {
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
      & > span {
        font-size: 0.7rem;

        @media #{$mq-820-down} {
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>
