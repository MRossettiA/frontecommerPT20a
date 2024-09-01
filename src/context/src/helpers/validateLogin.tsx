import { ILoginError, ILoginProps } from "@/components/login/TypesLogin";

export function validateLoginForm(values: ILoginProps): ILoginError {
  const errors: ILoginError = {};

  if (values.email && !/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
    errors.email = "Invalid email.";
  }



  return errors;
};
