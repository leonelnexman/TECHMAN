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
  300: {
    spaceBetween: 24,
  },
  900: {
    spaceBetween: 0,
  },
})

gsap.registerPlugin(ScrollTrigger);

const scrollPercentage = 0.33; // 33% для прокрутки
const progressLine = document.querySelector(".progress-line"); // Предполагаем, что у вас есть элемент с классом .progress-line
let scrollStep = 0; // Текущий шаг прокрутки (0, 1, 2)
let isScrolling = false; // Флаг, чтобы отслеживать, прокручивается ли сейчас

// Функция для обновления прогресса
function updateProgressLine() {
  const progress = (scrollStep + 1) * 33.33; // Увеличиваем прогресс на 33.33% за шаг
  progressLine.style.height = `${progress}%`;
}

// Функция для плавной прокрутки внутреннего элемента
function scrollInnerElement(event) {
  if (isScrolling) return; // Пропускаем, если уже выполняется прокрутка

  const innerElement = document.querySelector(".about__column-wrapper");
  if (innerElement) {
    const scrollAmount = innerElement.scrollHeight * scrollPercentage; // Вычисляем 33% от высоты
    isScrolling = true;

    // Если прокручиваем вниз
    if (event.deltaY > 0) {
      if (scrollStep < 2) { // Ограничиваем до 2-х шагов
        scrollStep += 1;
        gsap.to(innerElement, { 
          scrollTop: scrollStep * scrollAmount, // Плавно прокручиваем на 33% за шаг
          duration: 0.3, // Продолжительность анимации (можно настроить)
          ease: "power1.out", // Плавное замедление
          onComplete: () => { isScrolling = false; } // Явное изменение isScrolling
        });
        updateProgressLine();
      } else {
        window.scrollBy(0, scrollAmount);
        isScrolling = false;
      }
    } 
    // Если прокручиваем вверх
    else if (event.deltaY < 0) {
      if (scrollStep > 0) { // Ограничиваем до минимума 0
        scrollStep -= 1;
        gsap.to(innerElement, { 
          scrollTop: scrollStep * scrollAmount,
          duration: 0.3, 
          ease: "power1.out",
          onComplete: () => { isScrolling = false; } // Явное изменение isScrolling
        });
        updateProgressLine();
      } else {
        window.scrollBy(0, -scrollAmount);
        isScrolling = false;
      }
    }

    event.preventDefault(); // Предотвращаем прокрутку страницы
  }
}

// Включаем внутренний скролл
const enableInnerScroll = () => {
  window.addEventListener("wheel", scrollInnerElement);
};

// Отключаем внутренний скролл
const disableInnerScroll = () => {
  window.removeEventListener("wheel", scrollInnerElement);
};

// Настройка ScrollTrigger для фиксации секции .about
ScrollTrigger.create({
  trigger: ".about",
  start: "top +30%",
  end: () => `+=${  document.querySelector(".about__column-wrapper").scrollHeight}`,
  pin: true,
  scrub: true,
  onEnter: enableInnerScroll,
  onLeave: disableInnerScroll,
  onEnterBack: enableInnerScroll,
  onLeaveBack: disableInnerScroll,
});





