import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig, addPopup, addForm, addCardBtn, addCardSubmitBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn,
        imagePopup, cards, templateCard, profileName, profileDescription,
        inputName, inputDescription, inputPlace, inputUrl} from '../utils/constants.js';
// import initialCards from '../utils/initial-cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '43a7264e-630c-455f-a34f-0f66d3201253',
    'Content-Type': 'application/json'
  }
}); 

Promise.all([api.getInitialCards(), api.getUser()])
  .then(([cards, user]) => {
    const card = cards.map(({name, link}) => ({name, link}));
    cardsSection.renderItems(card)
    userInfo.setUserInfo(user.name, user.about)
  })
  .catch((res) => {
    console.log(`Ошибка: ${res.status}`);
  })

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();

const openImagePopup = new PopupWithImage(imagePopup);
openImagePopup.setEventListeners();

const handleCardClick = (link, name) => {
  openImagePopup.open(link, name);
}

const cardsSection = new Section({
  renderer: ((item) => {
    renderCard(item, templateCard);
  })
}, cards)
// cardsSection.renderItems(initialCards)

function renderCard(data, cardSelector) {
  cardsSection.addItem(new Card(data, cardSelector, handleCardClick).createCard());
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