// импорты
import "./pages/index.css";
import { openModal, closeModal, closeModalOnOverlay } from "./scripts/modal";
import { createCard, handleLikes } from "./scripts/card";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/validation";
import { getCards, getUser } from "./scripts/api";
// Импорт функций для работы с формой удаления карточки
import {
  handleCardDelete,
  openPopupDelete,
} from "./scripts/forms/deleteForm.js";

// Импорт функций для работы с формой изменения аватара
import { handleAvatarFormSubmit } from "./scripts/forms/avatarForm.js";

// Импорт функций для работы с формой добавления новой карточки
import { handleNewCardFormSubmit } from "./scripts/forms/newCardsForm.js";

// Импорт функций для работы с формой редактирования профиля
import {
  handleFormSubmit,
  setInitialEditProfileFormValues,
} from "./scripts/forms/editForm.js";

// Переменные
const placesList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfile = document.querySelector(".popup_type_edit");
const newCardButton = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupProfileForm = document.forms["edit-profile"];
const popupImageElement = document.querySelector(".popup_type_image");
const avatarForm = document.querySelector(".popup_type_avatar");
const deleteCardForm = document.forms["delete-card"];
const avatarImage = document.querySelector(".profile__image");

// Выполнение инициализации валидации формы
enableValidation(validationConfig);

// Изменение профиля

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = popupProfileForm.name.value;
  profileDescription.textContent = popupProfileForm.description.value;
  closeModal(popupProfile);
};

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Попап Профиль
profileEditButton.addEventListener("click", () => {
  clearValidation(popupProfileForm, validationConfig);
  setInitialEditProfileFormValues();
  openModal(popupProfile);
});

// Попап кароточки

newCardButton.addEventListener("click", () => {
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
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

avatarForm.addEventListener("click", (evt) => {
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

avatarForm.querySelector(".popup__close").addEventListener("click", () => {
  closeModal(avatarForm);
});

// Установка слушателя на кнопку открытия формы изменения аватара
avatarImage.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarForm);
});

// Функция открытия модального окна с изображением карточки
function openImagePopup(
  cardImg,
  popupImage,
  popupImageCaption,
  buttonTypeCard
) {
  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupImageCaption.textContent = cardImg.alt;
  openModal(buttonTypeCard);
}

// Объект с колбэками для работы с событиями карточек
const callbacksObject = {
  deleteCardCallback: openPopupDelete,
  openImageCallback: openImagePopup,
  handleLikesCallback: handleLikes,
};

// Функция для установки информации о пользователе на страницу
let userId = "";
function setUserInfo(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  avatarImage.setAttribute("style", `background-image: url('${user.avatar}')`);
  userId = user._id;
}

// Функция для рендеринга карточек на страницу
export function renderCards(cards, callbacksObject, userId) {
  placesList.innerHTML = "";
  cards.forEach((card) => {
    const cardElement = createCard(card, callbacksObject, userId);
    placesList.appendChild(cardElement);
  });
}

// Установка слушателей для отправки форм на сервер
popupProfile.addEventListener("submit", handleFormSubmit);
popupNewCard.addEventListener("submit", (event) => {
  handleNewCardFormSubmit(event, callbacksObject, userId);
});
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
deleteCardForm.addEventListener("submit", handleCardDelete);

// Выполнение асинхронных запросов на сервер для получения информации о пользователе и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    setUserInfo(user);
    renderCards(cards, callbacksObject, user._id);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });
