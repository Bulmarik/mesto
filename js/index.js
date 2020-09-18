import Card from './Card.js';
import FormValidator from './FormValidator.js';
import validationConfig from './constants.js';
import initialCards from './initial-cards.js';
import {togglePopup} from './utils.js';

const addPopup = document.querySelector('.popup_type_add-card');
const editPopup = document.querySelector('.popup_type_edit-profile');
const cards = document.querySelector('.elements__items');
const templateCard = '.template-card';

const addCardBtn = document.querySelector('.profile__add-btn');
const editProfileBtn = document.querySelector('.profile__edit-btn');

const addForm = addPopup.querySelector('.popup__form');
const editForm = editPopup.querySelector('.popup__form');

const addCardSubmitBtn = addForm.querySelector('.popup__btn');
const editProfileSubmitBtn = editForm.querySelector('.popup__btn');

const addCardCloseBtn = addPopup.querySelector('.popup__close-btn');
const editProfileCloseBtn = editPopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();

function renderCard(data, cardSelector) {
  cards.prepend(new Card(data, cardSelector).createCard());
}

initialCards.forEach(function(data) {
  renderCard(data, templateCard);
});

function addCard(evt) {
  evt.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value}, templateCard);
  togglePopup(addPopup);
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}

addCardBtn.addEventListener('click', () => {
  inputPlace.value = "";
  inputUrl.value = "";
  addCardValidation.inactivateSubmitBtn(addCardSubmitBtn);
  addCardValidation.eraseError(addPopup);
  togglePopup(addPopup);
});

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  editProfileValidation.activateSubmitBtn(editProfileSubmitBtn);
  editProfileValidation.eraseError(editPopup);
  togglePopup(editPopup);
});

addCardCloseBtn.addEventListener('click', () => togglePopup(addPopup));

editProfileCloseBtn.addEventListener('click', () => togglePopup(editPopup));

addForm.addEventListener('submit', addCard);

editForm.addEventListener('submit', editProfile);