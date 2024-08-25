import { IRegisterError, IRegisterProps } from "../components/register/TypesRegister";

export function validateRegisterForm(values: IRegisterProps): IRegisterError {
  const errors: IRegisterError = {};
  
  // Validación del email
  if (values.email && !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Invalid email.";
  }

  // Validación del nombre (permitir letras, espacios y emojis)
  if (values.name && !/^[\p{L}\p{Emoji}\s]+$/u.test(values.name)) {
    errors.name = "Name cannot contain numbers or other symbols.";
  }

  // Verificación adicional de espacios consecutivos
  if (!values.name.trim()) {
    errors.name = "Name cannot be empty.";
  } else if (/\s{2,}/.test(values.name)) {
    errors.name = "Name cannot contain more than one consecutive space.";
  }

  // Validación del teléfono (solo números)
  if (values.phone && !/^\d+$/.test(values.phone)) {
    errors.phone = "Phone must be a number.";
  }
  
  return errors;
}
