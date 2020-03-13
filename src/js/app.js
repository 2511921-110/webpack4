import '../scss/bootstrap-grid.scss';
import '../scss/crtcal.scss';
import '../style.css';
import Vue from 'vue/dist/vue.esm.js'
import axios from 'axios'
import "@babel/polyfill"
import SweetScroll from "sweet-scroll"
// import VanillaModal from 'vanilla-modal'
// import lazySizes from 'lazysizes'

// console.log('bundle.jsのみでCSSも読み込むよ.なんでやねん')

window.Vue = require('vue');
// lazySizes.init();

if(document.getElementsByClassName('modal')[0]){
const modal = new VanillaModal(
// {
//   open: '.my-open-class',
//   close: '.my-close-class'
// }
);
};

//smooth scroll
const sweetScroll = new SweetScroll({
  trigger: "a[href^='#']"
});

if (document.getElementById('Nav')) {
  // const postsInstance = new Vue({
  //   el: "#Posts",
  //   data() {
  //     return {
  //       posts: [],
  //     }
  //   },
  //   mounted(){
  //     axios(BASEURL+'posts')
  //     .then( (res) =>{
  //       this.posts = res.data
  //       // console.log(res.data)
  //     })
  //   },
  // })
}

const nav_el = document.querySelector('.nav__btn');
nav_el.addEventListener("click",()=> {
  // console.log("クリックされたぞなもし")
  if(document.querySelector('.navstate') === null ){
    // console.log("固定すんぞ")
    document.querySelector('.nav').classList.add('navstate')
    document.querySelector('.nav').classList.remove('nav__close')
  }else{
    // console.log("固定解除じゃ")
    document.querySelector('.nav').classList.add('nav__close')
    document.querySelector('.nav').classList.remove('navstate')
    setTimeout( function(){
      document.querySelector('.nav').classList.remove('nav__close')
    }, 5000 );
  }
}, false)


// var controls = document.querySelectorAll('.nav .menu-item-has-children');
// for (var i = 0; i < controls.length; i++) {
//   controls[i].addEventListener('click', btnClick, false);
// }

// function btnClick() {
//   if(this.classList.contains('subnav_state')) {
//     this.classList.remove('subnav_state');
//     this.style.height = '';
//   } else {
//     this.classList.toggle('subnav_state');
//     this.style.transition = 'none';
//     this.style.height = 'auto';
//     const contentHeight = this.getBoundingClientRect().height;
//     this.style.height = '';
//     this.style.transition = '';
//     setTimeout(() => {
//       this.style.height = `${contentHeight}px`;
//       this.classList.add('subnav_state');
//     }, 30);
//   }
// }


// const sot = document.querySelector('.sot');
// window.addEventListener('scroll', ()=> {
//   const windowHight = window.parent.screen.height;
//   if(window.pageYOffset > windowHight){
//     sot.style.opacity = '1';
//   }else if(window.pageYOffset < windowHight){
//     sot.style.opacity = '0';
//   }
// });