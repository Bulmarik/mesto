class FormValidator {
  constructor (object, formElement) {
    this._object = object;
    this._formElement = formElement;
  }

  enableValidation (object) {
    const forms = Array.from(document.querySelectorAll(this._object.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => evt.preventDefault());
      this._setInputEventLisneners(formElement, object);
    });
  }

  _setInputEventLisneners(formElement, object) {
    const inputs = Array.from(formElement.querySelectorAll(this._object.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(formElement, inputElement, object);
        this._toggleButtonState(formElement, inputs, object);
      });
    });
  }

  _hideInputError(formElement, inputElement, object) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._object.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._object.errorClass);
  }

  _showInputError(formElement, inputElement, object) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._object.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage; 
    errorElement.classList.add(this._object.errorClass);
  }

  _checkInputValidity(formElement, inputElement, object) {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, object); 
    } else {
      this._showInputError(formElement, inputElement, object);
    }
  }

  _toggleButtonState(formElement, inputs, object) {
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    const btnSubmit = formElement.querySelector(this._object.submitButtonSelector);
    if (!isFormValid) {
      this.activateSubmitBtn(btnSubmit);
    } else {
      this.inactivateSubmitBtn(btnSubmit);
    }
  }

  activateSubmitBtn(button) {
    button.removeAttribute('disabled');
    button.classList.remove(this._object.inactiveButtonClass);
  }
  
  inactivateSubmitBtn(button) {
    button.setAttribute('disabled', true);
    button.classList.add(this._object.inactiveButtonClass);
  }

  eraseError(popup) {
    const popupError = Array.from(popup.querySelectorAll(this._object.errorSelector));
    popupError.forEach((error) => error.classList.remove(this._object.errorClass));
    const popupInput = Array.from(popup.querySelectorAll(this._object.inputSelector));
    popupInput.forEach((input) => input.classList.remove(this._object.inputErrorClass));
  }
}

export default FormValidator;