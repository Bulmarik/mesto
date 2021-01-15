export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeBtn = this._element.querySelector('.elements__like-btn');
    this._delBtn = this._element.querySelector('.elements__del-btn');
    this._setListeners();
    return this._element;
  }

  _setListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
    this._likeBtn.addEventListener('click', () => this._likeCard());
    this._delBtn.addEventListener('click', () => this._deleteCard());
  }

  _likeCard() {
    this._element.querySelector('.elements__like-btn').classList.toggle('elements__like-btn_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}