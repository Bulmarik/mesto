const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

function togglePopup() {
    if (!popup.classList.contains('popup_show')) {
        inputName.value = profileName.textContent;
        inputDescription.value = profileDescription.textContent;
    };
    popup.classList.toggle('popup_show');
}

function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    togglePopup();
}

form.addEventListener('submit', editProfile);

editBtn.addEventListener('click', togglePopup);

closeBtn.addEventListener('click', togglePopup);

addBtn.addEventListener('click', togglePopup);