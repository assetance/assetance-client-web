<template>
  <aside class="contactSupport">
    <ul class="supportOptions">
      <li
        :class="['supportOption', isAvailable.isAvailable ? '' : 'supportOption__disabled']"
        @click="startSupport('chat')"
      >
        <span class="material-symbols-rounded">
          chat
        </span>
        <div>
          <h2>{{ $t('help.contact.live-chat') }}</h2>
          <p>{{ $t('help.contact.availability') }}</p>
        </div>
      </li>
      <li
        :class="['supportOption', isAvailable.isAvailable ? '' : 'supportOption__disabled']"
        @click="startSupport('tel')"
      >
        <span class="material-symbols-rounded">
          phone
        </span>
        <div>
          <h2>{{ $t('help.contact.phone-line') }}</h2>
          <p>{{ isAvailable.phoneNumber }}</p>
          <p>{{ $t('help.contact.availability') }}</p>
        </div>
      </li>
      <li class="optionsDivider">
        <hr>
        <span>{{ $t('help.contact.or') }}</span>
        <hr>
      </li>
      <li class="emailOption">
        <div class="informatives">
          <span class="material-symbols-rounded">
            email
          </span>
          <div>
            <h2>{{ $t('help.contact.send-mail') }}</h2>
            <p>{{ $t('help.contact.avg-reply-time', isAvailable.avgReplyTime) }}</p>
          </div>
        </div>
        <form
          class="contactForm"
          @submit.prevent="sendMail"
          novalidate
        >
          <TextInput
            ref="nameInputRef"
            :id="nameInput.id"
            v-model="name"
            class="textInput"
            :label="nameInput.label"
            :type="nameInput.type"
            :placeholder="nameInput.placeholder"
            :required="nameInput.required"
            :disabled="nameInput.disabled"
            :status="nameInput.status"
            :error-msg="nameInput.errorMsg"
          />
          <TextInput
            ref="emailInputRef"
            :id="emailInput.id"
            v-model="email"
            class="textInput"
            :label="emailInput.label"
            :type="emailInput.type"
            :placeholder="emailInput.placeholder"
            :required="emailInput.required"
            :disabled="emailInput.disabled"
            :status="emailInput.status"
            :error-msg="emailInput.errorMsg"
          />
          <TextInput
            ref="subjectInputRef"
            :id="subjectInput.id"
            v-model="subject"
            class="textInput"
            :label="subjectInput.label"
            :type="subjectInput.type"
            :placeholder="subjectInput.placeholder"
            :required="subjectInput.required"
            :disabled="subjectInput.disabled"
            :status="subjectInput.status"
            :error-msg="subjectInput.errorMsg"
          />
          <TextInput
            ref="messageInputRef"
            :id="messageInput.id"
            v-model="message"
            class="textInput"
            :label="messageInput.label"
            :type="messageInput.type"
            :placeholder="messageInput.placeholder"
            :required="messageInput.required"
            :disabled="messageInput.disabled"
            :status="messageInput.status"
            :error-msg="messageInput.errorMsg"
          />
          <PrimaryButton
            :icon="submitButtonIcon"
            :is-loading="loader"
          >
            {{ submitButton }}
          </PrimaryButton>
        </form>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import TextInput from '../microComponents/TextInput.vue';
import PrimaryButton from '../microComponents/PrimaryButton.vue';
import { useI18n } from 'vue-i18n';
import supportAPI from '@/services/supportAPI.js';

const { t } = useI18n();
const isAvailable = ref(await supportAPI.getAvailability());

/* -- contact form logic start -- */
// props feeders following the input Blueprint
/**
 * TODO:: make the inputBlueprint as a hleper function inside the input file using one of the options below
 * 1- provide & inject logic with composition API :
 * child component : 
 * provide('name_to_be_injected_by_the_parent', <function_name>);
 * parent component: 
 * const function = inject('name_provided_by_child_provide_function');
 * funtion(params) {
 *  ...
 * }
 * 2- export the utility function and access it from parent with toRef component : 
 * const childfunctions = toRef(childe-component-path (name from imports));
 * childfunctions.<exported_function>
 */
function inputBlueprint({
    label = 'input',
    id = 'testerId',
    type = 'text',
    placeholder = '',
    required = true,
    disabled = false,
    status = 'default',
    errorMsg = '',
} = {}) {
    return {
        label,
        type,
        id,
        get placeholder() {
            return placeholder ? placeholder : this.label;
        },
        required,
        disabled,
        status,
        errorMsg
    };
}
const nameInput = ref({
    ...inputBlueprint({
        label: t('global.form.name'),
        id: 'nameInput'
    }),
});
const emailInput = ref({
    ...inputBlueprint({
        label: t('global.form.email'),
        id: 'emailInput',
        type: 'email',
    }),
});
const subjectInput = ref({
    ...inputBlueprint({
        label: t('global.form.subject'),
        id: 'subjectInput',
    }),
});
const messageInput = ref({
    ...inputBlueprint({
        label: t('global.form.message'),
        id: 'messageInput',
        type: 'textarea',
    }),
});

// refs to reference the exposed input field from the child component 
const nameInputRef = ref(null);
const emailInputRef = ref(null);
const subjectInputRef = ref(null);
const messageInputRef = ref(null);

// values
// TODO:: populate values with user data when SSO is enabeld
const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const submitButton = ref(t('global.submit'));
const submitButtonIcon = ref('send');
const loader = ref(false);

