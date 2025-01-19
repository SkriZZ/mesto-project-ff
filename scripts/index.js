// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createСard(Data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true),
    cardImage = cardElement.querySelector(".card__image"),
    cardTitle = cardElement.querySelector(".card__title"),
    deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.setAttribute("src", Data.link);
  cardImage.setAttribute("alt", Data.name);
  cardTitle.textContent = Data.name;

  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest(".card").remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((Data) => {
  const cardElement = createСard(Data);
  placesList.append(cardElement);
});
