import "./components/sliders"

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".clients__thumb");
    const clientTexts = document.querySelectorAll(".clients__text");
  
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        // Remove 'active' class from all buttons and text elements
        buttons.forEach(btn => btn.classList.remove("active"));
        clientTexts.forEach(text => text.classList.remove("active"));
  
        // Add 'active' class to the clicked button and corresponding text
        button.classList.add("active");
        clientTexts[index].classList.add("active");
      });
    });
  });








