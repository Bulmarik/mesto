import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Cтадион Медеo',
    link: './images/medeu_stadium.jpg'
  },
  {
    name: '842 ступени',
    link: './images/842_steps.jpg'
  },
  {
    name: 'Чимбулак',
    link: './images/shimbulak.jpg'
  },
  {
    name: 'Канатная дорога',
    link: './images/funicular_to_shymbulak.jpg'
  },
  {
    name: 'Ущелье Алмарасан',
    link: './images/almarasan_gorge.jpg'
  },
  {
    name: 'Дорога к Алатау',
    link: './images/road_to_the_alatau.jpg'
  }
];

const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const list = document.querySelector('.elements__items');

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');

const editProfileSubmitBtn = editForm.querySelector('.popup__btn')
const addCardSubmitBtn = addForm.querySelector('.popup__btn')

const editProfileCloseBtn = editPopup.querySelector('.popup__close-btn');
const addCardCloseBtn = addPopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

function renderCard(data, cardSelector) {
  list.prepend(new Card(data, cardSelector).createCard());
}

const addCardValidation = new FormValidator (object, addPopup).enableValidation();
addCardValidation;

const editCardValidation = new FormValidator (object, editPopup).enableValidation();
editCardValidation;

initialCards.forEach(function(data) {
  renderCard(data, '.template-card');
});

function addCard(evt) {
  evt.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value}, '.template-card');
  togglePopup(addPopup);
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    addEventListener('keydown', closePopupEsc);
    document.querySelectorAll('.popup__overlay').forEach((overlay) => {
      overlay.addEventListener('click', closePopupOverlay);
    });
  } else {
    removeEventListener('keydown', closePopupEsc);
    document.querySelectorAll('.popup__overlay').forEach((overlay) => {
      overlay.removeEventListener('click', closePopupOverlay);
    });
  }
}

function closePopupEsc(evt) {
  if(evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_opened'));
  }
}

const closePopupOverlay = (evt) => {
  togglePopup(evt.target.parentElement);
}

function eraseError(popup) {
  const popupError = Array.from(popup.querySelectorAll('.popup__error'));
  popupError.forEach((error) => error.classList.remove('popup__error_visible'));
  const popupInput = Array.from(popup.querySelectorAll('.popup__input'));
  popupInput.forEach((input) => input.classList.remove('popup__input_type_error'));
}

function activeSubmitBtn(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__btn_disabled');
}

function inactiveSubmitBtn(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__btn_disabled');
}

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  activeSubmitBtn(editProfileSubmitBtn);
  eraseError(editPopup);
  togglePopup(editPopup);
});

addCardBtn.addEventListener('click', () => {
  inputPlace.value = "";
  inputUrl.value = "";
  inactiveSubmitBtn(addCardSubmitBtn);
  eraseError(addPopup);
  togglePopup(addPopup);
});

editProfileCloseBtn.addEventListener('click', () => togglePopup(editPopup));

addCardCloseBtn.addEventListener('click', () => togglePopup(addPopup));

editForm.addEventListener('submit', editProfile);

addForm.addEventListener('submit', addCard);