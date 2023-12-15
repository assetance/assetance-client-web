<template>
  <div class="loader">
    <div class="img">
      <!-- <img src="@/assets/brand/DarkBlue.png" alt="Assetance Loading Website"> -->
    </div>
    <h1>Loading ...</h1>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: var(--light-70);
    width: 100%;
    height: 100%;
    color: var(--primary);
    z-index: 5000;

    .img {
        position: relative;
        padding: 0.5rem;
        padding-top: 0.6rem;
        border-radius: 50%;
        animation: pulse 0.8s ease-out infinite;

        img {
            width: 4rem;
            object-fit: cover;
        }
    }

    h1 {
        font-size: 2rem;
    }
}

@keyframes pulse {
    50% {
        box-shadow: 0 0 0 0.3em var(--primary-40);
    }

    100% {
        box-shadow: 0 0 0 0.6em var(--primary-5);
    }
}
</style>