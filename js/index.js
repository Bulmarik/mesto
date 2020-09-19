import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {validationConfig, addPopup, addForm, addCardBtn, addCardSubmitBtn, addCardCloseBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn, editProfileCloseBtn,
        imagePopup, imageCloseBtn, cards, templateCard, profileName, profileDescription,
        inputName, inputDescription, inputPlace, inputUrl} from './constants.js';
import initialCards from './initial-cards.js';
import {togglePopup} from './utils.js';

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

imageCloseBtn.addEventListener('click', () => togglePopup(imagePopup));

addForm.addEventListener('submit', addCard);

editForm.addEventListener('submit', editProfile);