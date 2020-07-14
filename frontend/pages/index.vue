<template>
  <div class="container">
    <div>
      <Logo/>
      <h1 class="title">
        frontend
      </h1>
      <div>
        static: {{ helloStatic }}<br>
        dynamic: {{ helloDynamic }}<br>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';

export default Vue.extend({
  apollo: {
    // Simple query that will update the 'hello' vue property
    helloDynamic: {
      query: gql`{bye: helloTwo}`,
      update: data => data,
      pollInterval: 3000
    },
    helloStatic: {
      query: gql`{hello}`,
      update: data => data
    },
  }
});
</script>

<style>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: 'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }
</style>
