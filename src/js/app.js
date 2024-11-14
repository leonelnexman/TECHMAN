

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

  








