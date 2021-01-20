export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  errorSelector: '.popup__error',
  errorClass: 'popup__error_visible'
};

export const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
export const editAvatarBtn = document.querySelector('.profile__avatar');
export const editAvatarSubmitBtn = avatarForm.querySelector('.popup__submit-btn');
export const profileImage = document.querySelector('.profile__image');
export const inputAvatarUrl = document.querySelector('.popup__input_type_avatar-url');

export const addPopup = document.querySelector('.popup_type_add-card');
const addForm = addPopup.querySelector('.popup__form');
export const addCardBtn = document.querySelector('.profile__add-btn');
export const addCardSubmitBtn = addForm.querySelector('.popup__submit-btn');
export const inputPlace = document.querySelector('.popup__input_type_place');
export const inputUrl = document.querySelector('.popup__input_type_url');

export const editPopup = document.querySelector('.popup_type_edit-profile');
const editForm = editPopup.querySelector('.popup__form');
export const editProfileBtn = document.querySelector('.profile__edit-btn');
export const editProfileSubmitBtn = editForm.querySelector('.popup__submit-btn');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const inputName = document.querySelector('.popup__input_type_name');
export const inputDescription = document.querySelector('.popup__input_type_description');

export const imagePopup = document.querySelector('.popup_type_image');
export const imagePopupPicture = imagePopup.querySelector('.popup__image');
export const imagePopupFigcapture = imagePopup.querySelector('.popup__figcapture');

export const cards = document.querySelector('.elements__items');
export const templateCard = '.template-card';

export const deletePopup = document.querySelector('.popup_type_delete');
const deleteForm = deletePopup.querySelector('.popup__form');
export const deleteSubmitBtn = deleteForm.querySelector('.popup__submit-btn');