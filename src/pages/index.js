import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {avatarPopup, editAvatarBtn, editAvatarSubmitBtn, profileImage, inputAvatarUrl,
        addPopup, addCardBtn, addCardSubmitBtn, inputPlace, inputUrl,
        editPopup, editProfileBtn, editProfileSubmitBtn,
        profileName, profileDescription, inputName, inputDescription,
        imagePopup, deletePopup, templateCard, cards, 
        validationConfig} from '../utils/constants.js';
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
  const newCard = new Card(data, templateCard, handleCardClick, userId, deleteCard, deleteCardData, likeCard);
  const createCard = newCard.createCard();
  cardsSection.addItem(createCard);
}


// Аватарка
const editAvatar = new PopupWithForm(avatarPopup, () => {
  editAvatar.uxAdd();
  api.setAvatar(inputAvatarUrl.value)
    .then(() => {
      profileImage.src = inputAvatarUrl.value;
      editAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editAvatar.uxRemove())
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
  editProfile.uxAdd();
  api.setUser(inputName.value, inputDescription.value)
  .then(() => {
      userInfo.setUserInfo(inputName.value, inputDescription.value);
      editProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => editProfile.uxRemove())
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
  addCard.uxAdd();
  api.addNewCard({name: inputPlace.value, link: inputUrl.value})
  .then((data) => {
    renderCard(data);
    addCard.close();
  })
  .catch((err) => console.log(err))
  .finally(() => addCard.uxRemove())
})
addCard.setEventListeners();

addCardBtn.addEventListener('click', () => {
  addCardValidation.inactivateSubmitBtn(addCardSubmitBtn);
  addCardValidation.eraseError(addPopup);
  addCard.open();
});


// Удаление карточек
let cardId;
let delElement;
function deleteCardData(id, element) {
  cardId = id;
  delElement = element;
  return [cardId, delElement];
}

const deleteCard = new PopupWithForm(deletePopup, () => {
  api.delCard(cardId)
    .then(() => {
      delElement.remove();
      deleteCard.close();
    })
    .catch((err) => console.log(err))
})
deleteCard.setEventListeners();


// Лайки
function likeCard(id, element, checkLikeStatus, setLikeStatus) {
  if (checkLikeStatus) {
    api.delLike(id)
    .then((res) => {
      element.querySelector('.elements__like-count').textContent = res.likes.length;
      setLikeStatus(checkLikeStatus, element);
    })
    .catch((err) => console.log(err))
  } else {
    api.addLike(id)
    .then((res) => {
      element.querySelector('.elements__like-count').textContent = res.likes.length;
      setLikeStatus(checkLikeStatus, element);
    })
    .catch((err) => console.log(err))
  }
}