import { validErrors } from './validErrors';

export const isValid = (email: string) => {

    if (email === '') {
      return validErrors.empty
    }

    else if (
      !email.match
        (/^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/i)
       ) {
          return validErrors.format
         }

    else if (email.slice(Math.max(email.length - 3, 0)).includes('.co')) {
      return validErrors.columbia
    }

    else {
      return ''
    }
  }
