import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs, EffectFade } from 'swiper/modules';

const about = new Swiper('.about__column', {
  modules: [Autoplay, Pagination],
  autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
  },
  slidesPerView: 2,
  speed: 3500,
  spaceBetween: 60,
  resistance: true,
  resistanceRatio: 0,
  loop: true,
  allowTouchMove: false,
  pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 1000,
      allowTouchMove: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    },
    768: {
      slidesPerView: 2,
      speed: 3500,
      pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
      },
    },
  }
});

// Update the .slide-num element with the active slide index
about.on('slideChange', () => {
  document.querySelector('.slide-num').textContent = `0${about.realIndex + 1}`;
});

const development = new Swiper('.development__slider', {
  slidesPerView: "auto",
  spaceBetween: 24,
  loop: true,
})


