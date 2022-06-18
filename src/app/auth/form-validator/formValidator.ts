import {Validators as NGValidators, AbstractControl, FormControl} from '@angular/forms';

export class BGValidators extends NGValidators {
  static minLength(length) {
    return (control) =>
      super.minLength(length)(control)
        ? { minLength: 'გთხოვთ შეიყვანოთ მინიმუმ 2 სიმბოლო' }
        : undefined;
  }

  static maxLength(length) {
    return (control) =>
      super.maxLength(length)(control)
        ? { maxLength: 'გთხოვთ შეიყვანოთ მაქსიმუმ 30 სიმბოლო' }
        : undefined;
  }

  static required(control) {
    return super.required(control)
      ? { required: 'აუცილებელი ველი' }
      : undefined;
  }

  static pattern(pattern: string | RegExp, patternDescription?: string) {
    return (control: AbstractControl) => {
      if (super.pattern(pattern)(control)) {
        return {
          minLength: `გთხოვთ დაიცვათ შაბლონი 'სფეისების გარეშე'`
        };
      }
    };
  }
  static passwordMatch(control: AbstractControl){
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    return password === confirmPassword ? undefined : {notMatch: 'პაროლები არ ემთხვევა'}
  }

}
