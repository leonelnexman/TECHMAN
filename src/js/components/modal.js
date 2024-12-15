const openModalButtons = document.querySelectorAll('.open-modal');
const closeModalButton = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        modalOverlay.classList.add('visible');
    });
});

closeModalButton.addEventListener('click', () => {
    modalOverlay.classList.remove('visible');
});

modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.classList.remove('visible');
    }
});