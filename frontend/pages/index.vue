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
        messages: {{ messages }}
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

export default {
  data () {
    return {
      messages: []
    }
  },
  apollo: {
    $subscribe: {
      newMessage: {
        query: gql`subscription {
  newMessage {
    text
    title
  }
}`,
        result ({ data }) {
          this.messages.push(data)
        },
      }
    }
  }
}
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
