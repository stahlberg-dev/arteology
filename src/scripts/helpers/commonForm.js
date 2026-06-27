export class Form {
  constructor(config) {
    this.formElement = config.formElement;
    this.formFieldClass = config.formFieldClass;
    this.invalidFieldClass = config.invalidFieldClass;
    this.errorFieldClass = config.errorFieldClass;
    this.successModalSelector = config.successModalSelector;
    this.errorModalSelector = config.errorModalSelector;
    this.sendPath = config.sendPath ?? '';
    this.formData = null;
  }

  submit() {
    const formElement = this.formElement;

    if (!(formElement instanceof HTMLElement)) {
      return;
    }

    if (this.invalidFieldClass && this.errorFieldClass) {
      const invalidFormElements = formElement.querySelectorAll(this.invalidFieldClass);

      invalidFormElements.forEach((invalidFormElement) => {
        invalidFormElement.classList.add(this.errorFieldClass.slice(1));
      });

      if (invalidFormElements.length) {
        return;
      }
    }

    const formData = new FormData(formElement);

    this.formData = formData;
    this.reset();

    const successModal = document.querySelector(this.successModalSelector);
    const errorModal = document.querySelector(this.errorModalSelector);
    const submitModalOpenEvent = new CustomEvent('open-modal');

    setTimeout(async () => {
      try {
        //console.log([...formData.entries()]);

        const response = await fetch(this.sendPath, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok && result.success === true) {
          successModal?.dispatchEvent(submitModalOpenEvent);
        } else {
          errorModal?.dispatchEvent(submitModalOpenEvent);
        }
      }
      catch (error) {
        console.error(error);
        errorModal?.dispatchEvent(submitModalOpenEvent);
      }
    }, 0);
  }

  reset() {
    const formElement = this.formElement;

    if (!(formElement instanceof HTMLElement)) {
      return;
    }

    const resetFormEvent = new CustomEvent('custom-reset', { detail: this.formData });

    if (this.formFieldClass) {
      const formFields = formElement.querySelectorAll(this.formFieldClass);

      formFields.forEach(formField => {
        formField.dispatchEvent(resetFormEvent);
      });
    }

    setTimeout(() => {
      this.formData = null;
    }, 100);
  }

  init() {
    const formElement = this.formElement;

    if (!(formElement instanceof HTMLElement)) {
      return;
    }

    formElement.addEventListener('submit', event => {
      event.preventDefault();
      this.submit();
    });

    formElement.addEventListener('reset', event => {
      event.preventDefault();
      this.reset();
    });
  }
}