function sendMail() {
    // validate
    /**
     * TODO:: use a vilidation composable/helper.
     * TODO:: view working hours dynamically instead of i18n locale translations
     * links ::: 
     * - el.validationMessage -> https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
     * - el.validity.XXXX -> https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
     * - el.validity.setCustomValidity('validation message') -> https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity
     * 
     * taken from this question:: https://stackoverflow.com/questions/46553778/how-to-detect-html-email-input-validation-with-javascript
    */

    // resetting status and error messages
    nameInput.value.status = 'defaul';
    emailInput.value.status = 'defaul';
    subjectInput.value.status = 'defaul';
    messageInput.value.status = 'defaul';
    nameInput.value.errorMsg = '';
    emailInput.value.errorMsg = '';
    subjectInput.value.errorMsg = '';
    messageInput.value.errorMsg = '';

    // validating (currently with browser rules only as of v0.2.*)
    let isValid = true;

    if (!nameInputRef.value.inputField.validity.valid) {
        nameInput.value.errorMsg = t('global.form.name-err-msg');
        nameInput.value.status = 'invalid';
        isValid = false;
    }
    if (!emailInputRef.value.inputField.validity.valid) {
        emailInput.value.errorMsg = t('global.form.email-err-msg');
        emailInput.value.status = 'invalid';
        isValid = false;
    }
    if (!subjectInputRef.value.inputField.validity.valid) {
        subjectInput.value.errorMsg = t('global.form.subject-err-msg');
        subjectInput.value.status = 'invalid';
        isValid = false;
    }
    if (!messageInputRef.value.inputField.validity.valid) {
        messageInput.value.errorMsg = t('global.form.message-err-msg');
        messageInput.value.status = 'invalid';
        isValid = false;
    }
    
    if (isValid) {
        // passed validation 
        nameInput.value.status = 'valid';
        emailInput.value.status = 'valid';
        subjectInput.value.status = 'valid';
        messageInput.value.status = 'valid';

        nameInput.value.errorMsg = '';
        emailInput.value.errorMsg = '';
        subjectInput.value.errorMsg = '';
        messageInput.value.errorMsg = '';

        // api call for sending mail
        loader.value = true;
        
        setTimeout(() => {
            loader.value = false;
            submitButtonIcon.value = '';
            submitButton.value = t('global.done');

            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';

            setTimeout(() => {
                submitButtonIcon.value = 'send';
                submitButton.value = t('global.submit');

                nameInput.value.status = 'default';
                emailInput.value.status = 'default';
                subjectInput.value.status = 'default';
                messageInput.value.status = 'default';
            }, 3000);
        }, 1000);

    }
}
/* -- contact form logic end -- */

/* -- contact options logic start -- */
function startSupport(method) {
    switch (method) {
        case 'tel':
            window.open(`tel:${isAvailable.value.phoneNumber}`);
            break;
        case 'chat':
            /**
             * TODO:: open chat floater
             */
            alert('floater should open');
            break;
    }
}
/* -- contact options logic end -- */
</script>

<style lang="scss" scoped>
aside.contactSupport {
    display: flex;
    flex-flow: column nowrap;
    width: 35%;
    min-width: 16rem;

    @media #{$mq-820-down} {
        border-inline-end: unset;
        border-bottom: 1px solid var(--dark-20);
        width: 100%;
        min-width: unset;
    }

    ul.supportOptions {
        padding: 0;
        list-style: none;

        li.supportOption {
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            border-radius: 10px;
            margin: 0.5rem;
            padding: 1rem;
            background-color: var(--dark);
            color: var(--light);
            transition-duration: 0.2s;

            &:hover {
                cursor: pointer;
                box-shadow: var(--medium-shadow);
                scale: 1.02;
            }

            &:active {
                scale: 0.98;
            }

            h2 {
                margin: 0;
                font-size: 1rem;
            }

            p {
                margin: 0;
                margin-top: 0.1rem;
                font-size: 0.7rem;
            }

            .material-symbols-rounded {
                border-radius: 6px;
                margin: 0.5rem;
                margin-inline-end: 1rem;
                margin-inline-start: 0;
                padding: 0.3rem;
                color: var(--accent);
                background-color: var(--secondary);

                html[dir="rtl"] & {
                    margin-inline-end: unset;
                    margin-inline-start: unset;
                    margin-left: 0.5rem;
                }
            }

            &__disabled {
                opacity: 0.5;

                &:hover {
                    cursor: not-allowed;
                    scale: 1;
                    box-shadow: none;
                }

                &:active {
                    scale: 1;
                }
            }
        }

        li.optionsDivider {
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;
            padding: 0 0.5rem;

            hr {
                width: 30%;
                height: 0;
            }
        }

        li.emailOption {
            display: flex;
            flex-flow: column wrap;
            border-radius: 10px;
            border: 1px solid var(--dark-20);
            margin: 0.5rem;
            overflow: hidden;
            transition-duration: 0.2s;

            &:focus {
                box-shadow: var(--medium-shadow);
            }

            .informatives {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                box-shadow: var(--larg-shadow);
                width: 100%;
                padding: 1rem;
                background-color: var(--dark);
                color: var(--light);

                h2 {
                    margin: 0;
                    font-size: 1rem;
                }

                p {
                    margin: 0;
                    margin-top: 0.1rem;
                    font-size: 0.7rem;
                }

                .material-symbols-rounded {
                    border-radius: 6px;
                    margin: 0.5rem;
                    margin-inline-end: 1rem;
                    margin-inline-start: 0;
                    padding: 0.3rem;
                    color: var(--accent);
                    background-color: var(--secondary);

                    html[dir="rtl"] & {
                        margin-inline-end: unset;
                        margin-inline-start: unset;
                        margin-left: 0.5rem;
                    }
                }
            }

            .contactForm {
                width: 100%;
                padding: 1rem;
            }

            &__disabled {
                opacity: 0.5;

                &:hover {
                    cursor: not-allowed;
                    scale: 1;
                    box-shadow: none;
                }

                &:active {
                    scale: 1;
                }
            }
        }
    }
}
</style>