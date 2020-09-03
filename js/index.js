const editPopup = document.querySelector('.popup_type_edit-profile');
const addPopup = document.querySelector('.popup_type_add-card');
const imagePopup = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('.template-card').content.querySelector('.elements__item');
const list = document.querySelector('.elements__items');

const editProfileBtn = document.querySelector('.profile__edit-btn');
const addCardBtn = document.querySelector('.profile__add-btn');

const editForm = editPopup.querySelector('.popup__form');
const addForm = addPopup.querySelector('.popup__form');

const editProfileSubmitBtn = editForm.querySelector('.popup__btn')
const addCardSubmitBtn = addForm.querySelector('.popup__btn')

const editProfileCloseBtn = editPopup.querySelector('.popup__close-btn');
const addCardCloseBtn = addPopup.querySelector('.popup__close-btn');
const imageCloseBtn = imagePopup.querySelector('.popup__close-btn');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupFigcapture = imagePopup.querySelector('.popup__figcapture');

const deleteCard = (evt) => evt.target.closest('.elements__item').remove();

const likeCard = (evt) => evt.target.classList.toggle('elements__like-btn_active');

function clickImage(data) {
  imagePopupImg.src = data.link;
  imagePopupFigcapture.textContent = data.name;
  togglePopup(imagePopup);
}

class Place {
  constructor(data) {
    this._link = data.link
    this._name = data.name
  }

  createCard(data) {
    this._element = cardTemplate.cloneNode(true);
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._cardImage.addEventListener('click', () => clickImage(data));
    this._element.querySelector('.elements__like-btn').addEventListener('click', likeCard);
    this._element.querySelector('.elements__del-btn').addEventListener('click', deleteCard);
    return this._element;
  }
}

function renderCard(data) {
  list.prepend(new Place(data).createCard(data));
}

initialCards.forEach(function(data) {
  renderCard(data);
});

function addCard(evt) {
  evt.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value});
  togglePopup(addPopup);
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    addEventListener('keydown', closePopupEsc);
  } else {
    removeEventListener('keydown', closePopupEsc);
  }
}

function closePopupEsc(evt) {
  if(evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_opened'));
  }
}

const setOverlayListener = () => {
  const overlayList = Array.from(document.querySelectorAll('.popup__overlay'));
  overlayList.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => togglePopup(evt.target.parentElement));
  });
}
setOverlayListener();

function eraseError(popup) {
  const popupError = Array.from(popup.querySelectorAll('.popup__error'));
  popupError.forEach((error) => error.classList.remove('popup__error_visible'));
  const popupInput = Array.from(popup.querySelectorAll('.popup__input'));
  popupInput.forEach((input) => input.classList.remove('popup__input_type_error'));
}

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  activeSubmitBtn(editProfileSubmitBtn);
  eraseError(editPopup);
  togglePopup(editPopup);
});

addCardBtn.addEventListener('click', () => {
  inputPlace.value = "";
  inputUrl.value = "";
  inactiveSubmitBtn(addCardSubmitBtn);
  eraseError(addPopup);
  togglePopup(addPopup);
});

editProfileCloseBtn.addEventListener('click', () => togglePopup(editPopup));

addCardCloseBtn.addEventListener('click', () => togglePopup(addPopup));

imageCloseBtn.addEventListener('click', () => togglePopup(imagePopup));

editForm.addEventListener('submit', editProfile);

addForm.addEventListener('submit', addCard);