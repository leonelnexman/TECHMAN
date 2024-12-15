const hamburger = document.querySelector('.hamburger');
    const navWrapper = document.querySelector('.nav-wrapper');
    const closeBtn = document.querySelector('.close');

    // Открытие меню
    hamburger.addEventListener('click', () => {
      navWrapper.classList.add('visible');
    });

    // Закрытие меню
    closeBtn.addEventListener('click', () => {
      navWrapper.classList.remove('visible');
    });