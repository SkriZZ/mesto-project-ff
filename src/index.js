// импорты
import "./pages/index.css";
import { initialCards } from "./scripts/cards";
import { openModal, closeModal, closeModalOnOverlay } from "./scripts/modal";
import { createCard, likeCard, deleteCard } from "./scripts/card";

// Переменные
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const newCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupProfileForm = document.forms["edit-profile"];
const popupNewCardForm = document.forms["new-place"];
const popupImageElement = document.querySelector(".popup_type_image");
const popupImage = popupImageElement.querySelector(".popup__image");
const popupCaption = popupImageElement.querySelector(".popup__caption");
const renderCard = (
  item,
  container,
  likeCard,
  deleteCard,
  openFullImageFn,
  place = "end"
) => {
  const cardElement = createCard(item, deleteCard, likeCard, openFullImageFn);
  if (place === "end") {
    container.append(cardElement);
  } else {
    container.prepend(cardElement);
  }
};

// Изменение профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closeModal(popupProfile);
};

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

const fillProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// Попап Профиль
profileEditButton.addEventListener("click", () => {
  fillProfilePopup(
    popupProfileForm,
    profileTitle.textContent,
    profileDescription.textContent
  );
  openModal(popupProfile);
});

// Попап кароточки

newCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = popupNewCardForm.elements["place-name"].value;
  const link = popupNewCardForm.elements.link.value;
  const description = name;
  const newCard = {
    name,
    link,
    description,
  };
  renderCard(
    newCard,
    placesList,
    likeCard,
    deleteCard,
    openImagePopup,
    "start"
  );
  closeModal(popupNewCard);
  popupNewCardForm.reset();
});

// Клик по оверлею

popupNewCard.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

popupImageElement.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

popupProfile.addEventListener("click", (evt) => {
  closeModalOnOverlay(evt);
});

// Крестики

popupNewCard.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupNewCard);
});

popupImageElement
  .querySelector(".popup__close")
  .addEventListener("click", () => {
    closeModal(popupImageElement);
  });

popupProfile.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(popupProfile);
});

// Карточки

const openImagePopup = (imageURL, imageAlt, title) => {
  popupImage.src = imageURL;
  popupImage.alt = imageAlt;
  popupCaption.textContent = title;
  openModal(popupImageElement);
};

// @todo: Вывести карточки на страницу
initialCards.forEach((card) =>
  renderCard(card, placesList, likeCard, deleteCard, openImagePopup)
);
