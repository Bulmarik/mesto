const editBtn = document.querySelector('.profile__edit-btn');
const closeBtn = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputDescription = document.querySelector('.popup__input_type_description');

function defaultProfile() {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function togglePopup() {
    if (popup.classList.contains('popup_show') !== true) {
        defaultProfile();
        popup.classList.toggle('popup_show');
    } else {
        popup.classList.toggle('popup_show');
    }
}
//Действительно, классно получается! Если, конечно, все верно написал.
//Спасибо, что заставляете смотреть на возможности JS шире))
//Вообще люблю ваши проверки) Всегда только позитив от исправлений и дополнений кода)




// И что бы самому окончательно разобраться и не запутаться,
// сделаю всё обратно последовательно. Надеюсь, оцените ход мысли :)

// form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     profileName.textContent = inputName.value;
//     profileDescription.textContent = inputDescription.value;
//     togglePopup();
// });

// то же самое, если записать как

// form.addEventListener('submit', function(evt) {
//     evt.preventDefault();
//     profileName.textContent = inputName.value;
//     profileDescription.textContent = inputDescription.value;
//     togglePopup();
// });

// Вынесем всё из тела данной функции, задекларируем
function editProfile(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    togglePopup();
}

// и добавим в качестве второго параметра к слушателю
form.addEventListener('submit', editProfile);

editBtn.addEventListener('click', togglePopup);

closeBtn.addEventListener('click', togglePopup);