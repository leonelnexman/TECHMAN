import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs, EffectFade } from 'swiper/modules';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let about;

function initAboutSlider() {
  if (window.innerWidth < 962 && !about) {
    about = new Swiper('.about__column', {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 1000,
      allowTouchMove: true,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });
  } else if (window.innerWidth >= 962 && about) {
    about.destroy(true, true); // Отключаем слайдер при большом разрешении
    about = null;
  }
}

// Инициализируем слайдер при загрузке страницы и при изменении размера окна
initAboutSlider();
window.addEventListener('resize', initAboutSlider);


const development = new Swiper('.development__slider', {
  slidesPerView: "auto",
  spaceBetween: 0,
  loop: true,
  breakpoints: {
    300: {
      spaceBetween: 24,
    },
    968: {
      spaceBetween: 0,
    },
  },
})

gsap.registerPlugin(ScrollTrigger);



const isMobile = window.matchMedia("(max-width: 962px)").matches;

if (!isMobile) {

  const scrollPercentage = 0.33;
  const progressLine = document.querySelector(".progress-line");
  let scrollStep = 0;
  let isScrolling = false;

  function updateProgressLine() {
    const progress = (scrollStep + 1) * 33.33;
    progressLine.style.height = `${progress}%`;
  }

  function scrollInnerElement(event) {
    if (isScrolling) return;

    const innerElement = document.querySelector(".about__column-wrapper");
    if (innerElement) {
      const scrollAmount = innerElement.scrollHeight * scrollPercentage;
      isScrolling = true;

      if (event.deltaY > 0) {
        if (scrollStep < 2) {
          scrollStep += 1;
          gsap.to(innerElement, { 
            scrollTop: scrollStep * scrollAmount,
            duration: 0.5, // Увеличиваем продолжительность анимации для плавности
            ease: "power2.out", // Используем более плавный easing
            onComplete: () => { isScrolling = false; }
          });
          updateProgressLine();
        } else {
          window.scrollBy(0, scrollAmount);
          isScrolling = false;
        }
      } 
      else if (event.deltaY < 0) {
        if (scrollStep > 0) {
          scrollStep -= 1;
          gsap.to(innerElement, { 
            scrollTop: scrollStep * scrollAmount,
            duration: 0.5, // Увеличиваем продолжительность анимации для плавности
            ease: "power2.out",
            onComplete: () => { isScrolling = false; }
          });
          updateProgressLine();
        } else {
          window.scrollBy(0, -scrollAmount);
          isScrolling = false;
        }
      }

      event.preventDefault();
    }
  }

  const enableInnerScroll = () => {
    window.addEventListener("wheel", scrollInnerElement);
  };

  const disableInnerScroll = () => {
    window.removeEventListener("wheel", scrollInnerElement);
  };

  ScrollTrigger.create({
    trigger: ".about",
    start: "top +30%",
    end: () => `+=${document.querySelector(".about__column-wrapper").scrollHeight}`,
    pin: true,
    scrub: true,
    onEnter: enableInnerScroll,
    onLeave: disableInnerScroll,
    onEnterBack: enableInnerScroll,
    onLeaveBack: disableInnerScroll,
  });
}





