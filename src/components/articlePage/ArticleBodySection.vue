<template>
  <!-- article body -->
  <section
    class="articleBody"
    v-html="articleContent"
  />
</template>

<script setup>
import { ref } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// props
const props = defineProps({
    articleBody: {
        type: String,
        required: true
    }
});
// prop modifiers
const bodyBeforSanatizing = marked.parse(props.articleBody);
const articleContent = ref(DOMPurify.sanitize(bodyBeforSanatizing));
</script>

<!-- not scoped -->
<style lang="scss">
section.articleBody {
    margin: 0 10%;
    
    @media #{$mq-820-down} {
        margin: unset;
    }

    h1 {
        font-size: 1.8rem;
    }
    h2 {
        font-size: 1.5rem;
    }
    h3 {
        font-size: 1.2rem;
    }
    h4 {
        font-size: 1rem;
    }

    img {
        max-width: 85%;
        border-radius: 10px;

        @media #{$mq-820-down} {
            max-width: 100%;
        }
    }

    p:has(> img) {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    a {
        text-decoration: none;
    }
    
    blockquote {
        margin: 0.5rem;
        border-left: 2px solid var(--dark-20);
        padding-inline-start: 1rem;
    }
}
</style>