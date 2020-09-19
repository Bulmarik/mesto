class FormValidator {
  constructor (validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  enableValidation (validationConfig) {
    const forms = Array.from(document.querySelectorAll(this._validationConfig.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => evt.preventDefault());
      this._setInputEventLisneners(formElement, validationConfig);
    });
  }

  _setInputEventLisneners(formElement, validationConfig) {
    const inputs = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(formElement, inputElement, validationConfig);
        this._toggleButtonState(formElement, inputs, validationConfig);
      });
    });
  }

  _hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationConfig.errorClass);
  }

  _showInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage; 
    errorElement.classList.add(this._validationConfig.errorClass);
  }

  _checkInputValidity(formElement, inputElement, validationConfig) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, validationConfig);
    } else {
      this._showInputError(formElement, inputElement, validationConfig);
    }
  }

  _toggleButtonState(formElement, inputs, validationConfig) {
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    const btnSubmit = formElement.querySelector(this._validationConfig.submitButtonSelector);
    if (!isFormValid) {
      this.activateSubmitBtn(btnSubmit);
    } else {
      this.inactivateSubmitBtn(btnSubmit);
    }
  }

  activateSubmitBtn(button) {
    button.removeAttribute('disabled');
    button.classList.remove(this._validationConfig.inactiveButtonClass);
  }
  
  inactivateSubmitBtn(button) {
    button.setAttribute('disabled', true);
    button.classList.add(this._validationConfig.inactiveButtonClass);
  }

  eraseError(popup) {
    const popupError = Array.from(popup.querySelectorAll(this._validationConfig.errorSelector));
    popupError.forEach((error) => error.classList.remove(this._validationConfig.errorClass));
    const popupInput = Array.from(popup.querySelectorAll(this._validationConfig.inputSelector));
    popupInput.forEach((input) => input.classList.remove(this._validationConfig.inputErrorClass));
  }
}

export default FormValidator;