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
    slidesPerView: 'auto',
    spaceBetween: 0,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    breakpoints: {
      300: {
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',        },
      },
      968: {
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".advantages__slider");
  const cursor = document.querySelector(".cursor");

  // Анимация для появления курсора
  const cursorAnimation = gsap.to(cursor, {
    opacity: 1,
    paused: true, // Управляем вручную
    duration: 0.2,
    ease: "power2.out",
  });

  // Флаг для отслеживания состояния перетаскивания
  let isDragging = false;

  // Создаем инерционное движение
  function moveCursor(event) {
    const duration = isDragging ? 0.5 : 0.5; // Плавнее, если происходит перетаскивание
    gsap.to(cursor, {
      x: event.clientX,
      y: event.clientY,
      duration,
      ease: isDragging ? "power3.out" : "power2.out", // Более плавная функция easing
    });
  }

  // Показ курсора при наведении
  slider.addEventListener("mouseenter", () => {
    cursorAnimation.play(); // Плавное появление
    slider.addEventListener("mousemove", moveCursor); // Слежение за мышью
  });

  // Скрытие курсора при выходе
  slider.addEventListener("mouseleave", () => {
    cursorAnimation.reverse(); // Плавное исчезновение
    slider.removeEventListener("mousemove", moveCursor);
  });

  // Обработчики для начала и окончания перетаскивания
  slider.addEventListener("mousedown", () => {
    isDragging = true; // Включаем плавное скольжение
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false; // Возвращаемся к обычному следованию
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false; // Сбрасываем флаг при выходе
  });
});


const aboutdescr = document.querySelector('.about-descr__img-wrap');
let boutdescr;

function initSlider() {
  if (window.innerWidth < 700 && !boutdescr) {
    // Инициализируем слайдер, если его еще нет и ширина экрана меньше 962px
    boutdescr = new Swiper(aboutdescr, {
      modules: [Pagination],
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });
  } else if (window.innerWidth >= 700 && boutdescr) {
    // Уничтожаем слайдер, если он существует и ширина экрана больше или равна 962px
    boutdescr.destroy();
    boutdescr = null;
  }
}

// Вызываем функцию инициализации при загрузке страницы
initSlider();

// Добавляем слушатель на изменение размера окна
window.addEventListener('resize', initSlider);