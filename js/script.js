const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

// То есть вы предлагаете данную функцию не объявлять, а сразу внести в тоггл? 
// function defaultProfile() {
//     inputName.value = profileName.textContent;
//     inputDescription.value = profileDescription.textContent;
// }
// Я понял! Мы так делаем потому, что в дальнейшем это не будет задействовано нигде.
// Поэтому и нет смысла создавать отдельную функцию)
// Жаль, что мы можем общаться с вами только в итерациях.
// Очень не хватает практических комментариев в рамках этого обучения.
// После проверки все комментарии удалю и перезалью на гитхаб :)

function togglePopup() {
    if (popup.classList.contains('popup_show') !== true) {
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