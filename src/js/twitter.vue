<template>
  <div class="twitter-widget"
    style="width:400px;">
    <v-timeline
      :id="twitterId"
      :source-type="'profile'"
      :options="{ 'height': twitterHeight }" />
  </div>
</template>

<script>
import Timeline from 'vue-tweet-embed/dist/timeline'

export default{
  components: {
    'v-timeline': Timeline,
  },
  data() {
    return {
      twitterId: 'pont_i_w',
      twitterHeight: '400',
    }
  },
}
</script>