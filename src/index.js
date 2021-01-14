import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {validationConfig, addPopup, addForm, addCardBtn, addCardSubmitBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn,
        imagePopup, cards, templateCard, profileName, profileDescription,
        inputName, inputDescription, inputPlace, inputUrl} from './utils/constants.js';
import initialCards from './utils/initial-cards.js';
import Section from './components/Section.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();

const openImagePopup = new PopupWithImage(imagePopup);
openImagePopup.setEventListeners();

const handleCardClick = (link, name) => {
  openImagePopup.open(link, name);
}

const defaultCards = new Section({
  items: initialCards,
  renderer: ((item) => {
    renderCard(item, templateCard, handleCardClick);
  })
}, cards)
defaultCards.renderItems()


function renderCard(data, cardSelector) {
  cards.prepend(new Card(data, cardSelector, handleCardClick).createCard());
}

const userInfo = new UserInfo({
  userName: profileName,
  userDescription: profileDescription
})

const addCard = new PopupWithForm(addPopup, () => {
  renderCard({name: inputPlace.value, link: inputUrl.value}, templateCard);
  addCard.close();
})
addCard.setEventListeners();

const editProfile = new PopupWithForm(editPopup, () => {
  userInfo.setUserInfo(inputName.value, inputDescription.value)
  editProfile.close();
})
editProfile.setEventListeners();

addCardBtn.addEventListener('click', () => {
  addCardValidation.inactivateSubmitBtn(addCardSubmitBtn);
  addCardValidation.eraseError(addPopup);
  addCard.open();
});

editProfileBtn.addEventListener('click', () => {
  editProfileValidation.activateSubmitBtn(editProfileSubmitBtn);
  editProfileValidation.eraseError(editPopup);
  editProfile.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().description;
});

addForm.addEventListener('submit', addCard);

editForm.addEventListener('submit', editProfile);