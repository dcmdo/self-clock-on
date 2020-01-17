<template>
  <div class="about">
    <h1>{{personName}}</h1>
  </div>
</template>
<script>
import Config from '../config/config';

export default {
  name: 'about',
  data () {
    return {
      personName: Config.person_name
    }
  }
}
</script>
