const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

function togglePopup() {
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
  togglePopup();
}

form.addEventListener('submit', editProfile);
editBtn.addEventListener('click', togglePopup);
closeBtn.addEventListener('click', togglePopup);
addBtn.addEventListener('click', togglePopup);

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

const cardTemplate = document.querySelector('.template-card').content.querySelector('.elements__item');

initialCards.forEach(function(data) {
  
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardName = cardElement.querySelector('.elements__name');
  const cardLikeBtn = cardElement.querySelector('.elements__like-btn');
  const cardDelBtn = cardElement.querySelector('.elements__del-btn');
  const list = document.querySelector('.elements__items')
  cardName.textContent = data.name;
  cardImage.src = data.link;
  list.prepend(cardElement);
});
