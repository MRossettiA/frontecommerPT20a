import { IRegisterError, IRegisterProps } from "../components/register/TypesRegister";

export function validateRegisterForm(values: IRegisterProps): IRegisterError {
  const errors: IRegisterError = {};
  
  if (values.email && !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Invalid email.";
  }

  if (values.name && !/^[a-zA-Z\s]+$/.test(values.name)) {
    errors.name = "Name cannot contain numbers or symbols.";
  }
  if (!values.name.trim()) {
  
  }
  if (/\s{2,}/.test(values.name)) {
    errors.name = "Name cannot contain more than one consecutive space.";
  }

  if (values.phone && !/^\d+$/.test(values.phone)) {
    errors.phone = "Phone must be a number.";
  }
  
  return errors;
};
