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

const deleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
};

const likeCard = (evt) => {
  evt.target.classList.toggle('elements__like-btn_active');
};

const popupError = Array.from(document.querySelectorAll('.popup__error'));
const popupInput = Array.from(document.querySelectorAll('.popup__input'));

function eraseError(popupError, popupInput) {
  popupError.forEach((error) => {
    error.classList.remove('popup__error_visible');
  })
  popupInput.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  })
}

function togglePopup(popup) {
  popup.classList.toggle('popup_show');
}

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


  const clickImage = (evt) => {
    evt.target.closest('elements__item');
    imagePopupImg.src = data.link;
    imagePopupFigcapture.textContent = data.name;
    togglePopup(imagePopup);
  };

  cardImage.addEventListener('click', clickImage);
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

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  togglePopup(editPopup); 
}

editProfileBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  editProfileSubmitBtn.removeAttribute('disabled');
  editProfileSubmitBtn.classList.remove('popup__btn_disabled');
  eraseError(popupError, popupInput);
  togglePopup(editPopup);
});

addCardBtn.addEventListener('click', () => {
  inputPlace.value = "";
  inputUrl.value = "";
  addCardSubmitBtn.setAttribute('disabled', true);
  addCardSubmitBtn.classList.add('popup__btn_disabled');
  eraseError(popupError, popupInput);
  togglePopup(addPopup);
});

editProfileCloseBtn.addEventListener('click', () => {
  togglePopup(editPopup);
});

addCardCloseBtn.addEventListener('click', () => {
  togglePopup(addPopup);
});

imageCloseBtn.addEventListener('click', () => {
  togglePopup(imagePopup);
});

const setOverlayListener = () => {
  const overlayList = Array.from(document.querySelectorAll('.popup__overlay'));
  overlayList.forEach((overlay) => {
    overlay.addEventListener('click', (evt) => {
      togglePopup(evt.target.parentElement);
    });
  });
}
setOverlayListener();

document.addEventListener('keydown', (evt) => {
  if(evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_show'));
  }
});

editForm.addEventListener('submit', editProfile);

addForm.addEventListener('submit', addCard);