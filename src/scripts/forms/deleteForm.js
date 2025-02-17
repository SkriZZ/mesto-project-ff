import { openModal, closeModal } from "../modal.js";
import { deleteCardApi } from "../api.js";

const deletePopup = document.querySelector(".popup_type_delete-card");

let selectedCard;
let id;

// Функция открытия попапа для подтверждения удаления карточки
export const openPopupDelete = (cardElement, cardId) => {
  selectedCard = cardElement;
  id = cardId;
  openModal(deletePopup);
};

// Функция закрытия попапа подтверждения удаления карточки
const closePopupDelete = () => {
  closeModal(deletePopup);
};

// Функция удаления карточки
function deleteCard(selectedCard, id) {
  // Отправляем запрос на сервер для удаления карточки
  deleteCardApi(id)
    .then(() => {
      // Удаляем карточку из DOM после успешного удаления
      selectedCard.remove();
      // Закрываем попап после успешного удаления
      closePopupDelete();
    })
    .catch((err) => {
      console.error("Произошла ошибка при удалении карточки:", err);
    });
}

// Обработчик события отправки формы для удаления карточки
export function handleCardDelete(evt) {
  evt.preventDefault();
  // Вызываем функцию удаления карточки
  deleteCard(selectedCard, id);
}
