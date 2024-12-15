document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".steps__thumbs button"); // Элементы табов
    const stepsItems = document.querySelectorAll(".steps__item"); // Элементы шагов
  
    // Функция для удаления классов active
    function removeActiveClasses() {
      tabs.forEach(tab => tab.classList.remove("active"));
      stepsItems.forEach(step => step.classList.remove("active"));
    }
  
    // Добавляем обработчики событий для каждого таба
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        removeActiveClasses(); // Убираем классы active со всех элементов
        tab.classList.add("active"); // Добавляем active на текущий таб
        stepsItems[index].classList.add("active"); // Добавляем active на соответствующий шаг
      });
    });
  
    // Устанавливаем активные классы по умолчанию для первого таба и первого шага
    if (tabs.length > 0 && stepsItems.length > 0) {
      tabs[0].classList.add("active");
      stepsItems[0].classList.add("active");
    }
  });