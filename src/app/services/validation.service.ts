import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Campo requerido',
      'invalidEmailAddress': 'Email invalido',
      'invalidPassword': 'La contraseña debe tener mínimo 8 caracteres al menos 1 alfabeto en mayúsculas, 1 alfabeto en minúsculas, 1 número y 1 carácter especial (#$%&)',
      'minlength': 'Debe tener al menos ' + validatorValue.requiredLength + ' caracteres',
      'maxlength': 'Debe tener un máximo de ' + validatorValue.requiredLength + ' caracteres'

    };
    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}
