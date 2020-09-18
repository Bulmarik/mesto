import {togglePopup} from './utils.js'

const imagePopup = document.querySelector('.popup_type_image');
const imageCloseBtn = imagePopup.querySelector('.popup__close-btn');
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupFigcapture = imagePopup.querySelector('.popup__figcapture');

imageCloseBtn.addEventListener('click', () => togglePopup(imagePopup));

class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector).content.querySelector('.elements__item').cloneNode(true);
    return template;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._setListeners();
    return this._element;
  }

  _setListeners() {
    this._cardImage.addEventListener('click', () => this._clickImage());
    this._element.querySelector('.elements__like-btn').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.elements__del-btn').addEventListener('click', () => this._deleteCard());
  }

  _clickImage() {
    imagePopupPicture.src = this._link;
    imagePopupFigcapture.textContent = this._name;
    togglePopup(imagePopup);
  }

  _likeCard() {
    this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
  }

  _deleteCard() {
    this._element.querySelector('.elements__del-btn').closest('.elements__item').remove();
  }
}

export default Card;