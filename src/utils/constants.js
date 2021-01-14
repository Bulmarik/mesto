export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

export const addPopup = document.querySelector('.popup_type_add-card');
export const addForm = addPopup.querySelector('.popup__form');
export const addCardBtn = document.querySelector('.profile__add-btn');
export const addCardSubmitBtn = addForm.querySelector('.popup__btn');
export const editPopup = document.querySelector('.popup_type_edit-profile');
export const editForm = editPopup.querySelector('.popup__form');
export const editProfileBtn = document.querySelector('.profile__edit-btn');
export const editProfileSubmitBtn = editForm.querySelector('.popup__btn');
export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupPicture = imagePopup.querySelector('.popup__image');
export const imagePopupFigcapture = imagePopup.querySelector('.popup__figcapture');
export const cards = document.querySelector('.elements__items');
export const templateCard = '.template-card';
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_description');
export const inputPlace = document.querySelector('.popup__input_type_place');
export const inputUrl = document.querySelector('.popup__input_type_url');