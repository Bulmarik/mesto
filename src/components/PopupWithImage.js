import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImageSrc = this._popupSelector.querySelector('.popup__image');
    this._popupImageFigcapture = this._popupSelector.querySelector('.popup__figcapture');
  }
  
  open (link, name) {
    this._popupImageSrc.src = link;
    this._popupImageFigcapture.textContent = name;
    this._popupImageFigcapture.alt = name;
    super.open();
  }
}