const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.form');
const profileName = document.querySelector('.profile__name');
const inputName = document.querySelector('.form__input_type_name');
const inputDescription = document.querySelector('.form__input_type_description');
const profileDescription = document.querySelector('.profile__description');

function togglePopup() {
    popup.classList.toggle('popup_show');
}

function editProfile() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

closeBtn.addEventListener('click', togglePopup);

form.addEventListener('submit', (evt) => {
    togglePopup();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    evt.preventDefault();
});

editBtn.addEventListener('click', () => {
    editProfile();
    togglePopup();
});
