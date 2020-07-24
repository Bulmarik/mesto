const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const editProfileCloseBtn = editPopup.querySelector('.popup__close-btn');
const addCardCloseBtn = addPopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

const cardTemplate = document.querySelector('.template-card').content.querySelector('.elements__item');
const list = document.querySelector('.elements__items');

const deleteCard = function(evt) {
  evt.target.closest('.elements__item').remove();
}

const likeCard = function(evt) {
  evt.target.classList.toggle('elements__like-btn_active');
}

function togglePopup(popup) {
  if (!popup.classList.contains('popup_show')) {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  };
  popup.classList.toggle('popup_show');
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__name');
  const cardLikeBtn = cardElement.querySelector('.elements__like-btn');
  const cardDelBtn = cardElement.querySelector('.elements__del-btn');
  cardName.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardDelBtn.addEventListener('click', deleteCard);
  cardLikeBtn.addEventListener('click', likeCard);
  return cardElement;
}

function renderCard(data) {
  list.prepend(createCard(data));
}

initialCards.forEach(function(data) {
  renderCard(data);
});

function addCard(evt) {
  evt.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value});
  togglePopup(addPopup); 
}

editForm.addEventListener('submit', editProfile);

editProfileBtn.addEventListener('click', () => {
  togglePopup(editPopup)
});

editProfileCloseBtn.addEventListener('click', () => {
  togglePopup(editPopup)
});

addForm.addEventListener('submit', addCard);

addCardBtn.addEventListener('click', () => {
  togglePopup(addPopup)
});

addCardCloseBtn.addEventListener('click', () => {
  togglePopup(addPopup)
});