import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import * as moment from "moment";
@Injectable()
export class ValidationService {
  constructor() {}

  passwordValidator(control: AbstractControl) {
    // Optional
    // Password must contain 8 characters, one digit, first letter alpha and no spaces."
    if (control.value !== "") {
      const passwordPattern = /^[A-Za-z](?=.*\d)[A-Za-z\d]{7,}$/;
      if (control.value.match(passwordPattern)) {
        return null; // It's good!
      } else {
        return {
          password: true,
          message: "Password does not meet requirements"
        };
      }
    }
  }

  ssnvValidator(control: AbstractControl) {
    const ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
    if (control.value !== "") {
      if (control.value.match(ssnPattern)) {
        return null; // It's good!
      } else {
        return { ssn: true, message: "Not a valid ssn" };
      }
    }
  }

  last4Validation(control: AbstractControl) {
    const pattern = /^[0-9]{4}$/;

    if (control.value !== "") {
      if (control.value.match(pattern)) {
        return null;
      } else {
        return { last4ssn: true, message: "Not a valid ssn" };
      }
    }
  }

  dateValidator(datePattern: string) {
    // Returning a function here to allow passing in arguments
    return (control: AbstractControl) => {
      if (control.value !== "") {
        if (moment(control.value, datePattern).isValid()) {
          return false;
        } else {
          return { date: true, message: "Not a valid date" };
        }
      }
    };
  }

  emailValidator(control: AbstractControl) {
    // Optional
    if (control.value !== "") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (control.value.match(emailPattern)) {
        return null; // It's good!
      } else {
        return { email: true, message: "Not a valid email" };
      }
    }
  }

  confirmValidator(controlName: string, controlName2: string) {
    return (control: AbstractControl) => {
      if (!control.parent || !control) {
        return;
      }
      // expecting there to be password and confirm_password controls
      const pwd = control.parent.get(controlName);
      const cpwd = control.parent.get(controlName2);

      if (!pwd || !cpwd) {
        return;
      }
      if (pwd.value !== cpwd.value) {
        return {
          confirm: true,
          message: "New password and confirmation password does not match"
        };
      }
    };
  }

  phoneValidator(control: AbstractControl) {
    const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    // Making this optional

    if (control.value !== "") {
      if (control.value.match(phonePattern)) {
        return null; // It's good!
      } else {
        return { phone: true, message: "Not a valid phone number" };
      }
    }
  }
}
