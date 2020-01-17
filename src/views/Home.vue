<template>
  <div class="home">
    <LoginPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginPage from 'components/Login.vue'

export default {
  name: 'home',
  components: {
    LoginPage
  }
}
</script>
