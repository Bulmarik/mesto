export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this._popupSelector.querySelector('.popup__close-btn');
    closeBtn.addEventListener('click', () => {
      this.close();
    });
    const overlay = this._popupSelector.querySelector('.popup__overlay');
    overlay.addEventListener('click', () => {
      this.close();
    });
  }
}