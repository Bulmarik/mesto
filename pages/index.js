import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig, addPopup, addForm, addCardBtn, addCardSubmitBtn, addCardCloseBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn, editProfileCloseBtn,
        imagePopup, imageCloseBtn, cards, templateCard, profileName, profileDescription,
        inputName, inputDescription, inputPlace, inputUrl} from '../utils/constants.js';
import initialCards from '../utils/initial-cards.js';
// import {togglePopup} from '../utils/utils.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();

const openImagePopup = new PopupWithImage(imagePopup);
openImagePopup.setEventListeners();

const clickImage = (link, name) => {
  openImagePopup.open(link, name);
}

const defaultCards = new Section({
  items: initialCards,
  renderer: ((item) => {
    renderCard(item, templateCard, clickImage);
  })
}, cards)
defaultCards.renderItems()


function renderCard(data, cardSelector) {
  cards.prepend(new Card(data, cardSelector, clickImage).createCard());
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


const addCard = new PopupWithForm(addPopup, () => {
  renderCard({name: inputPlace.value, link: inputUrl.value}, templateCard);
  addCard.close();
})
addCard.setEventListeners();

/////////////////
// function addCard(evt) {
//   evt.preventDefault();
//   renderCard({name: inputPlace.value, link: inputUrl.value}, templateCard);
//   togglePopup(addPopup);
// }
//////////////////




////////////
function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}
/////////////

addCardBtn.addEventListener('click', () => {
  // inputPlace.value = "";
  // inputUrl.value = "";
  addCardValidation.inactivateSubmitBtn(addCardSubmitBtn);
  addCardValidation.eraseError(addPopup);
  addCard.open();
  // togglePopup(addPopup);
  // const openAddPopup = new Popup(addPopup);
  // openAddPopup.open();
  // openAddPopup.setEventListeners();
});

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  editProfileValidation.activateSubmitBtn(editProfileSubmitBtn);
  editProfileValidation.eraseError(editPopup);
  // togglePopup(editPopup);
  const openEditPopup = new Popup(editPopup);
  openEditPopup.open();
  openEditPopup.setEventListeners();
});

////////////
// addCardCloseBtn.addEventListener('click', () => togglePopup(addPopup));
//
// editProfileCloseBtn.addEventListener('click', () => togglePopup(editPopup));
//
// imageCloseBtn.addEventListener('click', () => togglePopup(imagePopup));
/////////////

addForm.addEventListener('submit', addCard);

editForm.addEventListener('submit', editProfile);