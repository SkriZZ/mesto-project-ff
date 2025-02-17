import { postCard } from "../api.js";
import { createCard } from "../card.js";
import { closeModal } from "../modal.js";
import { handleSubmit } from "./utilsForms.js";

const newPlaceFormElement = document.forms["new-place"];
const newPlaceNameInput = newPlaceFormElement.elements["place-name"];
const newLinkInput = newPlaceFormElement.elements.link;
const newCardForm = document.querySelector(".popup_type_new-card");
const placesList = document.querySelector(".places__list");

// Универсальная функция для добавления карточки в список мест
function renderCard(item, method = "prepend") {
  const cardElement = createCard(item, callbacks);
  cardList[method](cardElement);
}

// Обработчик события отправки формы добавления карточки
export function handleNewCardFormSubmit(event, callbacksObject, userId) {
  function makeRequest() {
    return postCard(newPlaceNameInput.value, newLinkInput.value).then(
      (card) => {
        // Создаем HTML-элемент для новой карточки
        const newCardElement = createCard(card, callbacksObject, userId);
        // Добавляем созданный HTML-элемент на страницу
        placesList.prepend(newCardElement); // Предполагается, что placesList - это контейнер для карточек
        closeModal(newCardForm); // Закрытие попапа после успешного добавления карточки
      }
    );
  }

  handleSubmit(makeRequest, event);
}
