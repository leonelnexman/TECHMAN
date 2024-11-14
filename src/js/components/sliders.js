import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, FreeMode, Thumbs, EffectFade } from 'swiper/modules';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let about;

function initAboutSlider() {
  const aboutColumn = document.querySelector('.about__column');
  const paginationElement = document.querySelector('.swiper-pagination');

  if (window.innerWidth < 962 && !about && aboutColumn && paginationElement) {
    about = new Swiper(aboutColumn, {
      modules: [Autoplay, Pagination],
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 1000,
      allowTouchMove: true,
      pagination: {
        el: paginationElement,
        type: 'bullets',
      },
    });
  } else if (window.innerWidth >= 962 && about) {
    about.destroy(true, true); // Disable slider on larger screens
    about = null;
  }
}

// Initialize the slider on page load and on window resize
initAboutSlider();
window.addEventListener('resize', initAboutSlider);

const developmentSliderElement = document.querySelector('.development__slider');
if (developmentSliderElement) {
  const development = new Swiper(developmentSliderElement, {
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
  });
}

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia("(max-width: 962px)").matches;

if (!isMobile) {
  const progressLine = document.querySelector(".progress-line");
  const innerElement = document.querySelector(".about__column-wrapper");
  const aboutSection = document.querySelector(".about");

  if (progressLine && innerElement && aboutSection) {
    const scrollPercentage = 0.33;
    let scrollStep = 0;
    let isScrolling = false;

    function updateProgressLine() {
      const progress = (scrollStep + 1) * 33.33;
      progressLine.style.height = `${progress}%`;
    }

    function scrollInnerElement(event) {
      if (isScrolling) return;

      const scrollAmount = innerElement.scrollHeight * scrollPercentage;
      isScrolling = true;

      if (event.deltaY > 0) {
        if (scrollStep < 2) {
          scrollStep += 1;
          gsap.to(innerElement, { 
            scrollTop: scrollStep * scrollAmount,
            duration: 0.5,
            ease: "power2.out",
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
            duration: 0.5,
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

    const enableInnerScroll = () => {
      window.addEventListener("wheel", scrollInnerElement);
    };

    const disableInnerScroll = () => {
      window.removeEventListener("wheel", scrollInnerElement);
    };

    ScrollTrigger.create({
      trigger: aboutSection,
      start: "top +30%",
      end: () => `+=${innerElement.scrollHeight}`,
      pin: true,
      scrub: true,
      onEnter: enableInnerScroll,
      onLeave: disableInnerScroll,
      onEnterBack: enableInnerScroll,
      onLeaveBack: disableInnerScroll,
    });
  }
}


const advantagesSlider = document.querySelector('.advantages__slider');
if (advantagesSlider) {
  const development = new Swiper(advantagesSlider, {
    modules: [Pagination],
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    breakpoints: {
      300: {
        spaceBetween: 24,
      },
      968: {
        spaceBetween: 0,
      },
    },
  });
}