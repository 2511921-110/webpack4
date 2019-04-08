import '../scss/style.scss';
import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'
import "@babel/polyfill"

console.log('bundle.jsのみでCSSも読み込むよ.なんでやねん')

window.Vue = require('vue');

//vue file
import twitter from './twitter.vue'

if (document.getElementById('twitter')) {
new Vue({
  el: '#twitter',
  components: {twitter},
  template : '<twitter>'
})
}
if (document.getElementById('Posts')) {
  const postsInstance = new Vue({
    el: "#Posts",
    data() {
      return {
        posts: [],
      }
    },
    mounted(){
      axios(BASEURL+'posts')
      .then( (res) =>{
        this.posts = res.data
        // console.log(res.data)
      })
    },
  })
}