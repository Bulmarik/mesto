// import {imagePopup, imagePopupPicture, imagePopupFigcapture} from '../utils/constants.js';
// import {togglePopup} from '../utils/utils.js';

export default class Card {
  constructor(data, cardSelector, clickImage) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._clickImage = clickImage;
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
    this._cardImage.addEventListener('click', () => {
      this._clickImage(this._link, this._name);
    });
    // this._cardImage.addEventListener('click', () => this._clickImage());
    this._element.querySelector('.elements__like-btn').addEventListener('click', () => this._likeCard());
    this._element.querySelector('.elements__del-btn').addEventListener('click', () => this._deleteCard());
  }

  ////////
  // _clickImage() {
    // imagePopupPicture.src = this._link;
    // imagePopupPicture.alt = this._name;
    // imagePopupFigcapture.textContent = this._name;
    // togglePopup(imagePopup);
  // }
////////////

  _likeCard() {
    this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
  }

  _deleteCard() {
    this._element.querySelector('.elements__del-btn').closest('.elements__item').remove();
  }
}