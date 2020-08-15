const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation = (object) => setFormEventListener (object);
enableValidation(object);

// Функция установки слушателей формы
function setFormEventListener ({formSelector, inputSelector, submitButtonSelector, inputErrorClass, errorClass}) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => evt.preventDefault());
    setInputEventLisneners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass);
  });
}

// Функция установки слушателей на поля форм
function setInputEventLisneners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputs, formElement, submitButtonSelector);
    });
  });
}

// Функция скрытия ошибок полей форм
function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Функция показа ошибок полей форм
function showInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage; 
  errorElement.classList.add(errorClass);
}

// Функция проверки валидности конкретного поля формы
function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass); 
  } else {
    showInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// Функция контроля состояния кнопки сабмита форм
function toggleButtonState(inputs, formElement, submitButtonSelector) {
  const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
  const btnSubmit = formElement.querySelector(submitButtonSelector);
  if (!isFormValid) {
    activeSubmitBtn(btnSubmit);
  } else {
    inactiveSubmitBtn(btnSubmit);
  }
}

//Функция активации кнопки сабмита
function activeSubmitBtn(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__btn_disabled');
}

//Функция деактивации кнопки сабмита
function inactiveSubmitBtn(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__btn_disabled');
}