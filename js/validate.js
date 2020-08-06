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
    formElement.addEventListener('submit', (evt) => evt.preventDefault());


    const inputs = Array.from(formElement.querySelectorAll(inputSelector));


    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {


        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
        if (inputElement.validity.valid) {
          inputElement.classList.remove(inputErrorClass);
          errorElement.textContent = '';
          errorElement.classList.remove(errorClass);
        } else {
          inputElement.classList.add(inputErrorClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(errorClass);
        }


        const isFormValid = inputs.some(function (inputElement) {
          return !inputElement.validity.valid
        });


        const btnSubmit = formElement.querySelector(submitButtonSelector);
        
        if (!isFormValid) {
          btnSubmit.classList.remove(inactiveButtonClass);
          btnSubmit.removeAttribute('disabled')
        } else {
          btnSubmit.classList.add(inactiveButtonClass);
          btnSubmit.setAttribute('disabled', true)
        };

      });

    });

  });

}

enableValidation(object)





