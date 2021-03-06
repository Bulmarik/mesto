export default class Card {
  constructor(data, cardSelector, handleCardClick, userId, deleteCard, deleteCardData, likeCard) {
    this._likes = data.likes;
    this._link = data.link;
    this._name = data.name;
    this._owner = data.owner;
    this._id = data._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._deleteCardData = deleteCardData;
    this._likeCard = likeCard;
  }

  _getTemplate() {
    const template = document.querySelector(this._cardSelector)
    .content.querySelector('.elements__item')
    .cloneNode(true);
    return template;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.elements__name').textContent = this._name;
    this._element.querySelector('.elements__like-count').textContent = this._likes.length;
    this._likeBtn = this._element.querySelector('.elements__like-btn');
    this._delBtn = this._element.querySelector('.elements__del-btn');
    if (this._likes.some((like) => like._id === this._userId)) {
      this._likeBtn.classList.add('elements__like-btn_active');
    }
    this._isOwner();
    this._setListeners();
    return this._element;
  }

  checkLikeStatus() {
    return this._likeBtn.classList.contains('elements__like-btn_active');
  } 
  
  setLikeStatus(likes) {
    this._element.querySelector('.elements__like-count').textContent = likes.length;
    if(this.checkLikeStatus()) {
      this._likeBtn.classList.remove('elements__like-btn_active');
    } else {
      this._likeBtn.classList.add('elements__like-btn_active');
    }
  } 

  _isOwner() {
    if (this._owner._id !== this._userId) {
      this._element.querySelector('.elements__del-btn').remove();
    }
    return this._element;
  }

  _removeCard() {
    this._deleteCardData(this._id, this._element);
    this._deleteCard.open();
  }
  
  _setListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._link, this._name));
    this._delBtn.addEventListener('click', () => this._removeCard());
    this._likeBtn.addEventListener('click', () => this._likeCard(this._id, this));
  }
}  