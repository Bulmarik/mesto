import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig, avatarPopup, editAvatarBtn, editAvatarSubmitBtn, profileImage,
        inputAvatarUrl, addPopup, addForm, addCardBtn, addCardSubmitBtn,
        editPopup, editForm, editProfileBtn, editProfileSubmitBtn, imagePopup,
        cards, templateCard, profileName, profileDescription, 
        inputName, inputDescription, inputPlace, inputUrl, deletePopup, deleteSubmitBtn} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';


// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  headers: {
    authorization: '43a7264e-630c-455f-a34f-0f66d3201253',
    'Content-Type': 'application/json'
  }
});


let userId;
function getUserId(user) {
  userId = user._id;
};


// Промис
Promise.all([api.getUser(), api.getInitialCards()])
  .then(([user, cards]) => {
    getUserId(user);
    userInfo.setUserInfo(user.name, user.about);
    profileImage.src = user.avatar;
    const card = cards.map((data) => (data));
    cardsSection.renderItems(card.reverse());
  })
  .catch((res) => {
    console.log(`Ошибка: ${res.status}`);
  }
)


// Валидация
const editAvatarValidation = new FormValidator(validationConfig, avatarPopup);
editAvatarValidation.enableValidation();

const addCardValidation = new FormValidator(validationConfig, addPopup);
addCardValidation.enableValidation();

const editProfileValidation = new FormValidator(validationConfig, editPopup);
editProfileValidation.enableValidation();


// Просмотр картинок
const openImagePopup = new PopupWithImage(imagePopup);
openImagePopup.setEventListeners();

const handleCardClick = (link, name) => {
  openImagePopup.open(link, name);
}


// Рендер карт
const cardsSection = new Section({
  renderer: ((item) => {
    renderCard(item);
  })
}, cards)

function renderCard(data) {
  const newCard = new Card(data, templateCard, handleCardClick, userId, deleteCard, deleteCardId);
  const createCard = newCard.createCard();
  cardsSection.addItem(createCard);
}


// Аватарка
const editAvatar = new PopupWithForm(avatarPopup, () => {
  api.setAvatar(inputAvatarUrl.value);
  profileImage.src = inputAvatarUrl.value;
  editAvatar.close();
})
editAvatar.setEventListeners();

editAvatarBtn.addEventListener('click', () => {
  editAvatarValidation.inactivateSubmitBtn(editAvatarSubmitBtn);
  editAvatarValidation.eraseError(avatarPopup);
  editAvatar.open();
});


// Юзер
const userInfo = new UserInfo({
  userName: profileName,
  userDescription: profileDescription
})

const editProfile = new PopupWithForm(editPopup, () => {
  userInfo.setUserInfo(inputName.value, inputDescription.value);
  api.setUser(inputName.value, inputDescription.value);
  editProfile.close();
})
editProfile.setEventListeners();

editProfileBtn.addEventListener('click', () => {
  editProfileValidation.activateSubmitBtn(editProfileSubmitBtn);
  editProfileValidation.eraseError(editPopup);
  editProfile.open();
  inputName.value = userInfo.getUserInfo().name;
  inputDescription.value = userInfo.getUserInfo().description;
});


// Добавление карточек
const addCard = new PopupWithForm(addPopup, () => {
  api.addNewCard({name: inputPlace.value, link: inputUrl.value})
  .then((data) => {
    renderCard(data)
  });
  addCard.close();
}
)
addCard.setEventListeners();

addCardBtn.addEventListener('click', () => {
  addCardValidation.inactivateSubmitBtn(addCardSubmitBtn);
  addCardValidation.eraseError(addPopup);
  addCard.open();
});


// Удаление карточек
let CardId;
function deleteCardId(id) {
  CardId = id;
  return CardId;
}

const deleteCard = new PopupWithForm(deletePopup, () => {
  api.delCard(CardId);
  // deleteCard.removeCard();
  deleteCard.close();
})
deleteCard.setEventListeners();