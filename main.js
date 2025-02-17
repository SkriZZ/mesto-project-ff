(()=>{"use strict";var e=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)},t=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)},n=function(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");t(n)}},r=function(e){e.target===e.currentTarget&&t(e.currentTarget)},o=document.querySelector("#card-template").content,c=function(e){e.target.classList.toggle("card__like-button_is-active")},i=function(e){e.target.closest(".card").remove()},d=document.querySelector(".places__list"),a=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_edit"),u=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_new-card"),p=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),v=document.forms["edit-profile"],f=document.forms["new-place"],_=document.querySelector(".popup_type_image"),y=_.querySelector(".popup__image"),k=_.querySelector(".popup__caption"),q=function(e,t,n,r,c){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"end",d=function(e,t,n,r){var c=o.querySelector(".card").cloneNode(!0),i=c.querySelector(".card__delete-button"),d=c.querySelector(".card__like-button"),a=c.querySelector(".card__image"),s=c.querySelector(".card__title");return a.src=e.link,a.alt=e.name,s.textContent=e.name,i.addEventListener("click",(function(e){t(e)})),d.addEventListener("click",(function(e){n(e)})),a.addEventListener("click",(function(){r(a.src,a.alt,s.textContent)})),c}(e,r,n,c);"end"===i?t.append(d):t.prepend(d)};v.addEventListener("submit",(function(e){e.preventDefault(),p.textContent=v.name.value,m.textContent=v.description.value,t(s)})),a.addEventListener("click",(function(){var t,n,r;t=v,n=p.textContent,r=m.textContent,t.elements.name.value=n,t.elements.description.value=r,e(s)})),u.addEventListener("click",(function(){e(l)})),f.addEventListener("submit",(function(e){e.preventDefault();var n=f.elements["place-name"].value,r=f.elements.link.value;q({name:n,link:r,description:n},d,c,i,S,"start"),t(l),f.reset()})),l.addEventListener("click",(function(e){r(e)})),_.addEventListener("click",(function(e){r(e)})),s.addEventListener("click",(function(e){r(e)})),l.querySelector(".popup__close").addEventListener("click",(function(){t(l)})),_.querySelector(".popup__close").addEventListener("click",(function(){t(_)})),s.querySelector(".popup__close").addEventListener("click",(function(){t(s)}));var S=function(t,n,r){y.src=t,y.alt=n,k.textContent=r,e(_)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){return q(e,d,c,i,S)}))})();