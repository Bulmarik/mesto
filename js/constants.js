const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

const addPopup = document.querySelector('.popup_type_add-card');
const addForm = addPopup.querySelector('.popup__form');
const addCardBtn = document.querySelector('.profile__add-btn');
const addCardSubmitBtn = addForm.querySelector('.popup__btn');
const addCardCloseBtn = addPopup.querySelector('.popup__close-btn');
const editPopup = document.querySelector('.popup_type_edit-profile');
const editForm = editPopup.querySelector('.popup__form');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileSubmitBtn = editForm.querySelector('.popup__btn');
const editProfileCloseBtn = editPopup.querySelector('.popup__close-btn');
const imagePopup = document.querySelector('.popup_type_image');
const imageCloseBtn = imagePopup.querySelector('.popup__close-btn');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupFigcapture = imagePopup.querySelector('.popup__figcapture');
const cards = document.querySelector('.elements__items');
const templateCard = '.template-card';
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');
const inputPlace = document.querySelector('.popup__input_type_place');
const inputUrl = document.querySelector('.popup__input_type_url');

export {
  validationConfig,
  addPopup,
  addForm,
  addCardBtn,
  addCardSubmitBtn,
  addCardCloseBtn,
  editPopup,
  editForm,
  editProfileBtn,
  editProfileSubmitBtn,
  editProfileCloseBtn,
  imagePopup,
  imageCloseBtn,
  imagePopupPicture,
  imagePopupFigcapture,
  cards,
  templateCard,
  profileName,
  profileDescription,
  inputName,
  inputDescription,
  inputPlace,
  inputUrl,
}