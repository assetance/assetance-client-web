<template>
  <div class="propertyCard">
    <!-- image, tags, and metrics -->
    <div class="visuals">
      <div class="img loadingShader" />
      <div class="chips loadingShader">
        <!-- category -->
      </div>
      <div class="sliderContainer loadingShader" />
    </div>
    <!-- info -->
    <div class="informatives">
      <!-- property info -->
      <div class="propertyInfo">
        <div class="REFNAQS loadingShader" />
        <div class="name loadingShader" />
        <div class="location loadingShader" />
        <div class="price loadingShader" />
      </div>
      <!-- calc snippet (if enabled) TODO v1-->
      <!-- funding info -->
      <div class="fundingProgress loadingShader" />
    </div>
    <!-- CTA -->
    <div class="btns" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .propertyCard {
    display: flex;
    flex-flow: column nowrap;
    box-shadow: var(--medium-shadow);
    border: 1px solid var(--dark-20);
    border-radius: 10px;
    margin: 1rem 0.5rem;
    flex: 1 1 30%;
    max-width: 420px;
    min-width: 280px;
    padding: 0.5rem;
    background-color: var(--white);
    overflow: hidden;
    
    
    @media #{$mq-820-down} {
      max-width: unset;
      min-width: 220;
      width: 100%;
    }
    @media #{$mq-480-down} {
      max-width: unset;
      min-width: 150;
      width: 100%;
    }

    .visuals {
      position: relative;
      display: flex;
      flex-flow: column nowrap;

      .img {
        width: 100%;
        height: 202px;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
      }

      .chips {
        position: absolute;
        bottom: 0.5rem;
        left: 0.5rem;
        right: 0.5rem;
        height: 1rem;
      }

      .sliderContainer {
        position: absolute;
        top: 0.3rem;
        left: 0.5rem;
        right: 0.5rem;
        height: 1.2rem;
      }

    }

    .informatives {
      display: flex;
      flex-flow: column nowrap;
      margin: 0.5rem 0;
      margin-bottom: 0;
      
      .propertyInfo {
        display: flex;
        flex-flow: column nowrap;
        border: 1px solid var(--dark-20);
        border-radius: 10px;
        padding: 0.5rem;
        background-color: var(--primary-5);
        text-align: start;
        
        .REFNAQS {
          height: 1rem;
        }
  
        .name {
          margin: 0.2rem 0;
          height: 2rem;
        }
  
        .location {
            height: 1rem;
            margin-bottom: 0.5rem;
        }
  
        .price {
          height: 2rem;
        }
      }
    }

    .fundingProgress {
      position: relative;
      margin: 0.5rem 0;
      border: 1px solid var(--dark-20);
      border-radius: 5px;
      width: 100%;
      height: 1.1rem;
      background-color: var(--secondary);
    }

    .btns {
        height: 2rem;
        border-radius: 10px;
        background-color: var(--dark-20);
    }   
  }
</style>