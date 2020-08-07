const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {

    // Функция установки слушателей на кнопки сабмита форм
    formElement.addEventListener('submit', (evt) => evt.preventDefault());

    const inputs = Array.from(formElement.querySelectorAll(inputSelector));

    inputs.forEach((inputElement) => {

      // Функция установки слушателей на поля форм
      inputElement.addEventListener('input', (evt) => {

        // const btnSubmit = formElement.querySelector(submitButtonSelector);

        // Функция скрытия ошибок полей форм
        function hideInputError(formElement, inputElement) {
          const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
          inputElement.classList.remove(inputErrorClass);
          errorElement.textContent = '';
          errorElement.classList.remove(errorClass);
        }

        // Функция показа ошибок полей форм
        function showInputError(formElement, inputElement) {
          const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = inputElement.validationMessage; 
          errorElement.classList.add(errorClass);
        }

        // Функция проверки валидности конкретного поля формы
        function checkInputValidity(formElement, inputElement) {
          if (inputElement.validity.valid) {
            hideInputError(formElement, inputElement); 
          } else {
            showInputError(formElement, inputElement);
          }
        }
        checkInputValidity(formElement, inputElement);

        // Функция проверки валидности всех полей
        const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);

        // Функция контроля состояния кнопки сабмита форм
        function toggleButtonState(formElement, isFormValid) {
          const btnSubmit = formElement.querySelector(submitButtonSelector);
          if (!isFormValid) {
            btnSubmit.classList.remove(inactiveButtonClass);
            btnSubmit.removeAttribute('disabled');
          } else {
            btnSubmit.classList.add(inactiveButtonClass);
            btnSubmit.setAttribute('disabled', true);
          }
        }
        toggleButtonState(formElement, isFormValid);

      });
    });
  });
}

enableValidation(object);