import { patchUser } from "../api.js";
import { closeModal } from "../modal.js";
import { handleSubmit } from "./utilsForms.js";
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const userJobElement = document.querySelector(".profile__description");
const userNameElement = document.querySelector(".profile__title");

// Установка начальных значений в форме редактирования профиля
export function setInitialEditProfileFormValues() {
  nameInput.value = userNameElement.textContent;
  jobInput.value = userJobElement.textContent;
}

// Обработчик события отправки формы редактирования профиля
export function handleProfileFormSubmit(evt) {
  // Функция для выполнения запроса на сервер для обновления данных профиля
  function makeRequest() {
    const name = nameInput.value;
    const about = jobInput.value;
    // Выполнение запроса на сервер
    return patchUser(name, about).then((dataUser) => {
      // Обновление отображаемых данных профиля на странице
      userNameElement.textContent = dataUser.name;
      userJobElement.textContent = dataUser.about;
      console.dir(name, about);
      // Установка начальных значений в форме редактирования профиля
      setInitialEditProfileFormValues();
      // Закрытие попапа после успешного обновления профиля
      closeModal(evt.target.closest(".popup_is-opened"));
    });
  }

  // Вызов общей функции для обработки отправки формы
  handleSubmit(makeRequest, evt);
}
