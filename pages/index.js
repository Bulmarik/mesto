import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig, addPopup, addForm, addCardBtn, addCardSubmitBtn, addCardCloseBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn, editProfileCloseBtn,
        imagePopup, imageCloseBtn, cards, templateCard, profileName, profileDescription,
        inputName, inputDescription, inputPlace, inputUrl} from '../utils/constants.js';
import initialCards from '../utils/initial-cards.js';
import {togglePopup} from '../utils/utils.js';
import Section from '../components/Section.js';

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();

const defaultCards = new Section({
  items: initialCards,
  renderer: ((item) => {
    cards.prepend(new Card(item, templateCard).createCard());
  })
}, cards)

defaultCards.renderItems()


function renderCard(data, cardSelector) {
  cards.prepend(new Card(data, cardSelector).createCard());
}

////////////////////
// function renderCard(data, cardSelector) {
//   cards.prepend(new Card(data, cardSelector).createCard());
// }

// function renderCard(data, cardSelector) {
//   const card = new Card(data, cardSelector).createCard();
//   cards.prepend(card);
// }

// initialCards.forEach(function(data) {
//   renderCard(data, templateCard);
// });
///////////////////

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