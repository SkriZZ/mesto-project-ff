const openModal = (element) => {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEscape);
};

const closeModal = (element) => {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscape);
};

const closeModalOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const currentPopup = document.querySelector(".popup_is-opened");
    closeModal(currentPopup);
  }
};

const closeModalOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};

const popups = document.querySelectorAll('.popup')

      popups.forEach((popup) => {
          popup.addEventListener('mousedown', (evt) => {
              if (evt.target.classList.contains('popup_opened')) {
                  closeModal(popup)
              }
              if (evt.target.classList.contains('popup__close')) {
                closeModal(popup)
              }
              if (evt.target === evt.currentTarget) {
                closeModal(evt.currentTarget);
              }
          })
      })

export { openModal, closeModal, closeModalOnOverlay };
