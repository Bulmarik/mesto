// function closePopupEsc(evt) {
//   if(evt.key === 'Escape') {
//     togglePopup(document.querySelector('.popup_opened'));
//   }
// }

// function closePopupOverlay(evt) {
//   togglePopup(evt.target.parentElement);
// }

// export function togglePopup(popup) {
//   popup.classList.toggle('popup_opened');
//   if (popup.classList.contains('popup_opened')) {
//     document.addEventListener('keydown', closePopupEsc);
//     popup.querySelector('.popup__overlay').addEventListener('click', closePopupOverlay);
//   } else {
//     document.removeEventListener('keydown', closePopupEsc);
//     popup.querySelector('.popup__overlay').removeEventListener('click', closePopupOverlay);
//   }
// }