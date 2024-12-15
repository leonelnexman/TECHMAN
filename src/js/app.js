

import "./components/mobile-menu"
import "./components/modal"
import "./components/conditions"
import "./components/steps"
import "./components/sliders"


  const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll('.nav__link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".clients__thumb");
    const clientTexts = document.querySelectorAll(".clients__text");
  
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        clientTexts.forEach(text => text.classList.remove("active"));
  
        button.classList.add("active");
        clientTexts[index].classList.add("active");
      });
    });
  });

  const formInputs = document.querySelectorAll('.contacts-form__input');

  // Функция для проверки заполненности input
  function toggleActiveClass(inputElement) {
    const parent = inputElement.closest('.contacts-form__input');
    if (inputElement.value.trim() !== '') {
      parent.classList.add('active');
    } else {
      parent.classList.remove('active');
    }
  }
  
  // Добавляем обработчики событий для каждого input
  formInputs.forEach((formInput) => {
    const input = formInput.querySelector('input');
  
    // Реагируем на события input и blur
    input.addEventListener('input', () => toggleActiveClass(input));
    input.addEventListener('blur', () => toggleActiveClass(input));
  });

  








